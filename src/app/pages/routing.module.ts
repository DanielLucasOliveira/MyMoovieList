import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Components
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { UserPageComponent } from './user-page/user-page/user-page.component';
import { DetailMovieComponent } from './detail-movie/detail-movie.component';

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
    },
    {
        path: 'userPage/:idSession',
        component: UserPageComponent
    },
    {
        path: 'filme/:idFilme/:nomeFilme',
        component: DetailMovieComponent
    }
    
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RoutingModule { }