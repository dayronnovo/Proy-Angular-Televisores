import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { ClientesComponent } from './components/clientes/clientes.component';
// Rutas
import { FeatureRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [AppComponent, NavbarComponent, ClientesComponent],
  imports: [BrowserModule, FeatureRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
