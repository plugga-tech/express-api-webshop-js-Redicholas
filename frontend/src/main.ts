import { renderLoginCard } from "./modules/login";
import { renderProductCard } from "./modules/products";

const loginBtn = document.getElementById('loginBtn') as HTMLButtonElement;

loginBtn.addEventListener('click', () => {
    renderLoginCard();
});

renderProductCard();

