import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientesService } from '../../services/clientes/clientes.service';
import { TiposIdentificacionesService } from '../../services/tiposIdentificaciones/tipos-identificaciones.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  clienteForm: FormGroup;
  clientes: any;
  cliente:any;

  tipos: any;

  constructor(
    public fb: FormBuilder,
    public clientesService: ClientesService,
    public tiposIdentificacionesService: TiposIdentificacionesService,
  ) { }

  ngOnInit(): void {
    
    this.clienteForm = this.fb.group({
      cliente: [''],
      tiposidentificacion: ['', Validators.required],
      identificacion: ['', Validators.required],
      razonsocial: ['', Validators.required],
      fecharegistro: ['', Validators.required],
      estado: ['', Validators.required],
    })

    this.clientesService.getAllclientes().subscribe(
      (resp) => {
        this.clientes = resp;
      },
      (error) => {
        console.error(error);
      }
    );

    this.tiposIdentificacionesService.getAllTiposIdentificaiones().subscribe(
      (resp) => {
        this.tipos = resp;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  guardarCliente():void{
    this.clientesService.saveCliente(this.clienteForm.value).subscribe(
      (resp) => {
        this.clienteForm.reset();
        this.clientes = this.clientes.filter(cliente=> resp.cliente !== cliente.cliente)
        this.clientes.push(resp);
      },
      (error) => {
        console.error(error);
        alert("El numero de identificacion ya se encuentra registrado")
      }
    );
  }

  editarCliente(clientesE){
    this.clienteForm.setValue({
      cliente: clientesE.cliente,
      tiposidentificacion: clientesE.tiposidentificacion,
      identificacion: clientesE.identificacion,
      razonsocial: clientesE.razonsocial,
      fecharegistro: clientesE.fecharegistro,
      estado: clientesE.estado,
    })
  }

  

}
