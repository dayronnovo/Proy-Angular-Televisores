import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

// import { HomeComponent } from './';
// import { PageNotFoundComponent } from './';
import { ClientesComponent } from './components/clientes/clientes.component';
import { DetallesClienteComponent } from './components/detalles-cliente/detalles-cliente.component';
import { MultimediaComponent } from './components/crear_multimedia/multimedia.component';
import { VisualizarMultimediasComponent } from './components/visualizar-multimedias/visualizar-multimedias.component';
import { CronogramaComponent } from './components/cronograma/cronograma.component';
import { ImagenesComponent } from './components/imagenes/imagenes.component';
import { VideosComponent } from './components/videos/videos.component';
import { RevisarCronogramaComponent } from './components/revisar-cronograma/revisar-cronograma.component';
import { MultimediaDelTelevisorComponent } from './components/multimedia-del-televisor/multimedia-del-televisor.component';
import { CrearClienteComponent } from './components/Forms/cliente/crear-cliente/crear-cliente.component';
import { UpdateClienteComponent } from './components/Forms/cliente/update-cliente/update-cliente.component';
import { CrearTelevisorComponent } from './components/Forms/televisor/crear-televisor/crear-televisor.component';
import { UpdateTelevisorComponent } from './components/Forms/televisor/update-televisor/update-televisor.component';
import { EliminarMultimediasComponent } from './components/eliminar-multimedias/eliminar-multimedias.component';
import { LoginComponent } from './components/login_logout/login/login.component';

const routes: Routes = [
  { path: 'clientes', component: ClientesComponent },
  { path: 'clientes/page/:page', component: ClientesComponent },
  { path: 'cliente/detalles/:cliente_id', component: DetallesClienteComponent },
  {
    path: 'cliente/detalles/:cliente_id/page/:page',
    component: DetallesClienteComponent,
  },
  { path: 'multimedia/cliente/:cliente_id', component: MultimediaComponent },
  {
    path: 'multimedia/reproducir/:televisor_id',
    component: VisualizarMultimediasComponent,
  },
  {
    path: 'cronograma/:cliente_id',
    component: CronogramaComponent,
    children: [
      { path: 'imagenes', component: ImagenesComponent },
      { path: 'videos', component: VideosComponent },
      { path: '**', pathMatch: 'full', redirectTo: 'imagenes' },
    ],
  },
  { path: 'historial/:cliente_id', component: RevisarCronogramaComponent },
  {
    path: 'historial/:cliente_id/page/:page',
    component: RevisarCronogramaComponent,
  },
  {
    path: 'multimedias/televisor/:televisor_id',
    component: MultimediaDelTelevisorComponent,
  },
  {
    path: 'cliente/create',
    component: CrearClienteComponent,
  },
  {
    path: 'cliente/update/:cliente_id',
    component: UpdateClienteComponent,
  },
  {
    path: 'televisor/create/:cliente_id',
    component: CrearTelevisorComponent,
  },
  {
    path: 'televisor/update/:televisor_id',
    component: UpdateTelevisorComponent,
  },
  {
    path: 'cliente/multimedia/delete/:cliente_id',
    component: EliminarMultimediasComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  { path: '**', pathMatch: 'full', redirectTo: 'clientes' },
  // { path: '**', component: PageNotFoundComponent },
];

// http://base-path/primary-route-path(outlet-name:route-path)

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class FeatureRoutingModule {}
