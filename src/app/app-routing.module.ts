import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientesComponent } from './components/clientes/clientes.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { ProductosComponent } from './components/productos/productos.component';
import { ReporteclienteComponent } from './components/reportecliente/reportecliente.component';
import { ReporteproductoComponent } from './components/reporteproducto/reporteproducto.component';
import { FacturasComponent } from './components/facturas/facturas.component';



const routes: Routes = [
  {
    path: '',
    component: ClientesComponent
  },
  {
    path: 'app-usuarios',
    component: UsuariosComponent
  },
  {
    path: 'app-productos',
    component: ProductosComponent
  },
  {
    path: 'app-reportecliente',
    component: ReporteclienteComponent
  },
  {
    path: 'app-reporteproducto',
    component: ReporteproductoComponent
  },
  {
    path: 'app-facturas',
    component: FacturasComponent
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
