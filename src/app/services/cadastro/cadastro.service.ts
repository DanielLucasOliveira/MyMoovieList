import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { Usuario } from 'src/app/dto/usuario';
import { GlobalVariable } from 'src/app/global-variable';

@Injectable({
  providedIn: 'root'
})
export class CadastroService {

  baseUrl: string = `${GlobalVariable.BASE_API_URL}/usuario`; 

  constructor(private httpClient: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({'Content-type': 'application/json'})
  }

  cadastrarUsuario(user : Usuario): Promise<Usuario | undefined> {
    return this.httpClient.post<Usuario>(`${this.baseUrl}/cadastrar`, user, { params: {} }).toPromise()
  }
  
  handleError(error: HttpErrorResponse){
    return throwError(() => `UrlPath:  Código do erro: ${error.status}, mensagem: ${error.message}`);
  }


}
