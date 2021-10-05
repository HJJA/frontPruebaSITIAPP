import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FacturasService {

  private API_SERVER = "http://localhost:8080/facturas/";

  constructor(private httpClient: HttpClient) { }

  public getAllfacturas(): Observable<any>{
    return this.httpClient.get(this.API_SERVER)
  }

  public saveFacturas(factura:any): Observable<any>{
    return this.httpClient.post(this.API_SERVER,factura);
  }
}
