import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';
import { HttpModule } from '@angular/http'
import { MaterializeModule } from "angular2-materialize";

import { AppComponent } from './app.component';
import { PokemonsComponent } from './components/pokemons.component'
import { PokemonDetailComponent } from './components/pokemon-detail.component'
import { MyPokemonsComponent } from './components/my-pokemons.component'
import { AuthorComponent } from './components/author.component'
import { NotFoundComponent } from "./components/not-found.component";

import { AppRouting } from './router/app-routing.module'

import { PokemonService } from './services/pokemon.services'


@NgModule({
  declarations: [
    AppComponent,
    PokemonsComponent,
    PokemonDetailComponent,
    MyPokemonsComponent,
    AuthorComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    MaterializeModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    HttpModule,
    AppRouting
  ],
  providers: [PokemonService],
  bootstrap: [AppComponent]
})
export class AppModule { }
