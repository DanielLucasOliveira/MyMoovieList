import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Components
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { CadastroComponent } from './cadastro/cadastro.component';

const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'login',
        component: LoginComponent,
    },
    {
        path: 'cadastro',
        component: CadastroComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RoutingModule { }