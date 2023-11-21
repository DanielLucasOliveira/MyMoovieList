import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { TesteComponent } from './teste/teste.component';



@NgModule({
  declarations: [
    HomeComponent,
    LoginComponent,
    TesteComponent
  ],
  imports: [
    CommonModule
  ]
})
export class PagesModule { }
