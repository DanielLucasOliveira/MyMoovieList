import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { CardMultiBuscaDTO } from '../../dto/card-multi-busca-dto';
import { Observable, throwError, retry, catchError } from 'rxjs'
import { CardFilmeSerie } from '../../dto/card-filme-serie';
import { GlobalVariable } from '../../global-variable';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  baseUrl: string = `${GlobalVariable.BASE_API_URL}/card`; 

  constructor(private httpClient: HttpClient) {   }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  pesquisarTodos(busca: string): Observable<CardMultiBuscaDTO> {
    return this.httpClient.get<CardMultiBuscaDTO>(`${this.baseUrl}/buscar/todos`, { params: {nome: busca} })
      .pipe(retry(2),catchError(this.handleError))
  }
  
  pesquisarFilme(busca: string): Observable<CardFilmeSerie[]> {
    return this.httpClient.get<CardFilmeSerie[]>(`${this.baseUrl}/buscar/filme`, { params: {nome: busca} })
      .pipe(retry(2),catchError(this.handleError))
  }

  pesquisarSerie(busca: string): Observable<CardFilmeSerie[]> {
    return this.httpClient.get<CardFilmeSerie[]>(`${this.baseUrl}/buscar/serie`, { params: {nome: busca} })
      .pipe(retry(2),catchError(this.handleError))
  }

  pesquisarPopulares(): Observable<CardFilmeSerie[]>{
    return this.httpClient.get<CardFilmeSerie[]>(`${this.baseUrl}/populares`)
  }

  handleError(error: HttpErrorResponse){
    return throwError(() => `UrlPath:  Código do erro: ${error.status}, mensagem: ${error.message}`);
  }

}
