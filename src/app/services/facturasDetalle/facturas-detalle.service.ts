import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FacturasDetalleService {

  private API_SERVER = "http://localhost:8080/facturaDetalle/";

  constructor(private httpClient: HttpClient) { }

  public getAllfdetalles(): Observable<any>{
    return this.httpClient.get(this.API_SERVER)
  }

  public getDetalle(consecutivo): Observable<any>{
    return this.httpClient.get(this.API_SERVER+consecutivo); 
  }

  public saveDetalle(detalle:any): Observable<any>{
    return this.httpClient.post(this.API_SERVER,detalle);
  }

  public deleteProducto(id):Observable<any>{
    return this.httpClient.delete(this.API_SERVER + "delete/"+id); 
  }



}
