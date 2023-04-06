function mostrarPokemon(id) {
  modal.style.display = "flex";

  pokeApi.getPokemon(id).then((pokemon) => {
    pokeContainer.innerHTML = `
      <div class="poke-info ${pokemon.tipo} poke-${pokemon.id}">
                <div class="poke-opcoes">
                  <span class="material-icons-outlined voltar"
                    >keyboard_backspace</span
                  >
                  <img src="imgs/pokeball-icon.png" alt="pokeball icon" class="fav"/>

                </div>
                <div class="poke">
                  <div class="poke-main">
                    <h3 class="poke-nome">${pokemon.nome}</h3>
                    <div class="poke-tipos">
                      ${pokemon.tipos}
                    </div>
                  </div>
                  <span class="num">#${pokemon.num}</span>
                </div>
                <div class="poke-img">
                  <img src="${pokemon.img}" alt="${pokemon.nome}" />
                </div>
              </div>
              <div class="poke-detalhes">
                <ul class="poke-menu">
                  <li class="sobre ativo">About</li>
                  <li class="estatisticas">Stats</li>
                  <li class="movimentos">Moves</li>
                </ul>
                <article id="sobre">
                  <p class="poke-desc">${pokemon.desc}</p>
                  <div class="lista lista-sobre">
                    <ul class="left-sobre">
                      <li>Height</li>
                      <li>Weight</li>
                      <li>Abilities</li>
                      <li>Egg Groups</li>
                      <li>Habitat</li>
                      <li>Shape</li>
                    </ul>
                    <ul class="right-sobre">
                      <li class="altura">${pokemon.altura}</li>
                      <li class="peso">${pokemon.peso}</li>
                      <li class="habilidades">${pokemon.habilidades}</li>
                      <li class="eggGroup">${pokemon.eggGroups}</li>
                      <li class="habitat">${pokemon.habitat}</li>
                      <li class="shape">${pokemon.formato}</li>
                    </ul>
                  </div>
                </article>
                <article id="estatisticas">
                  <ul class="lista lista-estat">
                    <div class="li">
                      <li>HP</li>
                      <li><span class="xp 0">${pokemon.stats[0]}</span><span class="barra 0"></span></li>
                    </div>
                    <div class="li">
                      <li>Attack</li>
                      <li><span class="xp 1">${pokemon.stats[1]}</span><span class="barra 1"></span></li>
                    </div>
                    <div class="li">
                      <li>Defense</li>
                      <li><span class="xp 2">${pokemon.stats[2]}</span><span class="barra 2"></span></li>
                    </div>
                    <div class="li">
                      <li>Special Att.</li>
                      <li><span class="xp 3">${pokemon.stats[3]}</span><span class="barra 3"></span></li>
                    </div>
                    <div class="li">
                      <li>Special Def.</li>
                      <li><span class="xp 4">${pokemon.stats[4]}</span><span class="barra 4"></span></li>
                    </div>
                    <div class="li">
                      <li>Speed</li>
                      <li><span class="xp 5">${pokemon.stats[5]}</span><span class="barra 5"></span></li>
                    </div>
                  </ul>
                </article>
      
                <article id="movimentos">
                  <ul>${pokemon.moves}</ul>
                </article>
              </div>
      `;

    let article = document.querySelectorAll(".poke-detalhes article"),
      menuLi = document.querySelectorAll(".poke-menu li"),
      pokeXp = document.querySelectorAll(".xp"),
      barra = document.querySelectorAll(".barra"),
      btnVoltar = document.querySelector(".voltar"),
      favIcon = document.querySelectorAll(".fav");

    menuLi.forEach((li) => {
      li.addEventListener("click", () => {
        document.querySelector(".poke-menu li.ativo").classList.remove("ativo");
        li.classList.add("ativo");
        article.forEach((a) => {
          li.classList.contains(a.getAttribute("id"))
            ? (a.style.display = "block")
            : (a.style.display = "none");
        });
      });
    });

    for (let i = 0; i < 6; i++) {
      pokeXp.forEach((xp) => {
        if (xp.classList.contains(`${i}`)) {
          xp.innerText = `${pokemon.stats[i]}`;
          barra[i].style.width = `${xp.innerText / 1.6}px`;
          xp.innerText < 60
            ? (barra[i].style.backgroundColor = "#fe5353")
            : (barra[i].style.backgroundColor = "#70ed76");
        }
      });
    }

    btnVoltar.addEventListener("click", () => {
      modal.style.display = "none";
    });

    favIcon.forEach((fav) => {
      fav.addEventListener("click", () => {
        fav.classList.toggle("favorito");
        for (let i = 1; i < 151; i++) {
          if (fav.offsetParent.classList.contains(`poke-${i}`)) {
            pokemons.children[i - 1].classList.toggle("favorito");
          }
        }
      });
    });
  });
}
