import { Component, ViewChildren, QueryList } from '@angular/core';
import { LocalStorageService } from 'src/app/services/localstorage/local-storage.service';
import { QuickSearchComponent } from '../quicksearch/quicksearch.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  mostrarQuickSearch: boolean = false;
  @ViewChildren(QuickSearchComponent) quickSearch!: QueryList<QuickSearchComponent>

  constructor(private localStorageService: LocalStorageService){  }
  
  deslogarUsuario(){
    this.localStorageService.deslogar();
    window.location.reload();
  }

  isLogado(){
    return this.localStorageService.getUsuario() && this.localStorageService.getUsuario() != '';
  }

  abreBarraPesquisa(){
    this.resetQuickSearch();
    this.mostrarQuickSearch = true;
  }

  public resetQuickSearch(): void {
    this.quickSearch.forEach(c => c.reset());
  }
}
