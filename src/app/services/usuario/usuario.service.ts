import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private API_SERVER = "http://localhost:8080/usuarios/";

  constructor(private httpClient: HttpClient) { }

  public getAllUsuario(): Observable<any>{
    return this.httpClient.get(this.API_SERVER)
  }

  public saveUsuario(usuario:any): Observable<any>{
    return this.httpClient.post(this.API_SERVER,usuario);
  }
}
