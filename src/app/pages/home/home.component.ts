import { Component, OnInit } from '@angular/core';
import { CardFilmeSerie } from 'src/app/dto/card-filme-serie';
import { CardShow } from 'src/app/dto/card-show';
import { CardService } from 'src/app/services/card/card.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{

  populares: CardFilmeSerie[] = [];

  constructor(private movieService : CardService){

  }
  ngOnInit(): void {
    this.movieService.pesquisarPopulares().subscribe((movie: CardFilmeSerie[]) => {
      this.populares = movie
      console.log(this.populares);
      
    })
  }

  mostrarQuickSearch: boolean = false;

  abreBarraPesquisa(){
    this.mostrarQuickSearch = true;
  }
}
