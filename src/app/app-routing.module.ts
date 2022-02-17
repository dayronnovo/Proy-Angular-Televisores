import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

// import { HomeComponent } from './';
// import { PageNotFoundComponent } from './';
import { ClientesComponent } from './components/clientes/clientes.component';
import { DetallesClienteComponent } from './components/detalles-cliente/detalles-cliente.component';
import { MultimediaComponent } from './components/multimedia/multimedia.component';
import { ReutilizarMultimediasComponent } from './components/reutilizar-multimedias/reutilizar-multimedias.component';
import { VisualizarMultimediasComponent } from './components/visualizar-multimedias/visualizar-multimedias.component';
import { CronogramaComponent } from './components/cronograma/cronograma.component';
import { ImagenesComponent } from './components/imagenes/imagenes.component';
import { VideosComponent } from './components/videos/videos.component';

const routes: Routes = [
  { path: 'clientes', component: ClientesComponent },
  { path: 'clientes/page/:page', component: ClientesComponent },
  { path: 'cliente/detalles/:id', component: DetallesClienteComponent },
  {
    path: 'cliente/detalles/:id/page/:page',
    component: DetallesClienteComponent,
  },
  { path: 'multimedia/cliente/:id', component: MultimediaComponent },
  { path: 'multimedia/ver/:id', component: VisualizarMultimediasComponent },
  {
    path: 'multimedias/televisor/:id',
    component: ReutilizarMultimediasComponent,
  },
  {
    path: 'cronograma/televisor/:televisor_id',
    component: CronogramaComponent,
    children: [
      { path: 'imagenes', component: ImagenesComponent },
      { path: 'videos', component: VideosComponent },
      { path: '**', pathMatch: 'full', redirectTo: 'imagenes' },
    ],
  },
  { path: '**', pathMatch: 'full', redirectTo: 'clientes' },
  // { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class FeatureRoutingModule {}
