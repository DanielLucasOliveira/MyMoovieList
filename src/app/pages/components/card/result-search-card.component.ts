import { Component, Input } from '@angular/core';
import { ListCardShow } from 'src/app/dto/list-card-show';

@Component({
  selector: 'result-search',
  templateUrl: './result-search-card.component.html',
  styleUrls: ['./result-search-card.component.scss']
})
export class ResultSearchCardComponent {
  @Input()
  resultadoPesquisa!: ListCardShow[];
}
