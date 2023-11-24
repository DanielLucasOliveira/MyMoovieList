import { Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';
import { ListCardShow } from 'src/app/dto/list-card-show';
import * as $ from 'jquery';
import { CardShow } from 'src/app/dto/card-show';

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

  abreAddToList(card: CardShow){
    this.cardAtual = card;
    this.mostrarAddList = true;
  }

  validaResultadoAdicionar(){
    this.mostrarAddList = false;
    setTimeout(() => { this.resultadoBotaoAdicionar = '' }, 5000);
    return this.resultadoBotaoAdicionar != 'erro' && this.resultadoBotaoAdicionar != '';
  }
}
