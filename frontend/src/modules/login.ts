// // import { renderContentCard} from './Content';

// const app = document.getElementById('app') as HTMLDivElement;

// function fetchLogin(user: { username: string; password: string; }) {
//     fetch("http://localhost:3000/users/login", {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify( user )
//     })
//     .then(response => response.json())
//     .then(data => {
//         if (data.message === "Wrong password") alert("Wrong password")
//         if (user) {
//             // renderContentCard(user.username);
//             localStorage.setItem('username', user.username);
//         }
//     });
// }

// function getUser() {
//     const usernameInput = document.getElementById('usernameInput') as HTMLInputElement;
//     const passwordInput = document.getElementById('passwordInput') as HTMLInputElement;

//     const user = {
//         username: usernameInput.value,
//         password: passwordInput.value
//     }
    
//     fetchLogin(user);
// }

// export function renderLoginCard() {
//     const storedUser = localStorage.getItem('username');
//     if (storedUser) {
//         // renderContentCard(storedUser);
//         return;
//     }

//     const loginCard = `
//         <div class="login-card">
//             <h2>Please log in</h2>
//             <input id="usernameInput" type="text" placeholder="Username" />
//             <input id="passwordInput" type="password" placeholder="Password" />
//             <button id="submitBtn">Log in</button>
//         </div>
//     `;

//     if (app) app.innerHTML = loginCard;

//     const submitBtn = document.getElementById('submitBtn') as HTMLButtonElement;

//     submitBtn?.addEventListener('click', getUser);
// }