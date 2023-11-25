import { Component, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateListComponent } from '../pages/components/create_list/create_list.component';
@Injectable({
  providedIn: 'root'
})
export class CreateListService {

  constructor(private dialog: MatDialog) { }

  openModal():void{
    const dialogCreateList = this.dialog.open(CreateListComponent,{
      panelClass: 'adicionarLista',
    });
  }
}
