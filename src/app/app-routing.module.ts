import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

// import { HomeComponent } from './';
// import { PageNotFoundComponent } from './';
import { ClientesComponent } from './components/clientes/clientes.component';
import { DetallesClienteComponent } from './components/detalles-cliente/detalles-cliente.component';
import { MultimediaComponent } from './components/multimedia/multimedia.component';

const routes: Routes = [
  { path: 'clientes', component: ClientesComponent },
  { path: 'clientes/page/:page', component: ClientesComponent },
  { path: 'cliente/detalles/:id', component: DetallesClienteComponent },
  {
    path: 'cliente/detalles/:id/page/:page',
    component: DetallesClienteComponent,
  },
  { path: 'multimedia/cliente/:id', component: MultimediaComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'clientes' },
  // { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class FeatureRoutingModule {}
