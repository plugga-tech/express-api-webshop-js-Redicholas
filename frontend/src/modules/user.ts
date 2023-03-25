import { renderProductCard } from './products';

const app = document.getElementById('app') as HTMLDivElement;

export function renderFindUserCard() {
    const findUserCard = `
        <div class="find-user-card">
            <h2>Find User</h2>
            <input type="text" id="id" placeholder="id">
            <button id="findUserBtn">Find User</button>
            <button id="backBtn">Back</button>
        </div>
    `;
    if (app) app.innerHTML = findUserCard;

    const backBtn = document.getElementById('backBtn') as HTMLButtonElement;
    backBtn.addEventListener('click', () => {
        renderProductCard();
    });
    
    const findUserBtn = document.getElementById('findUserBtn') as HTMLButtonElement;
    findUserBtn.addEventListener('click', () => {
        const id = (document.getElementById('id') as HTMLInputElement).value;
        getUser(id);
    });
}

async function getUser(id: string) {
    fetch(`http://localhost:3000/api/users`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({id})
    })
        .then(response => response.json())
        .then(data => {
            renderUser(data);
        });
}

async function renderUser(user: {name: string, email: string, _id: string}) {
    const userCard = `
        <div class="user-card">
            <h2>User</h2> 
            <h3>${user.name}</h3>
            <h3>${user.email}</h3>
            <h3>${user._id}</h3>
            <button id="backBtn">Back</button>
        </div>
    `;
    if (app) app.innerHTML = userCard;

    const backBtn = document.getElementById('backBtn') as HTMLButtonElement;
    backBtn.addEventListener('click', () => {
        renderProductCard();
    });
}