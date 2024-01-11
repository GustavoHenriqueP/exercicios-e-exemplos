import SonnerToast from "./sonner-toast.js";
import SonnerToaster from "./sonner-toaster.js";

const btnShowToast = document.getElementById("btn-show-toast");
// const btnCloseToast = document.querySelector(".sonner-toast .sonner-close");
// const btnTest = document.getElementById("btn-test");
// const sonnerToast = document.querySelector(".sonner-toast");

// const showToast = () => sonnerToast.classList.add("active");
// const closeToast = () => {
//   sonnerToast.classList.remove("active");
//   sonnerToast.attributes.removeNamedItem("data-position");
// };
// const testAnimation = () => sonnerToast.setAttribute("data-position", "2");

// btnCloseToast.addEventListener("click", closeToast);
// btnTest.addEventListener("click", testAnimation);

const toastController = new SonnerToaster();

function addToast() {
  const toast = new SonnerToast(
    "Teste",
    "um texto aí",
    toastController.removeItem,
    8
  );
  console.log(toast);

  toastController.add(toast);
}
btnShowToast.addEventListener("click", addToast);
