import { IProduct } from '../models/IProduct';
import { IOrder } from '../models/IOrder';
import { ICartProduct } from '../models/ICartProduct';
import { getProducts, getUsers } from './products';

const allProducts = await getProducts();
const allUsers = await getUsers();

let allCartProducts: ICartProduct[] = allProducts.map((product: IProduct) => {
    return { productId: product._id, quantity: 0 };
});

export function renderCart() {
    const cart = document.getElementById('cart') as HTMLDivElement;
    let cartProducts: ICartProduct[] = allCartProducts.filter((product: ICartProduct) => product.quantity > 0);

    if (cartProducts.length === 0) {
        cartProducts = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart') as string) : [];
    }
    
    cart.innerHTML = '';
    cartProducts.forEach((cartProduct: ICartProduct) => {
        let productName = "";
        allProducts.forEach((product: IProduct) => {
            if (product._id === cartProduct.productId) {
                productName = product.name;
            }
            });
            const productItem = `
            <div class="product-item">${productName}, ${cartProduct.quantity}</div>
            `;
            
            cart.innerHTML += productItem;
    });
}

export async function addProductToCart(clickedProduct: string) {
    const purchaseBtn = document.getElementById('purchaseBtn') as HTMLButtonElement;

    allCartProducts.forEach((product: ICartProduct) => {
        if (product.productId === clickedProduct) {
            product.quantity += 1;
    }});
    console.log(allCartProducts);
    
    const products = allCartProducts.filter((product: ICartProduct) => product.quantity > 0);
    localStorage.setItem('cart', JSON.stringify(products));

    purchaseBtn.addEventListener('click', () => {
        makePurchase(products);
    });
    

    renderCart();
}

export async function removeProductFromCart(clickedProduct: string) {
    allCartProducts.forEach((product: ICartProduct) => {
        if (product.productId === clickedProduct) {
            product.quantity -= 1;
    }});
    const products = allCartProducts.filter((product: ICartProduct) => product.quantity > 0);
    localStorage.setItem('cart', JSON.stringify(products));

    renderCart();
}

// TODO: Fix, multiple product array when adding multiple products
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
