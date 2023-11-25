import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CardShow } from 'src/app/dto/card-show';
import { ItemLista } from 'src/app/dto/item-lista';
import { ListaDto } from 'src/app/dto/lista-dto';
import { ListaService } from 'src/app/services/lista/lista.service';

@Component({
  selector: 'add-to-list',
  templateUrl: './add-to-list.component.html',
  styleUrls: ['./add-to-list.component.scss']
})
export class AddToListComponent implements OnInit {

  usuario: any;
  listasUsuario!: ListaDto[];
  @Input() resultadoBotaoAdicionar!: string;
  @Output() resultadoBotaoAdicionarChange: EventEmitter<string> = new EventEmitter<string>();
  @Input() idUsuario!: number;
  @Input() cardItem!: CardShow | undefined;
  @Input() criandoItem!: ItemLista;
  @Input() listaSelecionada!: number;

  getID(){
    if(this.idUsuario == null)
      this.idUsuario = Number(this.route.snapshot.paramMap.get('idSession'));
  }

  constructor(private listaService: ListaService, private route : ActivatedRoute, private router: Router){}

  ngOnInit(): void {
    this.getID()
    if(this.listaSelecionada != null){
      this.listaService.visualizarLista(this.listaSelecionada).subscribe(rst => {
        this.listasUsuario = Array.of(rst);
      })
    } else if(this.idUsuario != null){
      this.listaService.visualizarListasUsuario(this.idUsuario).subscribe(rst => {
        this.listasUsuario = rst;
        this.listaSelecionada = this.listasUsuario[0].id;
      });
    }
    this.criandoItem = {id: null, nome: '', comentario: '', avaliacao: 1, status: 'assistindo', idTmdb: '', urlImagem: ''};
  }

  reset(){
    this.listaService.visualizarListasUsuario(this.idUsuario).subscribe(rst => {
      this.listasUsuario = rst;
      this.listaSelecionada = this.listasUsuario[0].id;
    });
  }

  adicionarItem(){
    if(this.cardItem != null){
      this.criandoItem.idTmdb = this.cardItem.id + '';
      this.criandoItem.nome = this.cardItem.nome;
      this.criandoItem.urlImagem = this.cardItem.urlImagem;
    } 
    if(this.criandoItem.id != null){
      let idLista = this.existeNaLista(this.criandoItem.id);
      if(idLista != -1){
        try{
          this.listaService.editarItem(this.criandoItem.id, this.criandoItem, 'sessionId').subscribe(rs => { 
            this.criandoItem = rs;
            this.resultadoBotaoAdicionar = `${this.cardItem?.nome} editado. item atualizado`;
            this.resultadoBotaoAdicionarChange.emit(this.resultadoBotaoAdicionar); 
          });
        }catch(error){
          this.resultadoBotaoAdicionar = 'erro';
          this.resultadoBotaoAdicionarChange.emit(this.resultadoBotaoAdicionar);
        }
      }
    }  else {
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

  listaSelecionadaChange(target: any){
    if(target != null){
      this.listaSelecionada = target.value
    }
  }

  statusChange(target: any){
    if(target != null){
      this.criandoItem.status = target.value
    }
  }

  listaVazia(){
    return this.listasUsuario == null || this.listasUsuario.length === 0;
  }

  existeNaLista(itemId: number): number{
    
    for (const lista of this.listasUsuario) {
      for (const item of lista.itens) {
        if(item.id == itemId){
          return lista.id;
        }
     }
    }

    return -1;
  }

}
