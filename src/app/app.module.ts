import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { ClientesComponent } from './components/clientes/clientes.component';
import { PaginacionComponent } from './components/shared/paginacion/paginacion.component';

// Rutas
import { FeatureRoutingModule } from './app-routing.module';
import { DetallesClienteComponent } from './components/detalles-cliente/detalles-cliente.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ClientesComponent,
    PaginacionComponent,
    DetallesClienteComponent,
  ],
  imports: [BrowserModule, FeatureRoutingModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
