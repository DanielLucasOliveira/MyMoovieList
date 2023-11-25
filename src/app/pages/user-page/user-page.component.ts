import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ListaDto } from 'src/app/dto/lista-dto';
import { Usuario } from 'src/app/dto/usuario';
import { CreateListService } from 'src/app/services/create_list.service';
import { ListaService } from 'src/app/services/lista/lista.service';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnInit {

  sessionId: any;
  usuario = {} as Usuario
  listas = {} as ListaDto[]
  listaAtual :number = 0;

  constructor(private userService : UsuarioService, private route : ActivatedRoute, private router: Router,
    private createListService: CreateListService,
    private listaService: ListaService,) {
  }

  ngOnInit(): void {
    this.getID();
    this.userService.getByID(this.sessionId).subscribe((user) => {
      this.usuario = user
      this.listaService.visualizarListasUsuario(this.sessionId).subscribe((result: ListaDto[]) => {
        this.listas = result;
      });
    });
  }

  getID(){
    this.sessionId = this.route.snapshot.paramMap.get('idSession');
  }

  isVisaoGeral(){
    return this.listaAtual === 0;
  }

  isListaAtual(id: number){
    return this.listaAtual === id;
  }

  ativarListar(listaId: number){
    this.listaAtual = 0;
    setTimeout(() => {
      this.listaAtual = listaId;
    }, 300);
  }

  voltarVisaoGeral(){
    this.listaAtual = 0;
  }

  isCriarLista(){
    return this.listaAtual === -1;
  }

  abrirModal(id : number){

  }
}
