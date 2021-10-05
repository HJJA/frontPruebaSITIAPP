import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { PerfilService } from '../../services/perfil/perfil.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  usuarioForm: FormGroup;
  usuarios: any;
  perfil: any;

  constructor(
    public fb: FormBuilder,
    public usuarioService: UsuarioService,
    public perfilService: PerfilService,

  ) { }

  ngOnInit(): void {

    this.usuarioForm = this.fb.group({
      idusuario: [''],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      usuario: ['', Validators.required],
      contrasena: ['', Validators.required],
      idperfil: ['', Validators.required],
    })

    this.usuarioService.getAllUsuario().subscribe(
      (resp) => {
        this.usuarios = resp;
      },
      (error) => {
        console.error(error);
      }
    );

    this.perfilService.getAllperfil().subscribe(
      (resp) => {
        this.perfil = resp;
      },
      (error) => {
        console.error(error);
      }
    );

  }

  guardarUsuario():void{
    this.usuarioService.saveUsuario(this.usuarioForm.value).subscribe(
      (resp) => {
        this.usuarioForm.reset();
        this.usuarios = this.usuarios.filter(usuario=> resp.idusuario !== usuario.idusuario);
        this.usuarios.push(resp);
      },
      (error) => {
        console.error(error);
        alert("Usuario existente");
      }
    );
  }

  editarUsuario(usuarioE){
    this.usuarioForm.setValue({
      idusuario: usuarioE.idusuario,
      nombre: usuarioE.nombre,
      apellido: usuarioE.apellido,
      usuario: usuarioE.usuario,
      contrasena: usuarioE.contrasena,
      idperfil: usuarioE.idperfil,
    })
  }

}
