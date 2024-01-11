export default class SonnerToaster {
  constructor() {
    this.toasts = [];

    this.removeItem = this.removeItem.bind(this);
  }

  add(toast) {
    let zIndex;
    if (this.toasts.length) {
      if (this.toasts.length === 3) {
        this.toasts[0].close();
        this.toasts.splice(0, 1);
      }

      const zIndexArray = this.toasts.map((item) => {
        item.setPosition(++item.position);
        console.log(item.position);
        return +getComputedStyle(item.element).zIndex;
      });

      let maxZIndex = Math.max(...zIndexArray);
      zIndex = ++maxZIndex;
    }

    toast.init(true, 1);
    toast.element.style.zIndex = zIndex;
    console.log(+getComputedStyle(toast.element).zIndex);
    this.toasts.push(toast);
  }

  removeItem(postion) {
    console.log(this, `Removido posicao ${postion}`);
  }
}
