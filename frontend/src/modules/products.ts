import { IProduct } from '../models/IProduct';
import { IOrder } from '../models/IOrder';
import { ICartProduct } from '../models/ICartProduct';

const app = document.getElementById('app') as HTMLDivElement;
const allUsers = await getUsers();
const allProducts = await getProducts();
let allCartProducts: ICartProduct[] = allProducts.map((product: IProduct) => {
    return { productId: product._id, quantity: 0 };
});


export function getProducts(): Promise<IProduct[]> {
    return fetch('http://localhost:3000/api/products')
        .then(response => response.json())
        .then(data => {
            return data;
        });
}

async function getUsers() {
    return fetch("http://localhost:3000/api/users")
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
            <button id="purchaseBtn">Purchase</button>
        </div>
    `;

    if (app) app.innerHTML = productCard;
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

async function addProductToCart(clickedProduct: string) {
    const purchaseBtn = document.getElementById('purchaseBtn') as HTMLButtonElement;

    allCartProducts.forEach((product: ICartProduct) => {
        if (product.productId === clickedProduct) {
            product.quantity += 1;
    }});
    console.log(allCartProducts);
    
    purchaseBtn.addEventListener('click', () => {
        const products = allCartProducts.filter((product: ICartProduct) => product.quantity > 0);
        makePurchase(products);
    });
}

// TODO: Fix multiple product array when adding multiple products
async function makePurchase(products: ICartProduct[]) {
    const userEmail = localStorage.getItem('email');
    const user: string = allUsers.find((user: { email: string | null; }) => user.email === userEmail)._id;
    console.log(products);
    
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
        console.log(data.message);
    });
}