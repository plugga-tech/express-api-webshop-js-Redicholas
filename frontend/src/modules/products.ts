import { IProduct } from '../models/IProduct';
import { addProductToCart, removeProductFromCart, renderCart } from './cart';
import { renderOrderCard } from './orders';
import { renderFindUserCard } from './user';

const app = document.getElementById('app') as HTMLDivElement;
export const allProducts = await getProducts();

export function getProducts(): Promise<IProduct[]> {
    return fetch('http://localhost:3000/api/products')
        .then(response => response.json())
        .then(data => {
            return data;
        });
}

function getLoggedinUser() {
    const userEmail = localStorage.getItem('email');
    if (userEmail) {
        return 'Logged in as: ' + userEmail;
    }
    return 'Not logged in';
}

export function renderProductCard() {
    const productCard = `
        <div class="product-card">
            <h2>Our Products</h2>
            <h3>${getLoggedinUser()}</h3>
            <select id="category-selector"></select>
            <button id="addProductBtn">Add Product</button>
            <button id="findUserBtn">Find User</button>
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

    const addProductBtn = document.getElementById('addProductBtn') as HTMLButtonElement;
    addProductBtn.addEventListener('click', () => {
        renderAddProductCard();
    });

    const findUserBtn = document.getElementById('findUserBtn') as HTMLButtonElement;
    findUserBtn.addEventListener('click', () => {
        renderFindUserCard();
    });

    renderProductList();
    renderCategorySelector();
    renderCart();
}

function renderAddProductCard() {
    const addProductCard = `
        <div class="add-product-card">
            <h2>Add Product</h2>
            <h3>Admins only</h3>
            <input type="text" id="name" placeholder="Name">
            <input type="text" id="description" placeholder="Description">
            <input type="number" id="price" placeholder="Price">
            <input type="number" id="lager" placeholder="Lager">
            <input type="text" id="category" placeholder="Category">
            <input type="test" id="token" placeholder="Token">
            <div>
                <button id="addProductBtn">Add Product</button>
                <button id="backBtn">Back</button>
            </div>
        </div>
    `;
    if (app) app.innerHTML = addProductCard;

    const backBtn = document.getElementById('backBtn') as HTMLButtonElement;
    backBtn.addEventListener('click', () => {
        renderProductCard();
    });
    
    const addProductBtn = document.getElementById('addProductBtn') as HTMLButtonElement;
    addProductBtn.addEventListener('click', () => {
        getInputProduct();
    });
}

function getInputProduct() {
    const name = document.getElementById('name') as HTMLInputElement;
    const description = document.getElementById('description') as HTMLInputElement;
    const price = document.getElementById('price') as HTMLInputElement;
    const lager = document.getElementById('lager') as HTMLInputElement;
    const categoryInput = document.getElementById('category') as HTMLInputElement;
    const tokenInput = document.getElementById('token') as HTMLInputElement;

    const product: IProduct = {
        _id: '',
        name: name.value,
        description: description.value,
        price: (price.value as unknown as number),
        lager: (lager.value as unknown as number),
        category: categoryInput.value,
        image: './img/placeholder.svg',
        token: tokenInput.value
    };

    addProduct(product);
}

async function addProduct(product: IProduct) {
    const response = await fetch('http://localhost:3000/api/products/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(product)
    });
    const data = await response.json();
    console.log(data);
    renderProductCard();
}


function renderProductList() {
    const productList = document.getElementById('product-list') as HTMLDivElement;
    const productImage = "src/img/placeholder.svg"

    getProducts().then(products => {
        products.forEach((product) => {
            const productItem = `
                <div class="product-item">
                    <img src="${productImage}" alt="${product.name}">
                    ${product.name}, ${product.description}, ${product.price}, 
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
                <div class="product-item">${product.name}, ${product.description}, ${product.price}
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
            removeProductFromCart(target.id);
        });
    });
}
