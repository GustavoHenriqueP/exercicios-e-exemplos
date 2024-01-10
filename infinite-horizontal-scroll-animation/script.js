const scrollers = document.querySelectorAll(".scroller");

// Consulta se o usuário possui a opção de acessibilidade de ter recursos de animação reduzidos em seu sistema operacional
if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  addAnimation();
}

function addAnimation() {
  scrollers.forEach((scroller) => {
    scroller.setAttribute("data-animated", true);

    const scrollerInner = scroller.querySelector(".scroller__inner");
    const scrollContent = Array.from(scrollerInner.children);

    scrollContent.forEach((item) => {
      const duplicatedItem = item.cloneNode(true);

      // aria hidden esconde os itens duplicados para um leitor de tela, para o mesmo então não ler os itens duas vezes seguidas
      duplicatedItem.setAttribute("aria-hidden", true);
      scrollerInner.appendChild(duplicatedItem);
    });
  });
}
