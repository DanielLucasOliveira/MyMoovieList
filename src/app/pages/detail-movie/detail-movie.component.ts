import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DetalheFilmeDTO } from 'src/app/dto/detalhe-filme-dto';
import { DetalhesService } from 'src/app/services/detalhes/detalhes.service';

@Component({
  selector: 'app-detail-movie',
  templateUrl: './detail-movie.component.html',
  styleUrls: ['./detail-movie.component.scss']
})
export class DetailMovieComponent implements OnInit {
  filme!: DetalheFilmeDTO;
  total: any;

  constructor(private router: Router, private route : ActivatedRoute, private detalheService: DetalhesService){};

  ngOnInit() {
    let idMovie = this.route.snapshot.paramMap.get('idFilme');
    if(idMovie)
      this.detalheService.detalharFilme(Number.parseInt(idMovie)).subscribe((result: DetalheFilmeDTO) => {
        this.filme = result;
        this.total = Object.keys(this.filme.diretoresEscritores)
        console.log(this.total);
        
      });
    }
}
