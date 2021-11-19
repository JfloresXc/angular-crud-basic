import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ListOfCardsComponent } from './components/ListOfCards/listOfCards.component';
import { CardImageComponent } from './components/CardImage/cardImage.component';
import { NavbarComponent } from './components/Navbar/navbar.component';
import { FormComponent } from './components/form/form.component';

import { HomeComponent } from './pages/home/home.component';
import { HeroesComponent } from './pages/heroes/heroes.component';

import { HeroesService } from './services/heroes.service';
import { routing } from './app.routing';
import { NotesComponent } from './pages/notes/notes.component';
import { ModalComponent } from './components/modal/modal.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    ListOfCardsComponent,
    CardImageComponent,
    NavbarComponent,
    HomeComponent,
    HeroesComponent,
    FormComponent,
    NotesComponent,
    ModalComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    routing,
    NgbModule,
  ],
  providers: [HeroesService],
  bootstrap: [AppComponent],
})
export class AppModule {}
