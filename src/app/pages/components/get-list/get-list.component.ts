import { Component, Input, OnInit } from '@angular/core';
import { ListaDto } from 'src/app/dto/lista-dto';
import { ListaService } from 'src/app/services/lista/lista.service';

@Component({
  selector: 'app-get-list',
  templateUrl: './get-list.component.html',
  styleUrls: ['./get-list.component.scss']
})
export class GetListComponent implements OnInit {
  @Input() idLista!: number;
  lista!: ListaDto;
  nrItensLista!: number;
  avaliacaoMedia!: number;
  duracatoTotal!: number;

  constructor(private listaService :ListaService){};

  ngOnInit(): void {

    this.listaService.visualizarLista(this.idLista).subscribe( res => {
      console.log(res)
      this.lista = res;
      this.nrItensLista = this.lista.itens.length;
      this.avaliacaoMedia = Math.round(this.lista.itens.map(item => item.avaliacao).reduce( (p, c) => p + c, 0) / this.nrItensLista * 100) / 100;
      this.duracatoTotal = 2;//TODO: fazer um detalhes service pra pegar essa informacao
    })

  }

}
