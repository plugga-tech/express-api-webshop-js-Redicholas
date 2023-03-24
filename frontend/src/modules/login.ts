import { renderProductCard } from '../modules/products';
import { renderRegisterCard } from '../modules/register';

const app = document.getElementById('app') as HTMLDivElement;

function fetchLogin(user: { email: string; password: string; }) {
    localStorage.removeItem('email');
    fetch("http://localhost:3000/api/users/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify( user )
    })
    .then(response => response.json())
    .then(data => {
        if (data.message === "User not found") alert("User not found")
        if (data.message === "Wrong password") alert("Wrong password")
        if (user) {
            renderProductCard();
            localStorage.setItem('email', user.email);
        }
    });
}

function getUser() {
    const emailInput = document.getElementById('emailInput') as HTMLInputElement;
    const passwordInput = document.getElementById('passwordInput') as HTMLInputElement;

    const user = {
        email: emailInput.value,
        password: passwordInput.value
    }
    
    fetchLogin(user);
}

export function renderLoginCard() {

    const loginCard = `
        <div class="login-card">
            <h2>Please log in</h2>
            <input id="emailInput" type="text" placeholder="Email" />
            <input id="passwordInput" type="password" placeholder="Password" />
            <button id="submitBtn">Log in</button>
            <a id="registerBtn" class="register-btn">Register</a>
        </div>
    `;

    if (app) app.innerHTML = loginCard;

    const submitBtn = document.getElementById('submitBtn') as HTMLButtonElement;
    const registerBtn = document.getElementById('registerBtn') as HTMLAnchorElement;

    submitBtn?.addEventListener('click', getUser);
    registerBtn?.addEventListener('click', renderRegisterCard);
}

