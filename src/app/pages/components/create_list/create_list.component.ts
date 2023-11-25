import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Usuario } from 'src/app/dto/usuario';
import { ListaService } from 'src/app/services/lista/lista.service';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-create_list',
  templateUrl: './create_list.component.html',
  styleUrls: ['./create_list.component.scss']
})
export class CreateListComponent {
  nome_lista: string = '';
  is_private: boolean = false;
  usuario = {} as Usuario;
  sessionId: any;

  @Input() listName!:string;
  @Input() isPublic!:string;
  @Input() usuarioId!:string;
  @Output() onClose = new EventEmitter<boolean>();
  
  constructor(
    public dialogCreateList: MatDialogRef<CreateListComponent>, 
    private listaService: ListaService,
    private userService : UsuarioService,
    private route : ActivatedRoute,
    ) {}

    ngOnInit(): void {
      this.getID();
      this.userService.getByID(this.sessionId).subscribe((user) => {
        this.usuario = user
      });
    }
  
    getID(){
      this.sessionId = this.route.snapshot.paramMap.get('idSession');
    }
    criarLista(){
      if(this.nome_lista != null && this.is_private != null && this.usuario.id){
        this.listaService.createLista(this.usuario.id, this.nome_lista, this.is_private, 'sessionid')
      }
  }
}