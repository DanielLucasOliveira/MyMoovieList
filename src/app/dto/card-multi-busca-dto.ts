import { CardEmpresa } from "./card-empresa";
import { CardFilmeSerie } from "./card-filme-serie";
import { CardPessoa } from "./card-pessoa";

export interface CardMultiBuscaDTO {
    pessoas: CardPessoa[];
    series: CardFilmeSerie[];
    filmes: CardFilmeSerie[];
    empresas: CardEmpresa[];
}
