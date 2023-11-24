import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RoutingModule } from './routing.module';
import { CadastroComponent } from './cadastro/cadastro.component';
import { ResultSearchCardComponent } from './components/result-search-card/result-search-card.component';
import { QuickSearchComponent } from './components/quicksearch/quicksearch.component';
import { AddToListComponent } from './components/add-to-list/add-to-list.component';
import { ModalComponent } from './components/modal/modal.component';
import { GetListComponent } from './components/get-list/get-list.component';
import { FormsModule } from '@angular/forms';
import { UserPageComponent } from './user-page/user-page.component';


@NgModule({
  declarations: [
    HomeComponent,
    LoginComponent,
    CadastroComponent,
    ResultSearchCardComponent,
    QuickSearchComponent,
    AddToListComponent,
    ModalComponent,
    GetListComponent,
    UserPageComponent
  ],
  imports: [
    CommonModule,
    RoutingModule,
    FormsModule,
  ]
})
export class PagesModule { }
