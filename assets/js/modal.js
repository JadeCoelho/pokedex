let pokeMenu = document.querySelector(".poke-menu");
let menuLi = document.querySelectorAll(".poke-menu li");
let article = document.querySelectorAll(".poke-detalhes article");

console.log(article);
function ativaTela(article) {

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
}
ativaTela(article);

let xp = document.querySelectorAll(".xp");
let barra = document.querySelectorAll(".barra");

function comparaClasse() {
  for (let i = 0; i < 6; i++) {
    if (
      xp[i].classList.contains(`${i}`) &&
      barra[i].classList.contains(`${i}`)
    ) {
      barra[i].style.width = `${xp[i].innerText}px`;
      xp[i].innerText < 50
        ? (barra[i].style.backgroundColor = "#fe5353")
        : (barra[i].style.backgroundColor = "#70ed76");
    }
  }
}
comparaClasse();

