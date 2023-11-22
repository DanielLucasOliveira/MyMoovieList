import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RoutingModule } from './routing.module';
import { CadastroComponent } from './cadastro/cadastro.component';
import { ResultSearchCardComponent } from './components/card/result-search-card.component';
import { NavbarComponent } from './components/navbar/navbar.component';



@NgModule({
  declarations: [
    HomeComponent,
    LoginComponent,
    CadastroComponent,
    ResultSearchCardComponent,
    NavbarComponent
  ],
  imports: [
    CommonModule,
    RoutingModule
  ]
})
export class PagesModule { }
