import { Component, OnInit,  QueryList, ViewChildren } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ListaDto } from 'src/app/dto/lista-dto';
import { Usuario } from 'src/app/dto/usuario';
import { CreateListService } from 'src/app/services/create_list.service';
import { ListaService } from 'src/app/services/lista/lista.service';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import { LocalStorageService } from 'src/app/services/localstorage/local-storage.service';
import { QuickSearchComponent } from '../../components/quicksearch/quicksearch.component';
import { LogService } from 'src/app/services/log/log.service';
import { Log } from 'src/app/dto/log';
import { CardActivity } from 'src/app/dto/card-activity';
import { DetalhesService } from 'src/app/services/detalhes/detalhes.service';
@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnInit {

  sessionId: any;
  usuario = {} as Usuario;
  listas = {} as ListaDto[];
  cardsLogUsuario = [] as CardActivity[];
  listaAtual :number = 0;
  mostrarQuickSearch: boolean = false;
  mostrarCriarLista: boolean = false;
  resultadoCriarLista!: string;
  hasPrivilegio: boolean = false;
  @ViewChildren(QuickSearchComponent) quickSearch!: QueryList<QuickSearchComponent>

  constructor(private userService : UsuarioService, private route : ActivatedRoute, private router: Router,
    private createListService: CreateListService, private listaService: ListaService, private logService: LogService,
    private localStorageService: LocalStorageService, private detalhesService: DetalhesService) { }

  public resetQuickSearch(): void {
    this.quickSearch.forEach(c => c.reset());
  }

  ngOnInit(): void {
    this.getID();
    this.validarAcessoUsuario();
    this.userService.getByID(this.sessionId).subscribe((user) => {
      this.usuario = user
      this.listaService.visualizarListasUsuario(this.sessionId).subscribe((result: ListaDto[]) => {
        this.listas = result;
      });
    });
    this.encontrarLogsUsuario(this.sessionId);
  }

  encontrarLogsUsuario(idUsuario: number){
    this.logService.encontrarLogsUsuario(idUsuario).subscribe((logResult: Log[]) => {
      logResult.forEach( log => {
        this.detalhesService.detalharFilme(log.tmdbFilme).subscribe(filme => {
          this.cardsLogUsuario.push ({
              idLog: log.id,
              idUsuario: log.idUsuario,
              nomeUsuario: this.usuario.nome.toString(),
              acao: log.acao.substring(0, log.acao.lastIndexOf(" ")),
              nomeFilme: filme.titulo,
              idFilme: log.tmdbFilme,
              urlImagemFilme: filme.urlCapa,
            })
          }
        )
      })
    })
  }

  validarAcessoUsuario(){
    if(this.getID() == this.localStorageService.getUsuario().id){
      this.hasPrivilegio = true;
    }
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
    this.mostrarCriarLista = false
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

  slugify(str: string) {
    return String(str)
      .normalize('NFKD')
      .replace(/[\u0300-\u036f]/g, '')
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
  }
}
