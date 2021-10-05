import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FacturasService } from '../../services/facturas/facturas.service';
import { ProductosService } from '../../services/productos/productos.service';
import { FacturasDetalleService } from '../../services/facturasDetalle/facturas-detalle.service';
import { ClientesService } from '../../services/clientes/clientes.service'; 

import { Canvas, PdfMakeWrapper, Table } from 'pdfmake-wrapper';


@Component({
  selector: 'app-facturas',
  templateUrl: './facturas.component.html',
  styleUrls: ['./facturas.component.css']
})
export class FacturasComponent implements OnInit {

  facturasForm: FormGroup;
  facturas: any;

  facturadetalleForm: FormGroup;
  facturadetalle: any;

  productoForm: FormGroup;
  productos: any;

  clienteForm: FormGroup;
  clientes: any;
  cliente:any;

  total:number = 0; 

  constructor(
    public fb: FormBuilder,
    public facturasService: FacturasService,
    public facturasDetalleService: FacturasDetalleService,
    public productosService:ProductosService,
    public clientesService: ClientesService,

  ) { }

  ngOnInit(): void {
    this.facturasForm = this.fb.group({
      consecutivo: [''],
      cliente: ['', Validators.required],
      fecha: ['', Validators.required],
    })

    this.facturadetalleForm = this.fb.group({
      id: [''],
      consecutivo: ['', Validators.required],
      idproducto: ['', Validators.required],
      cantidad: ['', Validators.required],
      valorunitario: ['', Validators.required],
    })

    this.productoForm = this.fb.group({
      id: [''],
      codigo: ['', Validators.required],
      nombre: ['', Validators.required],
      estado: ['', Validators.required],
      valorunitario: ['', Validators.required],
    })

    this.facturasService.getAllfacturas().subscribe(
      (resp) => {
        this.facturas = resp;
      },
      (error) => {
        console.error(error);
      }
    );

    this.productosService.getAllproducto().subscribe(
      (resp) => {
        this.productos = resp;
      },
      (error) => {
        console.error(error);
      }
    );

    this.clientesService.getAllclientes().subscribe(
      (resp) => {
        this.clientes = resp;
      },
      (error) => {
        console.error(error);
      }
    );

  }

  guardarFactura(){

    this.facturasService.saveFacturas(this.facturasForm.value).subscribe(
      (resp) => {
        this.facturasForm.reset();
        this.facturas = this.facturas.filter(facturas=> resp.consecutivo !== facturas.consecutivo)
        this.facturas.push(resp);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  guardarDetalle(){
    this.facturasDetalleService.saveDetalle(this.facturadetalleForm.value).subscribe(
      (resp) => {
        this.facturadetalleForm.reset();
        this.facturadetalle = this.facturadetalle.filter(facturadetalle=> resp.id !== facturadetalle.id)
        this.facturadetalle.push(resp);
        this.facturasDetalleService.getDetalle(resp.consecutivo).subscribe(resp=> {
          this.total = this.getTotal(resp);
        },
        error=>{console.error(error)}
        )
      },
      (error) => {
        console.error(error);
      }
    )
  }

  cargarDetalle(id){
    this.facturasDetalleService.getDetalle(id).subscribe(resp=> {
      this.facturadetalle = resp;
      this.total = this.getTotal(resp);
    },
    error=>{console.error(error)}
    ) 
  }

  editarfactur(factura){
    this.facturasForm.setValue({
      consecutivo: factura.consecutivo,
      cliente: factura.cliente,
      fecha: factura.fecha,
      
    })
  }

  editarfacturadetalleE(facturadetalleE){
    this.facturadetalleForm.setValue({
      id: facturadetalleE.id,
      consecutivo: facturadetalleE.consecutivo,
      idproducto: facturadetalleE.idproducto,
      cantidad: facturadetalleE.cantidad,
      valorunitario: facturadetalleE.valorunitario,
      
    })
  }

  eliminar(facturadetalle){
    this.facturasDetalleService.deleteProducto(facturadetalle.id).subscribe(resp=>{
      console.log(resp)
      if(resp == true){
        this.facturadetalle.pop(facturadetalle);
        this.facturasDetalleService.getDetalle(facturadetalle.consecutivo).subscribe(resp=> {
          this.total = this.getTotal(resp);
        },
        error=>{console.error(error)}
        ) 
      }
    })
  }

  getTotal(facturadetalle){
    return facturadetalle.map(item => item.cantidad*item.valorunitario).reduce((acc, item)=>acc+=item,0);
  }


  generatePDF(){

  }

  


}