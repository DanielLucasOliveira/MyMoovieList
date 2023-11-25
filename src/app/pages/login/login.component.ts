import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/dto/usuario';
import { LocalStorageService } from 'src/app/services/localstorage/local-storage.service';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{

  user = {} as Usuario;
  usuarios: Usuario[] = [];
  
  constructor(private router : Router, private userService : UsuarioService, private localStorageService : LocalStorageService) { }
  
  ngOnInit(): void {
    this.getUser()
    if(this.localStorageService.getUsuario()){
      this.router.navigate([`userPage/${this.localStorageService.getUsuario().id}`])
    }
  }

  getUser(){
    this.userService.getUsers().subscribe((users : Usuario[]) => {
      this.usuarios = users
    })
  }

  verificarUsuario(user : Usuario){
    this.userService.getUsuario(user.email.toString()).subscribe((userCadastrado) => {
      const usuario = userCadastrado
      if(user.senha === usuario.senha){
        this.localStorageService.setUsuario(usuario)
        this.router.navigate([`userPage/${usuario.id}`])
      } else {
        return alert('Falha no login')
      }
    })
  }

}
