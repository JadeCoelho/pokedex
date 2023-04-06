// fetch(url)
//   //   .then(function (response) {
//   //     // console.log(response);
//   //     response.json().then(function(jsonBody){
//   //         console.log(jsonBody);
//   //     })
//   //   })
//   //   .then((response) => {
//   //     return response.json();
//   //   })
//   //   .then((jsonBody) => {
//   //     console.log(jsonBody);
//   //   })
//   .then((response) => response.json())
//   .then((jsonBody) => console.log(jsonBody))
//   //   .catch(function (erro) {
//   //     console.error(erro);
//   //   })
//   //   .finally(function () {
//   //     console.log("requisição concluída");
//   //   });
//   .catch((erro) => console.error(erro))
// //   .finally(() => console.log("requisição concluída"));

const moreBtn = document.querySelector("#more");
const limit = 12;
let offset = 0;
const maxRegs = 151;

function converterTipos(pokeTipos) {
  return pokeTipos.map((pokeTipo) => `<li class="tipo">${tipo}</li>`);
}

const pokemons = document.querySelector("#pokemons");

// pokeApi.getPokemons().then((pokemonList) => {
//   const pokemonLista = [];
//   for (let i = 0; i < pokemonList.length; i++) {
//     let pokemon = converterPokemon(pokemonList[i]);
//     pokemonLista.push(pokemon);
//   }
//   pokemonLista.forEach((pokemon) => {
//     pokemons.innerHTML += pokemon;
//   });
// });

// pokeApi.getPokemons().then((pokemonList = []) => {
//   const novaListaPokes = pokemonList.map((poke) => {
//     return converterPokemon(poke);
//   });
//   const pokes = novaListaPokes.join("");
//   pokemons.innerHTML += pokes;
// });

// pokeApi.getPokemons().then((pokemonList = []) => {
//   const novaListaPokes = pokemonList.map((poke) => converterPokemon(poke));
//   const pokes = novaListaPokes.join("");
//   pokemons.innerHTML += pokes;
// });
// pokeApi
//   .getPokemons()
//   .then(
//     (pokemonList = []) =>
//       (pokemons.innerHTML = pokemonList.map(converterPokemon).join(""))
//   );
function carregarPokemons(offset, limit) {
  pokeApi.getPokemons(offset, limit).then((pokemonList = []) => {
    const novaLista = pokemonList
      .map(
        (pokemon) => `
    <li class="pokemon ${pokemon.tipo}" id="${pokemon.num}">
    <span class="num">#${pokemon.num}</span>
    <span class="nome">${pokemon.nome}</span>
    <div class="detalhes">
      <ol class="tipos">
        ${pokemon.tipos
          .map((tipo) => `<li class="tipo ${tipo}">${tipo}</li>`)
          .join("")}
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

    for (let i = 0; i < maxRegs; i++) {
  let pokeLi = document.querySelectorAll("#pokemons .pokemon");
  let modal = document.querySelector(".modal");
  let pokeContainer = document.querySelector(".poke-container");

  pokemonList.map((pokemon) => {
    pokeLi[i].addEventListener("click", () => {
      modal.style.display = "flex";
      if (pokeLi[i].id == pokemon.num) {
        pokeContainer.innerHTML = `
      <div class="poke-info ${pokemon.tipo}">
        <div class="poke-opcoes">
          <span class="material-icons-outlined voltar" onclick="fecharModal()"
            >keyboard_backspace</span
          >
          <span class="material-icons-outlined fav" onclick="favoritar()"> favorite </span>
        </div>
        <div class="poke">
          <div class="poke-main">
            <h3 class="poke-nome">${pokemon.nome}</h3>
            <div class="poke-tipos">                ${pokemon.tipos
              .map(
                (tipo) => `<span class="poke-tipo ${tipo}">${tipo}</span>`
              )
              .join("\n")}</div>
          </div>
          <span class="num">#${pokemon.num}</span>
        </div>
        <div class="poke-img">
          <img
            src="${pokemon.img}"
            alt=""
          />
        </div>
      </div>
      <div class="poke-detalhes">
        <ul class="poke-menu">
          <li class="sobre ativo">Sobre</li>
          <li class="estatisticas">Estatísticas</li>
          <li class="evolucao">Evolução</li>
          <li class="movimentos">Movimentos</li>
        </ul>
        <article id="sobre">
          <p class="poke-desc">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Maxime,
            voluptate!
          </p>
          <div class="lista lista-sobre">
            <ul class="left-sobre">
              <li>Espécie</li>
              <li>Altura</li>
              <li>Peso</li>
              <li>Habilidades</li>
              <li>Egg Group</li>
              <li>Egg Cycle</li>
            </ul>
            <ul class="right-sobre">
              <li>Seed</li>
              <li>${pokemon.altura}</li>
              <li>${pokemon.peso}</li>
              <li>Overgrow, Clorscxc</li>
              <li>Monster</li>
              <li>Grass</li>
            </ul>
          </div>
        </article>
        <article id="estatisticas">
          <ul class="lista lista-estat">
              <div class="li"><li>HP</li><li><span class="xp 0">${
                pokemon.hp
              }</span><span class="barra 0"></span></li></div>
              <div class="li"><li>Ataque</li><li><span class="xp 1">${
                pokemon.ataque
              }</span><span class="barra 1"></span></li></div>
              <div class="li"><li>Defesa</li><li><span class="xp 2">${
                pokemon.defesa
              }</span><span class="barra 2"></span></li></div>
              <div class="li"><li>Ataque Esp.</li><li><span class="xp 3">${
                pokemon.ataque_esp
              }</span><span class="barra 3"></span></li></div>
              <div class="li"><li>Defesa Esp.</li><li><span class="xp 4">${
                pokemon.defesa
              }</span><span class="barra 4"></span></li></div>
              <div class="li"><li>Velocidade</li><li><span class="xp 5">${
                pokemon.velocidade
              }</span><span class="barra 5"></span></li></div>


          </ul>
        </article>
        <article id="evolucao">
          <div class="pokes">
            <div class="poke">
              <div class="poke-img">
                <img
                  src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/2.svg"
                  alt=""
                />
              </div>
              <span class="poke-nome">Ivysaur</span>
              <span class="poke-nivel">Nível mínimo: 16</span>
            </div>
            <div class="poke">
              <div class="poke-img">
                <img
                  src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/3.svg"
                  alt=""
                />
              </div>

              <span class="poke-nome">Venusaur</span>
              <span class="poke-nivel">Nível mínimo: 32</span>
            </div>
          </div>
        </article>
        <article id="movimentos">
          <ul>
          </ul>
        </article>
      </div>
      `;
      }

    });
  });
}
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


