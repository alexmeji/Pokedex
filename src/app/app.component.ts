import { Component, EventEmitter, OnInit } from '@angular/core';
import {MaterializeAction} from 'angular2-materialize';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase/app';

declare var $: any

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Pokedex';
  modalActions = new EventEmitter<string|MaterializeAction>();
  currentUser: any = null
  userName: string = null

  constructor(private afAuth: AngularFireAuth, private db: AngularFireDatabase) {
    this.afAuth.authState.subscribe( (auth) => {
      this.currentUser = auth
      if (this.currentUser != null) {
        this.db.object('users/'+this.currentUser.uid, { preserveSnapshot: true }).subscribe( snapshot => {
          this.userName = snapshot.val().name
        })
      }
    })
  }

  ngOnInit() {
    $(".button-collapse").sideNav({
      menuWidth: 300,
      closeOnclick: true,
      draggable: true
    });
  }

  submitForm(formValue: any) {
    this.afAuth.auth.createUserWithEmailAndPassword(
      formValue["email"],
      formValue["password"]
      ).then( (user) => {
        this.db.database.ref().child('users').child(user.uid).set({email: formValue["email"], name: formValue["name"]})
          .then(_ => {
            this.closeModal()
          })
      }).catch( (error) => {
        console.log(error)
        window.alert(error.message)
      })
  }

  submitLogin(formValue: any) {
    this.afAuth.auth.signInWithEmailAndPassword(formValue["email"], formValue["password"]).then( (user) => {
      console.log(user)
      this.closeModal()
    }).catch( (error) => {
      window.alert(error.message)
      console.log(error)
    })
  }

  openModalSignUp(){
    $("#modal1").modal();
  }

  openModalSignIn(){
    $("#modal2").modal();
  }

  signOut(){
    this.afAuth.auth.signOut()
    window.location.reload()
  }

  closeModal() {
    this.modalActions.emit({action:"modal",params:['close']});
  }
}
