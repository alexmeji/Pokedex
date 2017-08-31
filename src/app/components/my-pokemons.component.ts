import { Component } from '@angular/core'
import { MaterializeDirective, MaterializeAction } from 'angular2-materialize';
import { Pokemon } from "../classes/Pokemon";
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import * as firebase from 'firebase/app';

declare var Materialize:any;

@Component({
  moduleId: module.id,
  selector: 'my-pokemons',
  templateUrl: '../templates/my-pokemons.component.html',
  styleUrls: ['../styles/my-pokemons.component.css']
})

export class MyPokemonsComponent {
  currentUser: any = null
  myPokemons: FirebaseListObservable<any>
  pokemons:Array<any> = [];

  constructor(private afAuth: AngularFireAuth, private db: AngularFireDatabase){
    this.afAuth.authState.subscribe( (auth) => {
      if (auth != null) {
        this.currentUser = auth
        this.loadPokemons(auth)
      }
    })
  }

  loadPokemons(auth) {
    this.myPokemons = this.db.list('users/'+auth.uid+'/pokemons')
    this.myPokemons.subscribe( snapshot => {
      this.pokemons = snapshot
    })
  }

  deleteFavorite(pokemon) {
    this.db.database.ref().child('users/'+this.currentUser.uid).child('pokemons/'+pokemon.$key).remove().then(response => {
      Materialize.toast(`${pokemon.name} was deleted in your collection`, 4000)
    }).catch( error => {
      console.log(error)
    })
  }
}
