import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TiposIdentificacionesService {

  private API_SERVER = "http://localhost:8080/tiposID/";

  constructor(
    private httpClient: HttpClient
  ) { }


  public getAllTiposIdentificaiones(): Observable<any>{
    return this.httpClient.get(this.API_SERVER)
  }
}
