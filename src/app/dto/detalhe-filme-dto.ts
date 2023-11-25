import { CardPessoa } from "./card-pessoa";

export interface DetalheFilmeDTO {
    urlCapa: string;

    urlImagemFundo: string;

    titulo: string;

    generos: string[];

    dataLancamento: string;

    tituloOriginal: string;

    situacao: string;

    idiomaOriginal: string;

    diretoresEscritores: CardPessoa;

    elencoPrincipal: CardPessoa;

    assistaEm: string;

    duracao: string;

    trailers: string[];

    descricao: string; 
}