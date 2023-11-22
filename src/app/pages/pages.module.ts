import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RoutingModule } from './routing.module';
import { CadastroComponent } from './cadastro/cadastro.component';



@NgModule({
  declarations: [
    HomeComponent,
    LoginComponent,
    CadastroComponent
  ],
  imports: [
    CommonModule,
    RoutingModule
  ]
})
export class PagesModule { }
