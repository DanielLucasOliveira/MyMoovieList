import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Log } from 'src/app/dto/log';
import { GlobalVariable } from 'src/app/global-variable';
import { Observable, throwError, catchError } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class LogService {

  baseUrl: string = `${GlobalVariable.BASE_API_URL}/log`; 

  constructor(private httpClient: HttpClient) { }

  encontrarLog(idLog: number) :Observable<Log> {
    return this.httpClient.get<Log>(`${this.baseUrl}/${idLog}`).pipe(catchError(this.handleError))
  }

  encontrarLogsUsuario(idUsuario: number) :Observable<Log[]> {
    return this.httpClient.get<Log[]>(`${this.baseUrl}/usuario/${idUsuario}`).pipe(catchError(this.handleError))
  }

  handleError(error: HttpErrorResponse){
    return throwError(() => `UrlPath:  Código do erro: ${error.status}, mensagem: ${error.message}`);
  }

}
