import { Component, Input, OnInit } from '@angular/core';
import { CardShow } from 'src/app/dto/card-show';
import { ItemLista } from 'src/app/dto/item-lista';
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
  mostrarAddList: boolean = false;
  resultadoBotaoAdicionar!: string;
  criandoItem!: ItemLista;
  cardAtual!: CardShow;
  constructor(private listaService :ListaService){};

  ngOnInit(): void {
    this.carregarLista();
  }
  
  validaResultadoAdicionar(){
    this.mostrarAddList = false;
    setTimeout(() => { this.resultadoBotaoAdicionar = '' }, 5000);
    return this.resultadoBotaoAdicionar != 'erro' && this.resultadoBotaoAdicionar != '';
  }

  carregarLista(){
    this.listaService.visualizarLista(this.idLista).subscribe( res => {
      console.log(res)
      this.lista = res;
      this.nrItensLista = this.lista.itens.length;
      this.avaliacaoMedia = Math.round(this.lista.itens.map(item => item.avaliacao).reduce( (p, c) => p + c, 0) / this.nrItensLista * 100) / 100;
    })
  }

  editarItem(item: ItemLista){
    this.mostrarAddList = true;
    this.criandoItem = item;
    if(item.id)
      this.cardAtual = {
        tipo: 'filme',
        id: item.id,
        nome: item.nome,
        cargoOuDescricao: 'string',
        slugifiedNome: 'string',
        urlImagem: item.urlImagem
      }
  }

  deleteItem(idLIsta: number, item: ItemLista){
    if(item.id){
      this.listaService.removerItem(idLIsta, Array.of(item.id), 'session').subscribe(rs => {
        alert(rs)
        this.carregarLista();
      });
    }
  }

}
