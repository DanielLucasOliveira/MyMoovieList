import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from 'src/app/dto/usuario';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnInit {

  sessionId: any;
  usuario = {} as Usuario

  constructor(private userService : UsuarioService, private route : ActivatedRoute, private router: Router) {

  }

  ngOnInit(): void {
    this.getID();
    this.userService.getByID(this.sessionId).subscribe((user) => {
      this.usuario = user
    });

  }

  getID(){
    this.sessionId = this.route.snapshot.paramMap.get('idSession');
  }
  userVG(): any{
    console.log(this.router.navigated);
    
    return this.router.navigated
  }

  isCriarLista(){
    return this.router.isActive('/criarLista', true);
  }
}
