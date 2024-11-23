let cart = [];

function addToCart(item) {
    const existingItem = cart.find(cartItem => cartItem.id === item.id);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ ...item, quantity: 1 });
    }
    updateCartCount();
    saveCart();
    
    // Show popup notification
    showPopup(`${item.name} added to cart!`);
}

function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    if (cartCount) {
        const totalItems = cart.reduce((total, item) => total + (item.quantity || 0), 0);
        cartCount.textContent = totalItems;
    }
}

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function loadCart() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartCount();
    }
}

function renderCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    if (!cartItemsContainer) return;

    cartItemsContainer.innerHTML = '';

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
        return;
    }

    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <div class="cart-item-details">
                <h3>${item.name}</h3>
                <p>Price: ₹${item.price.toFixed(2)}</p>
                <div class="cart-item-quantity">
                    <button class="quantity-btn minus" onclick="updateQuantity(${item.id}, -1)">-</button>
                    <span class="current-quantity">${item.quantity}</span>
                    <button class="quantity-btn plus" onclick="updateQuantity(${item.id}, 1)">+</button>
                </div>
            </div>
            <button class="cart-item-remove" onclick="removeFromCart(${item.id})">Remove</button>
        `;
        cartItemsContainer.appendChild(cartItem);
    });

    updateCartSummary();
}

function updateQuantity(itemId, change) {
    const item = cart.find(cartItem => cartItem.id === itemId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(itemId);
        } else {
            updateCartCount();
            saveCart();
            renderCart();
        }
    }
}

function removeFromCart(itemId) {
    cart = cart.filter(item => item.id !== itemId);
    updateCartCount();
    saveCart();
    renderCart();
}

function calculateSubtotal() {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
}

function updateCartSummary() {
    const subtotal = calculateSubtotal();
    const gst = subtotal * 0.05; // 5% GST
    const total = subtotal + gst;

    const subtotalElement = document.getElementById('subtotal');
    const gstElement = document.getElementById('gst');
    const totalElement = document.getElementById('total');

    if (subtotalElement && gstElement && totalElement) {
        subtotalElement.textContent = `₹${subtotal.toFixed(2)}`;
        gstElement.textContent = `₹${gst.toFixed(2)}`;
        totalElement.textContent = `₹${total.toFixed(2)}`;
    }
}

function clearCart() {
    cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart(); 
    updateCartSummary();
    updateCartCount();
}

function checkout() {
    if (cart.length === 0) {
        alert('Your cart is empty. Add some items before checking out.');
        return;
    }

    // Get values from the form
    const name = document.getElementById('customer-name').value;
    const table = document.getElementById('table').value;
    const contact = document.getElementById('contact-number').value;

    // Validation
    if (!name || !table || !contact) {
        alert('Please fill in all required fields.');
        return;
    }

    if (!/^\d{10}$/.test(contact)) {
        alert('Please enter a valid 10-digit contact number.');
        return;
    }

    // Get the exact total amount displayed on the page
    const totalAmount = document.getElementById('total').textContent.replace('₹', '');

    // Create order details with exact total
    const orderDetails = {
        name: name,
        table: table,
        contact: contact,
        totalAmount: totalAmount, // Using the exact displayed total
        items: cart
    };

    // Log for debugging
    console.log('Order Details:', orderDetails);
    console.log('Total Amount:', totalAmount);

    // Save to localStorage
    localStorage.setItem('pendingOrder', JSON.stringify(orderDetails));

    // Redirect to payment page
    window.location.href = 'payment.html';
}

// Add this new function for popup
function showPopup(message) {
    const popup = document.getElementById('cart-popup');
    const popupMessage = document.getElementById('popup-message');
    
    if (popup && popupMessage) {
        popupMessage.textContent = message;
        popup.classList.add('show');
        
        // Hide popup after 2 seconds
        setTimeout(() => {
            popup.classList.remove('show');
        }, 2000);
    }
}

// Add this function where you process the payment
function processPayment(formData) {
    // Get cart and total amount
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const totalAmount = cart.reduce((total, item) => total + item.price, 0);
    
    // Create payment data object
    const paymentData = {
        name: formData.name || document.getElementById('customerName').value,
        table: formData.table || document.getElementById('tableNumber').value,
        contact: formData.contact || document.getElementById('contactNumber').value,
        amount: totalAmount,
        paymentId: 'PAY' + Math.random().toString(36).substr(2, 9),
        orderItems: cart
    };

    // Redirect to confirmation page with all data
    const redirectUrl = 'order-confirmation.html?' + 
        `name=${encodeURIComponent(paymentData.name)}` +
        `&table=${encodeURIComponent(paymentData.table)}` +
        `&contact=${encodeURIComponent(paymentData.contact)}` +
        `&amount=${encodeURIComponent(paymentData.amount)}` +
        `&orderItems=${encodeURIComponent(JSON.stringify(paymentData.orderItems))}` +
        `&paymentId=${encodeURIComponent(paymentData.paymentId)}`;

    window.location.href = redirectUrl;
}

document.addEventListener('DOMContentLoaded', () => {
    loadCart();
    renderCart();
    updateCartSummary(); 

    const checkoutBtn = document.getElementById('checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', checkout);
    }
});

window.addToCart = addToCart;
window.updateQuantity = updateQuantity;
window.removeFromCart = removeFromCart;
