import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CardShow } from 'src/app/dto/card-show';
import { ItemLista } from 'src/app/dto/item-lista';
import { ListaService } from 'src/app/services/lista/lista.service';

@Component({
  selector: 'add-to-list',
  templateUrl: './add-to-list.component.html',
  styleUrls: ['./add-to-list.component.scss']
})
export class AddToListComponent implements OnInit {

  usuario: any;
  listaSelecionada: number = 4;
  criandoItem: ItemLista = {id: null, nome: '', comentario: '', avaliacao: 1, status: 'watching', idTmdb: '', urlImagem: ''};
  @Input() cardItem!: CardShow | undefined;
  @Input() resultadoBotaoAdicionar!: string;
  @Output() resultadoBotaoAdicionarChange: EventEmitter<string> = new EventEmitter<string>();


  constructor(private listaService: ListaService){}

  ngOnInit(): void {
    //TODO: PEGAR LISTAS DO CLIENTE LOGADO
  }

  adionarItem(){
    if(this.cardItem != null){
      this.criandoItem.idTmdb = this.cardItem.id + '';
      this.criandoItem.nome = this.cardItem.nome;
      this.criandoItem.urlImagem = this.cardItem.urlImagem;
    }
    console.log('item criado: ' + this.criandoItem)
    try {
      this.listaService.adicionarItem(this.listaSelecionada, Array.of(this.criandoItem), 'sessionid').subscribe((resultado: string) => {
        this.resultadoBotaoAdicionar = `${this.cardItem?.nome} adicionado. lista atualizada`;
        this.resultadoBotaoAdicionarChange.emit(this.resultadoBotaoAdicionar);
      })
    } catch (error) {
      this.resultadoBotaoAdicionar = 'erro';
      this.resultadoBotaoAdicionarChange.emit(this.resultadoBotaoAdicionar);
    }
  }

}
