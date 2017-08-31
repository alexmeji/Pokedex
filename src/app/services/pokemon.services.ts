import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http'

import 'rxjs/add/operator/toPromise'
import 'rxjs/add/operator/map'
import { Pokelist } from "../classes/pokelist";
import { PokeData } from "../classes/pokemon-data";

@Injectable()
export class PokemonService {
  private basePathV2 = "https://pokeapi.co/api/v2"
  private basePathV1 = "https://pokeapi.co/api/v1"
  private headers = new Headers({})
  constructor(private http:Http){}

  private handleError(error: any): Promise<any> {
    console.error("Ha ocurrido un error")
    console.log(error)
    return Promise.reject(error.message || error)
  }

  getPokemons(offset:number): Promise<Pokelist> {
    let url = `${this.basePathV2}/pokemon/?offset=${offset}`
    return this.http.get(url, {headers: this.headers})
              .toPromise()
              .then(response => response.json() as Pokelist)
              .catch(this.handleError)
  }

  getPokemonData(pokemonId: string): Promise<PokeData> {
    let url = `${this.basePathV1}/pokemon/${pokemonId}/`
    return this.http.get(url)
              .toPromise()
              .then(response => response.json() as PokeData)
              .catch(this.handleError)
  }
}
