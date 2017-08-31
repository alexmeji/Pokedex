import { Pokemon } from "./Pokemon";

export class PokeData {
  abilities?:Array<Ability>
  name?:string
  weight?:number
  height?:number
  attack?:number
  defense?:number
  pkdx_id?:number
  exp?:number
  hp?:number
  types: Array<Type>
  picture:string
  pokemon?: Pokemon
  evolutions?: Array<Evolution>

  constructor(id:number, name:string, evolutions:Array<Evolution>){
    this.pkdx_id = id
    this.types = []
    this.evolutions = []
    this.name = name
    this.pokemon = new Pokemon(`https://pokeapi.co/api/v2/pokemon/${id}`, name)
    this.getPictureUrl()

    for (let evolution of evolutions) {
      if(evolution.method == "level_up") {
        if (this.evolutions.find(fx => fx.resource_uri == evolution.resource_uri) == null) {
          this.evolutions.push(new Evolution(evolution.level, evolution.method, evolution.resource_uri, evolution.to))
        }
      }
    }
  }

  getPictureUrl(): void {
    let pokemonId =  `${this.pkdx_id}`
    if (pokemonId.length === 1) {
      pokemonId = `00${pokemonId}`
    } else if (pokemonId.length === 2) {
      pokemonId = `0${pokemonId}`
    } else {
      pokemonId = pokemonId
    }
    this.picture = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${pokemonId}.png`
  }
}

class Evolution {
  id:string
  level?:number
  method?:string
  methodName?:string
  resource_uri?:string
  to?:string
  picture?:string
  pokemon?: Pokemon

  constructor(level:number, method:string, resource_uri:string, to:string) {
    this.level = level
    this.method = method
    this.methodName = this.method.replace("_"," ").toUpperCase()
    this.resource_uri = resource_uri
    this.getPictureUrl()
    this.to = to
    this.pokemon = new Pokemon(`https://pokeapi.co/api/v2/pokemon/${this.id}`, to)
  }

  getPictureUrl(): void {
    let pokemonId =  this.resource_uri.split('/')[4]
    this.id = pokemonId

    if (pokemonId.length === 1) {
      pokemonId = `00${pokemonId}`
    } else if (pokemonId.length === 2) {
      pokemonId = `0${pokemonId}`
    } else {
      pokemonId = pokemonId
    }
    this.picture = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${pokemonId}.png`
  }
}

class Ability {
  resource_uri?:string
  name?:string
}

class Type {
  url?:string
  resource_uri?:string
}
