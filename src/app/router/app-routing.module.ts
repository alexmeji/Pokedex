import { NgModule } from '@angular/core'
import {RouterModule, Routes} from '@angular/router'

import { PokemonsComponent } from '../components/pokemons.component'
import { PokemonDetailComponent } from '../components/pokemon-detail.component'
import { MyPokemonsComponent } from '../components/my-pokemons.component'
import { AuthorComponent } from '../components/author.component'
import { NotFoundComponent } from "../components/not-found.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'pokemons',
    pathMatch: 'full'
  },
  {
    path: 'pokemons',
    component: PokemonsComponent
  },
  {
    path: 'pokemon/:id',
    component: PokemonDetailComponent
  },
  {
    path: 'mypokemons',
    component: MyPokemonsComponent
  },
  {
    path: 'author',
    component: AuthorComponent
  },
  {
    path: '**',
    component: NotFoundComponent
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRouting {}
