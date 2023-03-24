import { renderProductCard } from "./products";
const app = document.getElementById('app') as HTMLDivElement;

export function renderRegisterCard() {
    const registerCard = `
        <div class="login-card">
            <h2>Please register</h2>
            <input id="usernameInput" type="text" placeholder="Username" />
            <input id="emailInput" type="email" placeholder="Email" />
            <input id="passwordInput" type="password" placeholder="Password" />
            <input id="passwordControlInput" type="password" placeholder="Enter again" />
            <button id="registerUserBtn">Register</button>
        </div>
    `;

    if (app) app.innerHTML = registerCard;
    document.getElementById("registerUserBtn")?.addEventListener('click', validatePassword);
}

function validatePassword() {
    const passwordInput = document.getElementById('passwordInput') as HTMLInputElement;
    const passwordControlInput = document.getElementById('passwordControlInput') as HTMLInputElement;
    
    const pwInput = passwordInput.value;
    const pwControlInput = passwordControlInput.value;
    
    if (pwInput === pwControlInput) makeNewUser(pwInput);
    else alert('Passwords do not match');
}

function makeNewUser(password: string) {
    const usernameInput = (document.getElementById('usernameInput') as HTMLInputElement).value;
    const emailInput = (document.getElementById('emailInput') as HTMLInputElement).value;

    const user = {
        "name": usernameInput,
        "email": emailInput,
        "password": password
    }

    registerNewUser(user);
}

function registerNewUser(user: { name: string; email: string; password: string; }) {
    fetch("http://localhost:3000/api/users/add", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
        .then(response => response.json())
        .then(data => {
            handleRegistration(data);
        }
        );
}

function handleRegistration(data: { message: string; }) {
    if (data.message != "Successful registration.") {
        alert("Error creating user");
    }
    else {
        alert("User created");
        renderProductCard();
    }
}

