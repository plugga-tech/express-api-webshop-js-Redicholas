import { IProduct } from '../models/IProduct';
import { IOrder } from '../models/IOrder';
import { ICartProduct } from '../models/ICartProduct';

const app = document.getElementById('app') as HTMLDivElement;
// let products: IProduct[] = [];

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
            <button id="purchaseBtn">Purchase</button>
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

async function getUsers() {
    return fetch("http://localhost:3000/api/users")
        .then(response => response.json())
        .then(data => {
            return data;
        });
}

const products: ICartProduct[] = [];
const allProducts = await getProducts();
let allCartProducts: ICartProduct[] = allProducts.map((product: IProduct) => {
    return { productId: product._id, quantity: 0 };
});

async function addProductToCart(clickedProduct: string) {
    const purchaseBtn = document.getElementById('purchaseBtn') as HTMLButtonElement;

    allCartProducts.forEach((product: ICartProduct) => {
        if (product.productId === clickedProduct) {
            product.quantity += 1;
    }});
    console.log(allCartProducts);
    
    purchaseBtn.addEventListener('click', () => {
        makePurchase(allCartProducts);
    });
}

async function makePurchase(products: ICartProduct[]) {
    const userEmail = localStorage.getItem('email');
    const allUsers = await getUsers();
    const user: string = allUsers.find((user: { email: string | null; }) => user.email === userEmail)._id;

    const order: IOrder = {
        user,
        products
    }

    fetch("http://localhost:3000/api/orders/add", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify( order )
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
    });
}