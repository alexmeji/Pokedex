import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http'

import 'rxjs/add/operator/toPromise'
import 'rxjs/add/operator/map'

@Injectable()
export class PokemonService {
  constructor(){}

  private handleError(error: any): Promise<any> {
    console.error("Ha ocurrido un error")
    console.log(error)
    return Promise.reject(error.message || error)
  }

}
