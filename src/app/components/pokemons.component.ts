import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { MaterializeDirective, MaterializeAction } from 'angular2-materialize';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase/app';

import { Pokemon } from '../classes/Pokemon'
import { PokemonService } from '../services/pokemon.services'

declare var $: any
declare var Materialize:any;

@Component({
  moduleId: module.id,
  selector: 'pokemons',
  templateUrl: '../templates/pokemons.component.html',
  styleUrls: ['../styles/pokemons.component.css']
})

export class PokemonsComponent implements OnInit {
  pokemons:Array<Pokemon> = [];
  currentUser: any = null
  offset:number = 0

  constructor(private router: Router, private pokemonService:PokemonService, private afAuth: AngularFireAuth, private db: AngularFireDatabase){
    this.afAuth.authState.subscribe( (auth) => {
      this.currentUser = auth
    })
  }

  ngOnInit(){
    this.loadPokemons()
  }

  loadPokemons() {
    this.pokemonService.getPokemons(this.offset).then(response => {
      for (let pokemon of response.results) {
        this.pokemons.push(new Pokemon(pokemon.url, pokemon.name))
      }
      this.offset += 20
    }).catch(error => {
      Materialize.toast(error, 4000)
    })
  }

  saveFavorite(pokemon: Pokemon){
    if (this.currentUser) {
      this.db.database.ref().child('users/'+this.currentUser.uid).child('pokemons').push(pokemon).then(user => {
        Materialize.toast(`${pokemon.name} added to your favorite collection`, 4000)
      }).catch(error => {
        Materialize.toast(error.message, 4000)
      })
    } else {
      Materialize.toast('You have to be logged', 4000)
    }
  }

  onSelectPokemon(pokemon: Pokemon) {
    this.router.navigate(['/pokemon', pokemon.id])
  }
}
