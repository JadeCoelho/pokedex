const pokeApi = {};

function converterModelo(pokeDetail) {
  const pokemon = new Pokemon();
  pokemon.num = pokeDetail.id;
  pokemon.nome = pokeDetail.name;
  const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name);
  //   const { type1 } = types;
  pokemon.tipos = types;
  pokemon.tipo = types[0];
  pokemon.img = pokeDetail.sprites.other.dream_world.front_default;
  const abilities = pokeDetail.abilities.map((ability) => ability.name);
  pokemon.habilidades = abilities.join(",");
  pokemon.peso = `${pokeDetail.height / 10} kg`;
  pokemon.altura = `${pokeDetail.height * 10} cm`;
  pokemon.hp = pokeDetail.stats[0].stat.base_stat;
  pokemon.ataque = pokeDetail.stats[1].stat.base_stat;
  pokemon.defesa = pokeDetail.stats[2].stat.base_stat;
  pokemon.ataque_esp = pokeDetail.stats[3].stat.base_stat;
  pokemon.defesa_esp = pokeDetail.stats[4].stat.base_stat;
  pokemon.velocidade = pokeDetail.stats[5].stat.base_stat;

  return pokemon;
}

pokeApi.getPokemonDetails = (pokemon) => {
  return fetch(pokemon.url)
    .then((response) => response.json())
    .then(converterModelo);
};
//função para consumo do http e retorno da lista de pokemons
pokeApi.getPokemons = (offset, limit) => {
  const url = `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`;
  return fetch(url)
    .then((response) => response.json())
    .then((jsonBody) => jsonBody.results)
    .then((pokemons) => pokemons.map(pokeApi.getPokemonDetails))
    .then((detailRequests) => Promise.all(detailRequests))
    .then((pokemonDetails) => pokemonDetails);
};

pokeApi.getPokemon  = (id) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  return fetch(url)
  .then((response) => response.json())
  .then((jsonBody) => console.log(jsonBody))
  
}

