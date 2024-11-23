document.getElementById('checkout-btn').addEventListener('click', function() {
    const name = document.getElementById('customer-name').value;
    const table = document.getElementById('table').value;
    const contact = document.getElementById('contact-number').value;

    // Get the exact total from localStorage
    const total = localStorage.getItem('cartTotal');

    const orderDetails = {
        name: name,
        table: table,
        contact: contact,
        totalAmount: total, // Use the stored total
        items: JSON.parse(localStorage.getItem('cart') || '[]')
    };

    // Save to localStorage
    localStorage.setItem('pendingOrder', JSON.stringify(orderDetails));

    // Redirect to payment page
    window.location.href = 'payment.html';
});

// Update the updateTotal function to ensure precise calculation
function updateTotal() {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    
    // Calculate subtotal with proper decimal handling
    const subtotal = cart.reduce((total, item) => {
        const itemPrice = parseFloat(item.price);
        const itemQuantity = parseInt(item.quantity);
        return total + (itemPrice * itemQuantity);
    }, 0);

    // Calculate GST and total with proper decimal handling
    const gst = Math.round((subtotal * 0.05) * 100) / 100;
    const total = Math.round((subtotal + gst) * 100) / 100;

    // Update display with fixed decimal places
    document.getElementById('subtotal').innerText = `₹${subtotal.toFixed(2)}`;
    document.getElementById('gst').innerText = `₹${gst.toFixed(2)}`;
    document.getElementById('total').innerText = `₹${total.toFixed(2)}`;

    // Store the exact total for checkout
    localStorage.setItem('cartTotal', total.toFixed(2));
} 