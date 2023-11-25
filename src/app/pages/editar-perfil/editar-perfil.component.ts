import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/services/localstorage/local-storage.service';

@Component({
  selector: 'app-editar-perfil',
  templateUrl: './editar-perfil.component.html',
  styleUrls: ['./editar-perfil.component.scss']
})
export class EditarPerfilComponent implements OnInit {

  user = {} as any;

  constructor(private router : Router, private localStorageService: LocalStorageService){}

  ngOnInit(): void {
    try {
      const usuarioLogado = this.localStorageService.getUsuario();
      if(usuarioLogado && usuarioLogado != ''){
        this.user.nome = usuarioLogado.nome;
        this.user.email = usuarioLogado.email;
      } else {
        this.router.navigate(['/'])
      }
    } catch (ignore) { 
      this.router.navigate(['/'])
    }
  }

  validarSenha(user: any): boolean{
    const usuarioLogado = this.localStorageService.getUsuario();
    if(this.user.senha === usuarioLogado.senha && this.user.novaSenha == this.user.novaSenhaConfirmation){
      return true;
    }
    return false;
  }

}
