// script.js

function addToCart(productId, productName, productPrice) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let product = cart.find(item => item.id === productId);

    if (product) {
        product.quantity += 1;
    } else {
        cart.push({ id: productId, name: productName, price: productPrice, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay();
    displayNotification('${productName} adicionado ao carrinho.');
}

function displayNotification(message) {
    let notification = document.getElementById('notification');
    notification.textContent = message;
    notification.style.display = 'block';

    setTimeout(() => {
        notification.style.display = 'none';
    }, 3000); // Oculta a notificação após 3 segundos
}

// Restante do código...

function loadCart() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let cartItems = document.getElementById('cart-items');
    let totalPrice = document.getElementById('total-price');
    cartItems.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        let li = document.createElement('li');
        li.innerHTML = `
            ${item.name} - R$ ${item.price.toFixed(2)} x ${item.quantity} 
            <button onclick="removeFromCart(${item.id})">Remover</button>
        `;
        cartItems.appendChild(li);
        total += item.price * item.quantity;
    });

    totalPrice.textContent = total.toFixed(2);
}

function removeFromCart(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let product = cart.find(item => item.id === productId);

    if (product) {
        product.quantity -= 1;
        if (product.quantity === 0) {
            cart = cart.filter(item => item.id !== productId);
        }
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    loadCart();
    updateCartDisplay();
}

function checkout() {
    if (confirm('Deseja finalizar a compra?')) {
        localStorage.removeItem('cart');
        alert('Compra finalizada com sucesso!');
        loadCart();
        updateCartDisplay();
    }
}

function updateCartDisplay() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let cartCount = document.getElementById('cart-count');
    let totalPrice = document.getElementById('total-price');

    let totalQuantity = 0;
    let total = 0;

    cart.forEach(item => {
        totalQuantity += item.quantity;
        total += item.price * item.quantity;
    });

    cartCount.textContent = totalQuantity;
    if (totalPrice) {
        totalPrice.textContent = total.toFixed(2);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    updateCartDisplay();
    if (document.getElementById('cart-items')) {
        loadCart();
    }
});