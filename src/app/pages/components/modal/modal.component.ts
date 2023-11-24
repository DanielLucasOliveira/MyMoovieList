import { Component, EventEmitter, HostBinding, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {

  @Input() topPosition: string = '0';
  @Input() width: string = '100%';
  @Input() mostrar: boolean = false;
  @Output() mostrarChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  toggle(){
    this.mostrar = !this.mostrar;
    this.mostrarChange.emit(this.mostrar);
  }

  configurarModal(){
    $('.conteudo-modal').css('top', `${this.topPosition}`)
    $('.conteudo-modal').css('width', `${this.width}`)
  }
}
