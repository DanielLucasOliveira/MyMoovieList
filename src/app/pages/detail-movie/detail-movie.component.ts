import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DetalheFilmeDTO } from 'src/app/dto/detalhe-filme-dto';
import { DetalhesService } from 'src/app/services/detalhes/detalhes.service';
import { AddToListComponent } from '../components/add-to-list/add-to-list.component';
import { CardShow } from 'src/app/dto/card-show';
@Component({
  selector: 'app-detail-movie',
  templateUrl: './detail-movie.component.html',
  styleUrls: ['./detail-movie.component.scss']
})
export class DetailMovieComponent implements OnInit {
  filme!: DetalheFilmeDTO;
  total: any;
  totalCast: any;
  cardAtual!: CardShow;
  resultadoBotaoAdicionar!: string;
  mostrarAddList: boolean = false;
  @ViewChildren(AddToListComponent) addToList!: QueryList<AddToListComponent>
  
  constructor(private router: Router, private route : ActivatedRoute, private detalheService: DetalhesService){};

  ngOnInit() {
    let idMovie = this.route.snapshot.paramMap.get('idFilme');
    if(idMovie)
      this.detalheService.detalharFilme(Number.parseInt(idMovie)).subscribe((result: DetalheFilmeDTO) => {
        this.filme = result;
        this.total = Object.keys(this.filme.diretoresEscritores)
        this.totalCast = Object.keys(this.filme.elencoPrincipal)
        this.cardAtual = {
          tipo: "filme",
          id: Number(idMovie),
          nome: result.titulo,
          cargoOuDescricao: result.descricao,
          slugifiedNome: result.tituloOriginal,
          urlImagem: result.urlCapa,
        }
    });
  }

  validaResultadoAdicionar(){
    this.mostrarAddList = false;
    setTimeout(() => { this.resultadoBotaoAdicionar = ''; }, 3000);
    return this.resultadoBotaoAdicionar != 'erro' && this.resultadoBotaoAdicionar != '';
  }

  mostrarAddToList(){
    this.mostrarAddList = true;
  }
}
