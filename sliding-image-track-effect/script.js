const track = document.getElementById("image-track");

// Uma outra forma de adicionar um event listene de mouse no window
window.onmousedown = (e) => {
  track.dataset.mouseDownAt = e.clientX;
};

window.onmouseup = () => {
  track.dataset.mouseDownAt = "0";
  track.dataset.prevPercentage = track.dataset.percentage;
};

window.onmousemove = (e) => {
  if (track.dataset.mouseDownAt === "0") return;

  const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX;
  const maxDelta = window.innerWidth / 2;

  // Convertendo para porcentagem, para facilitar
  const percentage = (mouseDelta / maxDelta) * -100;
  const nextPercentageUnconstrained =
    parseFloat(track.dataset.prevPercentage) + percentage;
  const nextPercentage = Math.max(
    Math.min(nextPercentageUnconstrained, 0),
    -100
  );

  track.dataset.percentage = nextPercentage;

  track.animate(
    { transform: `translate(${nextPercentage}%, -50%)` },
    { duration: 1200, fill: "forwards" }
  );

  for (image of track.getElementsByTagName("img")) {
    image.animate(
      { objectPosition: `${100 + nextPercentage}% center` },
      { duration: 1200, fill: "forwards" }
    );
  }
};
