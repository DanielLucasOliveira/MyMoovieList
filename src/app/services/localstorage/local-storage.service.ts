import { Injectable } from '@angular/core';
import { Usuario } from 'src/app/dto/usuario';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  private storage: Storage;

  constructor() { 
    this.storage = window.localStorage;
  }

  set(key: string, value: any): boolean {
    if (this.storage) {
      this.storage.setItem(key, value);
      return true;
    }
    return false;
  }

  setUsuario(value: Usuario): boolean {
    if (this.storage) {
      this.storage.setItem('usuario', JSON.stringify(value));
      return true;
    }
    return false;
  }

  getUsuario(): any {
    if (this.storage) {
      return this.storage.getItem('usuario');
    }
    return null;
  }

  get(key: string): any {
    if (this.storage) {
      return JSON.parse(key);
    }
    return null;
  }

  remove(key: string): boolean {
    if (this.storage) {
      this.storage.removeItem(key);
      return true;
    }
    return false;
  }

  clear(): boolean {
    if (this.storage) {
      this.storage.clear();
      return true;
    }
    return false;
  }
  
}
