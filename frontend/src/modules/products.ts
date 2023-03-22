import { IProduct } from '../models/IProduct';

const app = document.getElementById('app') as HTMLDivElement;

export function getProducts(): Promise<IProduct[]> {
    return fetch('http://localhost:3000/api/products')
        .then(response => response.json())
        .then(data => {
            return data;
        });
}

export function renderProductCard() {
    const productCard = `
        <div class="product-card">
            <h2>Our Products</h2>
            <div id="product-list" class="product-list"></div>
        </div>
    `;

    if (app) app.innerHTML = productCard;
    renderProductList();
}

function renderProductList() {
    const productList = document.getElementById('product-list') as HTMLDivElement;

    getProducts().then(products => {
        products.forEach((product) => {
            const productItem = `
                <div class="product-item">${product.name}, ${product.description}, ${product.price}, 
                    <button class="buyBtn" id="add-${product._id}">+</button>
                    <button class="removeBtn" id="remove-${product._id}">-</button>
                </div>
            `;
            productList.innerHTML += productItem;
        });
        const buyBtns = document.querySelectorAll('.buyBtn') as NodeListOf<HTMLButtonElement>;
        const removeBtns = document.querySelectorAll('.removeBtn') as NodeListOf<HTMLButtonElement>;
        
        handleBuyRemoveBtnClick(buyBtns, removeBtns)
    });
}

function handleBuyRemoveBtnClick(
    buyBtns: NodeListOf<HTMLButtonElement>,
    removeBtns: NodeListOf<HTMLButtonElement>) {
    buyBtns.forEach(btn => {
        btn.addEventListener('click', (event: MouseEvent) => {
            const target = event.target as HTMLButtonElement;
            console.log(target.id);
        });
    });
    
    removeBtns.forEach(btn => {
        btn.addEventListener('click', (event: MouseEvent) => {
            const target = event.target as HTMLButtonElement;
            console.log(target.id);
        });
    });
}