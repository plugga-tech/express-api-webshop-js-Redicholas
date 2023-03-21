const app = document.getElementById('app') as HTMLDivElement;
import { IProduct } from '../models/IProduct';

export function getProducts(): Promise<IProduct[]> {
    return fetch('http://localhost:3000/api/products')
        .then(response => response.json())
        .then(data => {
            console.log(data)
            return data;
        });
}

export function renderProductCard() {
    const productCard = `
        <div class="product-card">
            <h2>Our Products</h2>
            <ul id="product-list"></ul>
        </div>
    `;

    if (app) app.innerHTML = productCard;
    renderProductList();
}

function renderProductList() {
    const productList = document.getElementById('product-list') as HTMLUListElement;

    getProducts().then(products => {
        products.forEach(product => {
            const productItem = `
                <li>${product.name}</li>
            `;
            productList.innerHTML += productItem;
        });
    });
}