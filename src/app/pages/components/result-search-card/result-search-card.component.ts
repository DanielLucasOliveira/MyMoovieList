import { Component, Input, ViewChildren, QueryList } from '@angular/core';
import { ListCardShow } from 'src/app/dto/list-card-show';
import { CardShow } from 'src/app/dto/card-show';
import { ItemLista } from 'src/app/dto/item-lista';
import { AddToListComponent } from '../add-to-list/add-to-list.component';
import { LocalStorageService } from 'src/app/services/localstorage/local-storage.service';

@Component({
  selector: 'result-search',
  templateUrl: './result-search-card.component.html',
  styleUrls: ['./result-search-card.component.scss']
})
export class ResultSearchCardComponent {
  @Input() resultadoPesquisa!: ListCardShow[];
  resultadoBotaoAdicionar!: string;
  mostrarAddList: boolean = false;
  cardAtual!: CardShow;
  itemCriando!: ItemLista;
  @ViewChildren(AddToListComponent) addToList!: QueryList<AddToListComponent>

  constructor(private localStorageService: LocalStorageService){ }

  abreAddToList(card: CardShow){
    this.addToList.forEach( c => { c.reset() })
    this.resetaValoresItem();
    this.cardAtual = card;
    this.mostrarAddList = true;
  }

  isLogado(){
    try{
      return this.localStorageService.getUsuario() && this.localStorageService.getUsuario() != '';
    } catch (err) {
      return false;
    }
  }

  validaResultadoAdicionar(){
    this.mostrarAddList = false;
    setTimeout(() => { this.resultadoBotaoAdicionar = '' }, 5000);
    return this.resultadoBotaoAdicionar != 'erro' && this.resultadoBotaoAdicionar != '';
  }

  resetaValoresItem(){
    this.itemCriando = {id: null, nome: '', comentario: '', avaliacao: 1, status: 'assistindo', idTmdb: '', urlImagem: ''};
  }
}
