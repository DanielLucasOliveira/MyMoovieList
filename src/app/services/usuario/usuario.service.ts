import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from 'src/app/dto/usuario';
import { GlobalVariable } from 'src/app/global-variable';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  baseUrl: string = `${GlobalVariable.BASE_API_URL}/usuario`; 

  constructor(private httpClient: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({'Content-type': 'application/json'})
  }

  getUsers(): Observable<Usuario[]>{
    return this.httpClient.get<Usuario[]>(`${this.baseUrl}/listar`)
  }

  getUsuario(emailUsuario: string): Observable<Usuario>{
    return this.httpClient.get<Usuario>(`${this.baseUrl}/login`, {params: {email: emailUsuario}})
  }

  getByID(id : number): Observable<Usuario>{
    return this.httpClient.get<Usuario>(`${this.baseUrl}/currentUser`, {params: {id : id}})
  }
}
