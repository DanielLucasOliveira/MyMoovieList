import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CardEmpresa } from 'src/app/dto/card-empresa';
import { CardFilmeSerie } from 'src/app/dto/card-filme-serie';
import { CardMultiBuscaDTO } from 'src/app/dto/card-multi-busca-dto';
import { CardPessoa } from 'src/app/dto/card-pessoa';
import { CardShow } from 'src/app/dto/card-show';
import { ListCardShow } from 'src/app/dto/list-card-show';
import { CardService } from 'src/app/services/card/card.service';

@Component({
  selector: 'quickseach',
  templateUrl: './quicksearch.component.html',
  styleUrls: ['./quicksearch.component.scss']
})
export class QuickSearchComponent{
  listaCardShow = [] as ListCardShow[];
  search: string | undefined;
  timeoutId: any = 0;

  constructor(private cardService: CardService){}
  
  getCardsBuscaTodos(event: any){
    clearTimeout(this.timeoutId);
    this.timeoutId = setTimeout(()=>{
      let busca = event.target.value;
      this.listaCardShow = [];
      this.cardService.pesquisarTodos(busca).subscribe((cards: CardMultiBuscaDTO) => {

        if(cards.filmes.length > 0){
          this.listaCardShow.push({
              tipo: 'filmes',
              cards: cards.filmes.slice(0, 5).map(filme => { return this.converteCard(filme, 'filme')})
          })
        } 
        
        if(cards.series.length > 0){
          this.listaCardShow.push({
              tipo: 'series',
              cards: cards.series.slice(0, 5).map(serie => { return this.converteCard(serie, 'serie')})
        })} 
        
        if(cards.pessoas.length > 0){
          this.listaCardShow.push({
              tipo: 'pessoas',
              cards: cards.pessoas.slice(0, 5).map(pessoa => { return this.converteCard(pessoa, 'pessoa')})
            }
        )} 
        
        if(cards.empresas.length > 0){
          this.listaCardShow.push({
              tipo: 'empresas',
              cards: cards.empresas.slice(0, 5).map(empresa => { return this.converteCard(empresa, 'empresa')})
            }
          )
        }
      });
      console.log(this.listaCardShow)
    }, 500);
  }
  
  converteCard(dto: CardPessoa | CardFilmeSerie | CardEmpresa, tipo: string): CardShow {
    let nome = '';
    let cargoOuDescricao = '';

    if(tipo === 'pessoa'){
      nome = (dto as CardPessoa).nome
      cargoOuDescricao = (dto as CardPessoa).cargo.replace('ing', 'or').replace('ion', 'or')
    } else if(tipo === 'filme' || tipo === 'serie') {
      nome = (dto as CardFilmeSerie).titulo
      cargoOuDescricao = (dto as CardFilmeSerie).descricao
    } else if(tipo === 'empresa') {
      nome = (dto as CardEmpresa).nome
    }

    return {
      tipo: tipo,
      id: dto.id,
      nome: nome,
      cargoOuDescricao:  cargoOuDescricao,
      urlImagem: dto.urlImagem,
      slugifiedNome: this.slugify(nome)
    }  
  }

  slugify(str: string) {
    return String(str)
      .normalize('NFKD')
      .replace(/[\u0300-\u036f]/g, '')
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
  }

}
