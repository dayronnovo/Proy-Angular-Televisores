import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

// import { HomeComponent } from './';
// import { PageNotFoundComponent } from './';
import { ClientesComponent } from './components/clientes/clientes.component';

const routes: Routes = [
  { path: 'clientes', component: ClientesComponent },
  // { path: 'path2', component: Name2Component },
  // { path: 'path3', component: Name3Component },
  { path: '**', pathMatch: 'full', redirectTo: 'clientes' },
  // { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class FeatureRoutingModule {}
