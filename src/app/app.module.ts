import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FeatureRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { ClientesComponent } from './components/clientes/clientes.component';
import { PaginacionComponent } from './components/shared/paginacion/paginacion.component';
import { DetallesClienteComponent } from './components/detalles-cliente/detalles-cliente.component';
import { MultimediaComponent } from './components/crear_multimedia/multimedia.component';

import { NgDropFilesDirective } from './directivas/ng-drop-files.directive';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { VisualizarMultimediasComponent } from './components/visualizar-multimedias/visualizar-multimedias.component';
import { DomSeguroPipe } from './pipes/dom-seguro.pipe';
import { CronogramaComponent } from './components/cronograma/cronograma.component';
import { ManipularVideoDirective } from './directivas/manipular-video.directive';
import { ImagenesComponent } from './components/imagenes/imagenes.component';
import { VideosComponent } from './components/videos/videos.component';
import { RevisarCronogramaComponent } from './components/revisar-cronograma/revisar-cronograma.component';

import { MultimediaDelTelevisorComponent } from './components/multimedia-del-televisor/multimedia-del-televisor.component';
import { ModalComponent } from './components/shared/modal/modal.component';
import { CrearClienteComponent } from './components/Forms/cliente/crear-cliente/crear-cliente.component';
import { UpdateClienteComponent } from './components/Forms/cliente/update-cliente/update-cliente.component';
import { ShareFormClienteComponent } from './components/Forms/cliente/share-form-cliente/share-form-cliente.component';
import { CrearTelevisorComponent } from './components/Forms/televisor/crear-televisor/crear-televisor.component';
import { UpdateTelevisorComponent } from './components/Forms/televisor/update-televisor/update-televisor.component';
import { ShareFormTelevisorComponent } from './components/Forms/televisor/share-form-televisor/share-form-televisor.component';
import { PaginacionPequeniaComponent } from './components/shared/paginacion_pequenia/paginacion_pequenia.component';
import { EliminarMultimediasComponent } from './components/eliminar-multimedias/eliminar-multimedias.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { LoadingInterceptor } from './interceptors/loading';
import { RegistroComponent } from './components/login_logout/registro/registro.component';
import { LoginComponent } from './components/login_logout/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ClientesComponent,
    PaginacionComponent,
    DetallesClienteComponent,
    MultimediaComponent,
    NgDropFilesDirective,
    VisualizarMultimediasComponent,
    DomSeguroPipe,
    CronogramaComponent,
    ManipularVideoDirective,
    ImagenesComponent,
    VideosComponent,
    RevisarCronogramaComponent,
    MultimediaDelTelevisorComponent,
    ModalComponent,
    CrearClienteComponent,
    UpdateClienteComponent,
    ShareFormClienteComponent,
    CrearTelevisorComponent,
    UpdateTelevisorComponent,
    ShareFormTelevisorComponent,
    PaginacionPequeniaComponent,
    EliminarMultimediasComponent,
    RegistroComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    FeatureRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    NgxSpinnerModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
