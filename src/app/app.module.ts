import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MaterialModule } from './components/material.module';
import { AppComponent } from './app.component';
import { ToastService } from './toast.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { AppRoutingModule } from './app-routing.module';

import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ReporteComponent } from './reporte/reporte.component';
import { CrudApiComponent } from './crud-api/crud-api.component';
import { AddProductModalComponent } from './add-product-modal/add-product-modal.component';
import { EditProductModalComponent } from './edit-product-modal/edit-product-modal.component';
import { SweetAlertService } from './sweet.alert';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    ReporteComponent,
    CrudApiComponent,
    AddProductModalComponent,
    EditProductModalComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    BrowserAnimationsModule,
    FormsModule,
    MaterialModule, // Import module individual
    AppRoutingModule,
    HttpClientModule,
    MatSnackBarModule,
  ],
  providers: [ToastService, SweetAlertService],
  bootstrap: [AppComponent],
})
export class AppModule {}
