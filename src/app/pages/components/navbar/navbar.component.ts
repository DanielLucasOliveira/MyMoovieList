import { Component, ViewChildren, QueryList, OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/services/localstorage/local-storage.service';
import { QuickSearchComponent } from '../quicksearch/quicksearch.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  mostrarQuickSearch: boolean = false;
  @ViewChildren(QuickSearchComponent) quickSearch!: QueryList<QuickSearchComponent>

  constructor(private localStorageService: LocalStorageService){  }
  
  ngOnInit(): void {
    this.isLogado();
  }

  deslogarUsuario(){
    this.localStorageService.deslogar();
    window.location.reload();
  }

  isLogado(){
    try{
      return this.localStorageService.getUsuario() && this.localStorageService.getUsuario() != '';
    } catch (err) {
      return false;
    }
  }

  abreBarraPesquisa(){
    this.resetQuickSearch();
    this.mostrarQuickSearch = true;
  }

  public resetQuickSearch(): void {
    this.quickSearch.forEach(c => c.reset());
  }
}
