const ativar = document.querySelector("#ativar");
const modal = document.querySelector("#modal");

ativar.addEventListener("click", () => {
  modal.classList.toggle("animar");
});
