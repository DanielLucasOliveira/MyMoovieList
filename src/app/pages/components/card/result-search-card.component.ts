import { Component, Input } from '@angular/core';
import { CardMultiBuscaDTO } from 'src/app/dto/card-multi-busca-dto';

@Component({
  selector: 'result-search',
  templateUrl: './result-search-card.component.html',
  styleUrls: ['./result-search-card.component.scss']
})
export class ResultSearchCardComponent {
  @Input()
  resultadoPesquisa!: CardMultiBuscaDTO;
}
