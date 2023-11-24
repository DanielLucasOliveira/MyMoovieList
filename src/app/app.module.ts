import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { DetailMovieComponent } from './pages/detail-movie/detail-movie.component';

@NgModule({
  declarations: [
    AppComponent,
    DetailMovieComponent
  ],
  imports: [
    BrowserModule,
    FormsModule, 
    AppRoutingModule    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
