import { Component } from '@angular/core';
import { CardMultiBuscaDTO } from 'src/app/dto/card-multi-busca-dto';
import { CardService } from 'src/app/services/card.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  cards = {} as CardMultiBuscaDTO;
  search: string | undefined;
  timeoutId: any = 0;

  constructor(private cardService: CardService){};

  getCardsBuscaTodos(event: any){
    clearTimeout(this.timeoutId);
    this.timeoutId = setTimeout(()=>{
      let busca = event.target.value;
      this.cardService.pesquisarTodos(busca).subscribe((cards: CardMultiBuscaDTO) => {
        this.cards = cards;
        console.log(JSON.stringify(cards.series))
      });
    }, 500);
  }
  
}
