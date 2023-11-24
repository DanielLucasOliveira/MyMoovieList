import { ItemLista } from "./item-lista";

export interface ListaDto {
    id: number;
    idUsuario: number;
    nome: string;
    itens: ItemLista[];
}
