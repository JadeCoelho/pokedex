const pokeApi = {};

async function converterModelo(pokeDetail) {
  const pokemon = new Pokemon();
  pokemon.id = pokeDetail.id;
  pokemon.num = formatarNum(pokeDetail.id);
  pokemon.nome = pokeDetail.name;
  const types = pokeDetail.types
    .map(
      (typeSlot) =>
        `<li class="tipo ${typeSlot.type.name}">${typeSlot.type.name}</li>`
    )
    .join("");
  const type = pokeDetail.types.map((typeSlot) => typeSlot.type.name)[0];
  pokemon.tipos = types;
  pokemon.tipo = type;
  pokemon.img = pokeDetail.sprites.other.dream_world.front_default;
  const abilities = pokeDetail.abilities.map((n) => n.ability.name);
  pokemon.habilidades = abilities.slice(0, 2).join(", ");
  pokemon.peso = `${pokeDetail.weight / 10} kg`;
  pokemon.altura = `${pokeDetail.height * 10} cm`;
  const hp = pokeDetail.stats[0].base_stat;
  const ataque = pokeDetail.stats[1].base_stat;
  const defesa = pokeDetail.stats[2].base_stat;
  const ataque_esp = pokeDetail.stats[3].base_stat;
  const defesa_esp = pokeDetail.stats[4].base_stat;
  const velocidade = pokeDetail.stats[5].base_stat;
  pokemon.stats = [hp, ataque, defesa, ataque_esp, defesa_esp, velocidade];
  const moves = pokeDetail.moves.map((m) => `<li>${m.move.name}</li>`);
  pokemon.moves = moves.join("");

  await fetch(pokeDetail.species.url)
    .then((res) => res.json())
    .then((r) => {
      const filtrarDesc = r.flavor_text_entries.filter(
        (r) => r.language.name === "en"
      );
      pokemon.desc = filtrarDesc[0].flavor_text.replace(/[\r\n]/gm, " ");
      pokemon.habitat = r.habitat.name;
      let eggNames = r.egg_groups.map((e) => {
        return e.name;
      });
      pokemon.eggGroups = eggNames.join(", ");
      pokemon.habitat = r.habitat.name;
      pokemon.formato = r.shape.name;
    });

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

pokeApi.getPokemon = (id) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  return fetch(url)
    .then((response) => response.json())
    .then((poke) => converterModelo(poke))
    .then((p) => p);
};

const formatarNum = (num) => {
  if (num < 10) {
    num = `00${num}`;
  } else if (num >= 10 && num < 100) {
    num = `0${num}`;
  } else {
    num = num;
  }
  return num;
};
