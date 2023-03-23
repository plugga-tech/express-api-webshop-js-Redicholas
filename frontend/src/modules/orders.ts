import { IOrder } from '../models/IOrder';
import { renderProductCard } from './products';

const allUsers = await getUsers();

const app = document.getElementById('app') as HTMLDivElement;

export async function getUsers() {
    return fetch("http://localhost:3000/api/users")
        .then(response => response.json())
        .then(data => {
            return data;
        });
}

export async function getOrders() {
    return fetch("http://localhost:3000/api/orders/all/1234key1234")
        .then(response => response.json())
        .then(data => {
            return data;
        });
}

export function renderOrderCard() {
    const orderCard = `
        <div class="order-card">
            <h2>My Orders</h2>
            <div id="order-list" class="order-list"></div>
            <button id="backBtn">Back</button>
        </div>
    `;    

    if (app) app.innerHTML = orderCard;
    document.getElementById('backBtn')?.addEventListener('click', () => {
        renderProductCard();
    });
    renderOrderList();
}

// TODO: fix products display
async function renderOrderList() {
    const orders = await getOrders();
    const orderList = document.getElementById('order-list') as HTMLDivElement;
    const userEmail = localStorage.getItem('email');
    const user: string = allUsers.find((user: { email: string | null; }) => user.email === userEmail)._id;
    
    orders.forEach((order: IOrder) => {
        if (order.user === user) {
            const products = [];
            
            for (let i = 0; i < order.products.length; i++) {
                products.push(order.products[i].productId);
            }
        
            const orderItem = `
                <div class="order-item">Products ordered: ${products}</div>
            `;
            orderList.innerHTML += orderItem;
        }}
    );
}