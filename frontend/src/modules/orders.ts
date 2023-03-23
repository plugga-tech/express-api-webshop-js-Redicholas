import { IOrder } from '../models/IOrder';
import { ICartProduct } from '../models/ICartProduct';
import { getOrders } from './products';
import { getUsers } from './products';

const allUsers = await getUsers();

const app = document.getElementById('app') as HTMLDivElement;

export function renderOrderCard() {
    const orderCard = `
        <div class="order-card">
            <h2>My Orders</h2>
            <div id="order-list" class="order-list"></div>
        </div>
    `;    

    if (app) app.innerHTML = orderCard;
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
        products.push(order.products.forEach((product: ICartProduct) => {
            console.log(product.productId);
            
            return product;
        }));
        
            const orderItem = `
                <div class="order-item">User: ${order.user}, Products ordered: ${products}</div>
            `;
            orderList.innerHTML += orderItem;
        }}
    );
}