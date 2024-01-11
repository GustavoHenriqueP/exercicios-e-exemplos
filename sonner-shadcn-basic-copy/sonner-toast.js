import debounce from "./debounce.js";

export default class SonnerToast {
  title;
  text;
  closeCallback;
  timeToClose;
  animationDuration;
  animationCurve;
  element;
  position = 1;
  timer;
  isHovered;

  constructor(
    title,
    text,
    closeCallback,
    timeToClose,
    animationDuration,
    animationCurve
  ) {
    this.title = title;
    this.text = text;
    this.closeCallback = closeCallback;
    this.timeToClose = timeToClose === undefined ? 10 : timeToClose;
    this.animationDuration =
      animationDuration === undefined ? 0.3 : animationDuration;
    this.animationCurve =
      animationCurve === undefined ? "ease-out" : animationCurve;

    this.active = this.active.bind(this);
    this.close = this.close.bind(this);
    this.handleMouseOver = debounce(this.handleMouseOver.bind(this), 200);
    this.handleMouseLeave = debounce(this.handleMouseLeave.bind(this), 200);
  }

  active() {
    setTimeout(() => this.element.classList.add("active"), 0);
  }

  close() {
    if (this.element) {
      const currentToast = this.element;
      currentToast.classList.remove("active");

      const currentAnimationDuration = this.animationDuration;
      setTimeout(() => {
        this.closeCallback(this.position);
        currentToast.remove();
      }, currentAnimationDuration * 1000);
    }
  }

  setPosition(position) {
    this.position = position;
    this.element.dataset.position = this.position;
  }

  createElement() {
    this.element = document.createElement("div");
    this.element.classList.add("sonner-toast");

    this.element.innerHTML = `<button class="sonner-close">X</button>
    <h3>${this.title}</h3>
    <p>${this.text}</p>`;
  }

  setAnimationDuration() {
    this.element.style.transition = `${this.animationDuration}s ${this.animationCurve}`;
    this.element.style.transitionProperty = "visibility, opacity, transform";
  }

  appendToBody = () => document.body.appendChild(this.element);

  handleMouseOver() {
    this.isHovered = true;
    console.log("Hovered");

    const currentTimer = this.timer;
    if (currentTimer) clearTimeout(currentTimer);
  }

  handleMouseLeave() {
    console.log("Mouse leave");
    this.isHovered = false;
    this.initTimerToClose();
  }

  addEvents() {
    this.element.addEventListener("mouseover", this.handleMouseOver);
    this.element.addEventListener("mouseleave", this.handleMouseLeave);

    const closeButton = this.element.querySelector(".sonner-close");
    closeButton.addEventListener("click", this.close);
  }

  initTimerToClose() {
    if (!this.isHovered) {
      const time = this.timeToClose;
      this.timer = setTimeout(() => this.close(), time * 1000);
    }
  }

  init(setActiveElement, position) {
    this.createElement();
    this.setAnimationDuration();
    this.appendToBody();
    this.addEvents();
    this.initTimerToClose();

    if (setActiveElement) {
      this.active();
    }

    if (position) {
      this.setPosition(position);
    }

    return this;
  }
}
