import { Component, OnInit} from '@angular/core'
import { MaterializeDirective, MaterializeAction } from 'angular2-materialize';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import { PlatformLocation } from "@angular/common";

import { PokemonService } from '../services/pokemon.services'
import { PokeData } from "../classes/pokemon-data";
import { Pokemon } from "../classes/Pokemon";

declare var Materialize:any;

@Component({
  moduleId: module.id,
  selector: 'pokemon-detail',
  templateUrl: '../templates/pokemon-detail.component.html',
  styleUrls: ['../styles/pokemon-detail.component.css']
})

export class PokemonDetailComponent implements OnInit{
  pokeData: PokeData = null
  pokemonId:string
  currentUser: any = null

  constructor(private router: Router, private route: ActivatedRoute, private location: Location, private pokemonService:PokemonService, private afAuth: AngularFireAuth, private db: AngularFireDatabase,locationPro: PlatformLocation)
  {
      this.afAuth.authState.subscribe( (auth) => {
        this.currentUser = auth
      })
      locationPro.onPopState(() => window.location.reload());
  }

  ngOnInit() {
    this.pokemonId = this.route.snapshot.params['id'];
    this.loadPokemonData(this.pokemonId);
  }

  loadPokemonData(pokemonId) {
    this.pokemonService.getPokemonData(pokemonId).then(response => {
      this.pokeData = new PokeData(response.pkdx_id, response.name, response.evolutions)
      this.pokeData.abilities = response.abilities
      this.pokeData.name = response.name
      this.pokeData.weight = response.weight
      this.pokeData.height = response.height
      this.pokeData.exp = response.exp
      this.pokeData.hp = response.hp
      this.pokeData.defense = response.defense
      this.pokeData.attack = response.attack
      this.pokeData.types = response.types
    })
    .catch(error => {
      Materialize.toast(error, 4000)
      console.log(error)
    })
  }

  onSelectPokemon(pokemon: Pokemon) {
    this.router.navigate(['/pokemons', pokemon.id]);
    window.location.reload();
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

  goBack() {
    this.location.back()
  }
}
