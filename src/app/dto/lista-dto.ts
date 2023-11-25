import { ItemLista } from "./item-lista";

export interface ListaDto {
    id: number;
    idUsuario: number;
    nome: string;
    is_private: string;
    itens: ItemLista[];
}
