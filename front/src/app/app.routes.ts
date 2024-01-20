import { Routes } from '@angular/router';
import { DashboardComponent } from './Views/dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponentComponent } from './page-not-found-component/page-not-found-component.component';
import { ProveedoresComponent } from './Views/clientes/clientes.component';
import { ComprasComponent } from './views/compras/compras.component';
import { NuevoProveedorComponent } from './Views/clientes/nuevo-cliente/nuevo-cliente.component';
import { NuevoCompraComponent } from './Views/compras/nuevo-compra/nuevo-compra.component';


export const routes: Routes = [ 
  {
    path: 'dashboard',
    component: DashboardComponent,
  },

  {
    path: 'clientes',
    component: ProveedoresComponent,
  },
  {
    path: 'nuevo-cliente',
    component: NuevoProveedorComponent,
  },
  
  {
    path: 'nuevo-compra',
    component: NuevoCompraComponent,
  },
  {
    path: 'editar-cliente/:id',
    component: NuevoProveedorComponent,
  },
  
  {
    path: 'editar-compra/:id',
    component: NuevoCompraComponent,
  },
  {
    path: 'compras',
    component: ComprasComponent,
  },
  { path: 'login', component: LoginComponent },
  { path: '**', component: PageNotFoundComponentComponent },
];
