import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ListaService } from 'src/app/services/lista/lista.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-create_list',
  templateUrl: './create_list.component.html',
  styleUrls: ['./create_list.component.scss']
})
export class CreateListComponent {
  nomeLista: string = '';
  isPrivate: boolean = false;
  idUsuario!: number;

  @Input() listName!: string;
  @Input() isPublic!: string;
  @Input() usuarioId!: string;
  @Input() resultadoCriarLista!: string;
  @Output() resultadoCriarListaChange: EventEmitter<string> = new EventEmitter<string>();
  @Output() mostarModal: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private listaService: ListaService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.getID();
  }

  getID() {
    this.idUsuario = Number(this.route.snapshot.paramMap.get('idSession'));
  }

  criarLista() {
    if (this.nomeLista != null && this.isPrivate != null && this.idUsuario) {
      this.listaService.createLista(this.idUsuario, this.nomeLista, this.isPrivate, 'sessionid').subscribe(rst => {
        this.resultadoCriarLista = rst;
        this.resultadoCriarListaChange.emit(this.resultadoCriarLista);
      })
    }
  }

  isPrivateChange(target: any) {
    if (target != null) {
      this.isPrivate = target.value
    }
  }

  cancelar() {
    this.mostarModal.emit(false);
  }
}