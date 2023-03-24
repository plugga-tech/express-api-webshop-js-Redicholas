import { IOrder } from '../models/IOrder';
import { renderProductCard, getProducts } from './products';

const allUsers = await getUsers();
const allProducts = await getProducts();

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
    renderOrderList(allUsers, allProducts);
}

// TODO: fix products display
async function renderOrderList(allUsers: any, allProducts: { _id: string; name: string; }[]) {
    const orders = await getOrders();
    const orderList = document.getElementById('order-list') as HTMLDivElement;
    const userEmail = localStorage.getItem('email');
    const user: string = allUsers.find((user: { email: string | null; }) => user.email === userEmail)._id;
    
    orders.forEach((order: IOrder) => {
        if (order.user === user) {
            let usersOrderedProducts: string[] = [];
            let productNames: string[] = [];
            
            order.products.forEach((product: { productId: string; }) => {
                usersOrderedProducts.push(product.productId);
            });            
            
            usersOrderedProducts.forEach((productId: string) => {
                allProducts.forEach((product: { _id: string; name: string; }) => {
                    if (product._id == productId) {                        
                        productNames.push(product.name);
                    }
                });
            });
            
            const orderItem = `
                <div class="order-item">Products ordered: ${productNames}</div>
            `;
            orderList.innerHTML += orderItem;
        }}
    );
}