export class Pokemon {
  url?:string
  name?:string
  id:string
  picture:string

  constructor(url: string, name: string) {
    this.url = url
    this.name = name.charAt(0).toUpperCase() + name.slice(1)
    this.getPictureUrl()
  }

  getPictureUrl(): void {
    let pokemonId =  this.url.split('/')[6]
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
