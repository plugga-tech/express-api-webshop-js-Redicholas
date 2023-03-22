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
        products.forEach(product => {
            const productItem = `
                <div class="product-item">${product.name}, ${product.description}, ${product.price}</div>
            `;
            productList.innerHTML += productItem;
        });
    });
}