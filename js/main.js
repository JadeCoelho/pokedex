const moreBtn = document.querySelector("#more");
const limit = 12;
let offset = 0;
const maxRegs = 151;
const pokemons = document.querySelector("#pokemons");
let modal = document.querySelector(".modal");
let pokeContainer = document.querySelector(".poke-container");

function carregarPokemons(offset, limit) {
  pokeApi.getPokemons(offset, limit).then((pokemonList = []) => {
    const novaLista = pokemonList
      .map(
        (pokemon) =>
          `
      <li class="pokemon ${pokemon.tipo}" id="${pokemon.num}" onclick="mostrarPokemon(${pokemon.id})">
      <span class="num">#${pokemon.num}</span>
      <span class="nome">${pokemon.nome}</span>
      <div class="detalhes">
        <ol class="tipos">
          ${pokemon.tipos}
        </ol>
        <img
          src="${pokemon.img}"
          alt="${pokemon.nome}"
        />
      </div>
    </li>
      `
      )
      .join("");

    pokemons.innerHTML += novaLista;
  });
}

carregarPokemons(offset, limit);

moreBtn.addEventListener("click", () => {
  offset += limit;
  const nextPage = offset + limit;
  if (nextPage >= maxRegs) {
    const novoLimite = maxRegs - offset;
    carregarPokemons(offset, novoLimite);
    moreBtn.parentElement.removeChild(moreBtn);
  } else {
    carregarPokemons(offset, limit);
  }
});
