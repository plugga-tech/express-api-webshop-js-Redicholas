import { IProduct } from '../models/IProduct';
import { IOrder } from '../models/IOrder';
import { ICartProduct } from '../models/ICartProduct';
import { addProductToCart } from './cart';

const app = document.getElementById('app') as HTMLDivElement;
const allUsers = await getUsers();
export const allProducts = await getProducts();

export function getProducts(): Promise<IProduct[]> {
    return fetch('http://localhost:3000/api/products')
        .then(response => response.json())
        .then(data => {
            return data;
        });
}

export async function getUsers() {
    return fetch("http://localhost:3000/api/users")
        .then(response => response.json())
        .then(data => {
            return data;
        });
}

async function getOrders() {
    return fetch("http://localhost:3000/api/orders/all/1234key1234")
        .then(response => response.json())
        .then(data => {
            return data;
        });
}

export function renderProductCard() {
    const productCard = `
        <div class="product-card">
            <h2>Our Products</h2>
            <select id="category-selector"></select>
            <div id="product-list" class="product-list"></div>
            <h3>Cart</h3>
            <div id="cart" class="cart">Empty</div>
            <button id="purchaseBtn">Purchase</button>
            <button id="showOrdersBtn">Show Orders</button>
        </div>
    `;

    if (app) app.innerHTML = productCard;

    const showOrdersBtn = document.getElementById('showOrdersBtn') as HTMLButtonElement;
    showOrdersBtn.addEventListener('click', () => {
        renderOrderCard();
    });

    renderProductList();
    renderCategorySelector();
}

function renderProductList() {
    const productList = document.getElementById('product-list') as HTMLDivElement;

    getProducts().then(products => {
        products.forEach((product) => {
            const productItem = `
                <div class="product-item">${product.name}, ${product.description}, ${product.price}, 
                    <button class="buyBtn" id="${product._id}">+</button>
                    <button class="removeBtn" id="${product._id}">-</button>
                </div>
            `;
            productList.innerHTML += productItem;
        });
        const buyBtns = document.querySelectorAll('.buyBtn') as NodeListOf<HTMLButtonElement>;
        const removeBtns = document.querySelectorAll('.removeBtn') as NodeListOf<HTMLButtonElement>;
        
        handleBuyRemoveBtnClick(buyBtns, removeBtns)
    });
}

function renderCategorySelector() {
    const categorySelector = document.getElementById('category-selector') as HTMLSelectElement;
    let categoryList: string[] = [];

    allProducts.forEach(product => {
        if ( !categoryList.includes(product.category) ) {
            categoryList.push(product.category);
        }
    });

    categorySelector.append(new Option('All', 'All'));
    categoryList.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        const capitalizedCat = category[0].toUpperCase() + category.slice(1);
        option.textContent = capitalizedCat;
        categorySelector.append(option);
    });
    categorySelector.addEventListener('change', () => {
        sortByCategory();
    }
    );
}

function sortByCategory() {
    const categorySelector = document.getElementById('category-selector') as HTMLSelectElement;
    const selectedCategory = categorySelector.value;
    const productList = document.getElementById('product-list') as HTMLDivElement;
    productList.innerHTML = '';

    if (selectedCategory === 'All') renderProductList();
    allProducts.forEach(product => {
        if (product.category === selectedCategory) {
            const productItem = `
                <div class="product-item">${product.name}, ${product.description}, ${product.price}, 
                    <button class="buyBtn" id="${product._id}">+</button>
                    <button class="removeBtn" id="${product._id}">-</button>
                </div>
            `;
            productList.innerHTML += productItem;
        }
    });
    const buyBtns = document.querySelectorAll('.buyBtn') as NodeListOf<HTMLButtonElement>;
    const removeBtns = document.querySelectorAll('.removeBtn') as NodeListOf<HTMLButtonElement>;
    
    handleBuyRemoveBtnClick(buyBtns, removeBtns);
}

function handleBuyRemoveBtnClick(
    buyBtns: NodeListOf<HTMLButtonElement>,
    removeBtns: NodeListOf<HTMLButtonElement>) {
    
    buyBtns.forEach(btn => {
        btn.addEventListener('click', (event: MouseEvent) => {
            const target = event.target as HTMLButtonElement;
            addProductToCart(target.id);
        });
    });
    
    removeBtns.forEach(btn => {
        btn.addEventListener('click', (event: MouseEvent) => {
            const target = event.target as HTMLButtonElement;
            // removeProductFromCart(target.id);
        });
    });
}

function renderOrderCard() {
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