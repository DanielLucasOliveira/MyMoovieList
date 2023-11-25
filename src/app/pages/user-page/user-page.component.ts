import { Component, OnInit,  QueryList, ViewChildren } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ListaDto } from 'src/app/dto/lista-dto';
import { Usuario } from 'src/app/dto/usuario';
import { CreateListService } from 'src/app/services/create_list.service';
import { ListaService } from 'src/app/services/lista/lista.service';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import { QuickSearchComponent } from '../components/quicksearch/quicksearch.component';
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
  mostrarQuickSearch: boolean = false;
  mostrarCriarLista: boolean = false;
  resultadoCriarLista!: string;
  @ViewChildren(QuickSearchComponent) quickSearch!: QueryList<QuickSearchComponent>

  constructor(private userService : UsuarioService, private route : ActivatedRoute, private router: Router,
    private createListService: CreateListService, private listaService: ListaService,) {

  }

  public resetQuickSearch(): void {
    this.quickSearch.forEach(c => c.reset());
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

  atualizarListas(myInterval: any){
    clearInterval(myInterval);
    this.ngOnInit();
  }

  validaResultadoAdicionar(){
    this.mostrarCriarLista = false;
    const myInterval = setInterval(() => { this.resultadoCriarLista = ''; this.atualizarListas(myInterval); }, 3000);
    return this.resultadoCriarLista != 'erro' && this.resultadoCriarLista != '';
  }

  abreBarraPesquisa(){
    this.resetQuickSearch();
    this.mostrarQuickSearch = true;
  }

  getID(){
    this.sessionId = this.route.snapshot.paramMap.get('idSession');
    return Number(this.sessionId);
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
    this.atualizarListas(0);
  }

  isCriarLista(){
    return this.listaAtual === -1;
  }
  abrirModal():void{
    this.listaAtual = -1;
    this.mostrarCriarLista = true;
  }
}
