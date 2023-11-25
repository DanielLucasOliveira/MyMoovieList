import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, retry, throwError } from 'rxjs';
import { ItemLista } from 'src/app/dto/item-lista';
import { ListaDto } from 'src/app/dto/lista-dto';
import { GlobalVariable } from 'src/app/global-variable';

@Injectable({
  providedIn: 'root'
})
export class ListaService {

  baseUrl: string = `${GlobalVariable.BASE_API_URL}/lista`; 

  constructor(private httpClient: HttpClient) { }

  adicionarItem(idLista: number, itens: ItemLista[], sessionId: string): Observable<string> {
    return this.httpClient.post(`${this.baseUrl}/${idLista}/adicionar_item`, itens, { params: {sessionId: sessionId},  responseType: 'text'})
  }

  visualizarLista(idLista: number): Observable<ListaDto>{
    return this.httpClient.get<ListaDto>(`${this.baseUrl}/${idLista}`)
      .pipe(retry(2), catchError(this.handleError))
  }

  handleError(error: HttpErrorResponse){
    return throwError(() => `UrlPath:  Código do erro: ${error.status}, mensagem: ${error.message}`);
  }
}