import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductosService } from '../../services/productos/productos.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  productoForm: FormGroup;
  productos: any;

  constructor(
    public fb: FormBuilder,
    public productosService: ProductosService,
  ) { }

  ngOnInit(): void {

    this.productoForm = this.fb.group({
      id: [''],
      codigo: ['', Validators.required],
      nombre: ['', Validators.required],
      estado: ['', Validators.required],
      valorunitario: ['', Validators.required],
    })

    this.productosService.getAllproducto().subscribe(
      (resp) => {
        this.productos = resp;
      },
      (error) => {
        console.error(error);
      }
    );

  }

  guardarProducto():void{
    this.productosService.saveProducto(this.productoForm.value).subscribe(
      (resp) => {
        this.productoForm.reset();
        this.productos = this.productos.filter(producto=> resp.id !== producto.id);
        this.productos.push(resp);
      },
      (error) => {
        console.error(error);
        alert("El codigo del producto ya esta registrado");
      }
    );
  }

  editarProducto(productoE){
    this.productoForm.setValue({
      id: productoE.id,
      codigo: productoE.codigo,
      nombre: productoE.nombre,
      estado: productoE.estado,
      valorunitario: productoE.valorunitario,
    })
  }

}
