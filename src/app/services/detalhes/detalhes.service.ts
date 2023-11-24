import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalVariable } from 'src/app/global-variable';
import { Observable, throwError, catchError } from 'rxjs'
import { DetalheFilmeDTO } from 'src/app/dto/detalhe-filme-dto';


@Injectable({
  providedIn: 'root'
})
export class DetalhesService {

  baseUrl: string = `${GlobalVariable.BASE_API_URL}/card`; 

  constructor(private httpClient: HttpClient) { }

  detalharFilme(idFilme: number) :Observable<DetalheFilmeDTO> {
    return this.httpClient.get<DetalheFilmeDTO>(`${this.baseUrl}/detalhar/filme/${idFilme}`)
      .pipe(catchError(this.handleError))
  }

  handleError(error: HttpErrorResponse){
    return throwError(() => `UrlPath:  Código do erro: ${error.status}, mensagem: ${error.message}`);
  }
}
