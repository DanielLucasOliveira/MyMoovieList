import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CardShow } from 'src/app/dto/card-show';
import { ItemLista } from 'src/app/dto/item-lista';
import { ListaDto } from 'src/app/dto/lista-dto';
import { ListaService } from 'src/app/services/lista/lista.service';
import { LocalStorageService } from 'src/app/services/localstorage/local-storage.service';

@Component({
  selector: 'add-to-list',
  templateUrl: './add-to-list.component.html',
  styleUrls: ['./add-to-list.component.scss']
})
export class AddToListComponent implements OnInit {

  usuario: any;
  @Input() listaSelecionada!: number;
  listasUsuario!: ListaDto[];
  @Input() criandoItem: ItemLista = {id: null, nome: '', comentario: '', avaliacao: 1, status: 'watching', idTmdb: '', urlImagem: ''};
  @Input() cardItem!: CardShow | undefined;
  @Input() resultadoBotaoAdicionar!: string;
  @Output() resultadoBotaoAdicionarChange: EventEmitter<string> = new EventEmitter<string>();


  constructor(private listaService: ListaService, private localStorageService: LocalStorageService){}

  ngOnInit(): void {
    this.usuario = this.localStorageService.getUsuario();
    console.log(this.usuario);
    if(this.usuario != null){
      this.listaService.visualizarListasUsuario(this.usuario.id).subscribe(rst => {
        this.listasUsuario = rst;
      });
    }
  }

  adicionarItem(){
    if(this.cardItem != null){
      this.criandoItem.idTmdb = this.cardItem.id + '';
      this.criandoItem.nome = this.cardItem.nome;
      this.criandoItem.urlImagem = this.cardItem.urlImagem;
    }
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
