import { Component, Input, OnInit } from '@angular/core';
import { CardShow } from 'src/app/dto/card-show';
import { ItemLista } from 'src/app/dto/item-lista';
import { ListaDto } from 'src/app/dto/lista-dto';
import { ListaService } from 'src/app/services/lista/lista.service';
import { MatDialog} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UserPageComponent } from '../../user-page/user-page/user-page.component';
import * as $ from 'jquery';
import { css } from 'jquery';
@Component({
  selector: 'app-get-list',
  templateUrl: './get-list.component.html',
  styleUrls: ['./get-list.component.scss'],
})
export class GetListComponent implements OnInit {
  
  @Input() hasPrivilegio: boolean = false
  @Input() idLista!: number;
  @Input() idUsuario!: number;

  lista!: ListaDto;
  nrItensLista!: number;
  avaliacaoMedia!: number;
  duracatoTotal!: number;
  mostrarAddList: boolean = false;
  resultadoBotaoAdicionar!: string;
  exibirItem!: ItemLista;
  cardAtual!: CardShow;
  ajuste: boolean | undefined;
  constructor(private listaService :ListaService, public dialog: MatDialog, public router: Router, private userPage: UserPageComponent){};

  ngOnInit(): void {
    this.carregarLista();
    
  }

  validaResultadoAdicionar(){
    this.mostrarAddList = false;
    const myInterval = setTimeout(() => { this.resultadoBotaoAdicionar = ''; this.atualizarListas(myInterval); }, 3000);
    return this.resultadoBotaoAdicionar != 'erro' && this.resultadoBotaoAdicionar != '';
  }

  carregarLista(){
    this.listaService.visualizarLista(this.idLista).subscribe( res => {
      this.lista = res;
      this.nrItensLista = this.lista.itens.length;
      this.avaliacaoMedia = Math.round(this.lista.itens.map(item => item.avaliacao).reduce( (p, c) => p + c, 0) / this.nrItensLista * 100) / 100;
    })
  }

  atualizarListas(myInterval: any){
    clearInterval(myInterval)
    this.carregarLista();
  }

  editarItem(item: ItemLista){
    this.mostrarAddList = true;
    this.exibirItem = item;
    
    if(item.id)
      this.cardAtual = {
        tipo: 'filme',
        id: item.id,
        nome: item.nome,
        cargoOuDescricao: 'string',
        slugifiedNome: 'string',
        urlImagem: item.urlImagem
      }
      this.ajuste = true;
  }

  deleteItem(idLIsta: number, item: ItemLista){
    if(item.id){
      this.listaService.removerItem(idLIsta, Array.of(item.id), 'session').subscribe(rs => {
        alert(rs)
        this.carregarLista();
      });
    }
  }
  deleteLista() {
    const confirmacao = confirm('Tem certeza que deseja excluir a lista? Todos os itens serão excluídos ao confirmar essa ação');
  
    if (confirmacao) {
      this.listaService.deleteLista(this.idLista, 'session').subscribe(
        rs => {
          alert(rs);
          this.userPage.voltarVisaoGeral();
        },
        error => {
          console.error('Erro ao excluir lista', error);
          alert('Erro ao excluir lista');
        }
      );
    }
  }  
}
