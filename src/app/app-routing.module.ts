import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ReporteComponent } from './reporte/reporte.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'covid19', component: ReporteComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
