import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CadastroService } from 'src/app/services/cadastro/cadastro.service';
import { LocalStorageService } from 'src/app/services/localstorage/local-storage.service';

@Component({
  selector: 'app-editar-perfil',
  templateUrl: './editar-perfil.component.html',
  styleUrls: ['./editar-perfil.component.scss']
})
export class EditarPerfilComponent implements OnInit {

  user = {} as any;
  usuarioLogado: any;

  constructor(private router : Router, private localStorageService: LocalStorageService, private cadastroService: CadastroService){}

  ngOnInit(): void {
    try {
      this.usuarioLogado = this.localStorageService.getUsuario();
      if(this.usuarioLogado && this.usuarioLogado != ''){
        this.user.nome = this.usuarioLogado.nome;
        this.user.email = this.usuarioLogado.email;
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
      this.user.senha = this.user.novaSenha;
      this.cadastroService.atualizarCadastroUsuario(this.usuarioLogado.id, user).then(() => {
        alert('Senha atualizada com sucesso! Por favor, faça login novamente!');
        this.localStorageService.deslogar();
        this.router.navigate(['/login'])
      })
    }
    return false;
  }

}
