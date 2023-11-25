import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { DetailMovieComponent } from './pages/detail-movie/detail-movie.component';
import { CreateListService } from './services/create_list.service';
import { MatDialogModule } from '@angular/material/dialog';
@NgModule({
  declarations: [
    AppComponent,
    DetailMovieComponent
  ],
  imports: [
    BrowserModule,
    FormsModule, 
    AppRoutingModule,
    MatDialogModule,   
  ],
  providers: [CreateListService],
  bootstrap: [AppComponent]
})
export class AppModule { }
