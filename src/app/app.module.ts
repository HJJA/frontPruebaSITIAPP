import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import {ClientesComponent} from './components/clientes/clientes.component';
import { HeaderComponent } from './components/header/header.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { ProductosComponent } from './components/productos/productos.component';
import { FacturasComponent } from './components/facturas/facturas.component';
import { ReporteproductoComponent } from './components/reporteproducto/reporteproducto.component';
import { ReporteclienteComponent } from './components/reportecliente/reportecliente.component';
import { DetallefacturaComponent } from './components/detallefactura/detallefactura.component';

import { PdfMakeWrapper } from 'pdfmake-wrapper';
import * as pdfFonts from "pdfmake/build/vfs_fonts"; 


PdfMakeWrapper.setFonts(pdfFonts);




@NgModule({
  declarations: [
    AppComponent,
    ClientesComponent,
    HeaderComponent,
    UsuariosComponent,
    ProductosComponent,
    FacturasComponent,
    ReporteproductoComponent,
    ReporteclienteComponent,
    DetallefacturaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
