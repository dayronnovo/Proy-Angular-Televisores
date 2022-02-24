import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FeatureRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { ClientesComponent } from './components/clientes/clientes.component';
import { PaginacionComponent } from './components/shared/paginacion/paginacion.component';
import { DetallesClienteComponent } from './components/detalles-cliente/detalles-cliente.component';
import { MultimediaComponent } from './components/multimedia/multimedia.component';

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

import { SwiperModule } from 'swiper/angular';

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
    SwiperModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
