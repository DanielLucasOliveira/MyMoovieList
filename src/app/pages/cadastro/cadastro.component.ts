import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/dto/usuario';
import { CadastroService } from 'src/app/services/cadastro/cadastro.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})
export class CadastroComponent implements OnInit {

  user = {} as any;

  constructor(private cadastroService : CadastroService, private router : Router) {

  }

  ngOnInit(): void {
  }


  verificarSenhas(user: Usuario){
    if (this.user.senha === this.user.confirmation){
      this.cadastroService.cadastrarUsuario(user);
      setTimeout(() => {
        this.router.navigate(['/login'])
      }, 3000);
      
      
    }
  }

}
