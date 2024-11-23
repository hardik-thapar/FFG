const giftItems = [
    { id: 101, name: 'House Blend Coffee Beans', description: 'Our signature blend', price: 450, category: 'coffee-beans', image: 'images/1.jpg' },
    { id: 102, name: 'Single Origin Ethiopian', description: 'Fruity and complex', price: 500, category: 'coffee-beans', image: 'images/2.jpg' },
    { id: 103, name: 'Decaf Colombian', description: 'Smooth and balanced', price: 480, category: 'coffee-beans', image: 'images/3.jpg' },
    { id: 104, name: 'Cafe Harvest Mug', description: 'Ceramic mug with our logo', price: 350, category: 'merchandise', image: 'images/4.jpg' },
    { id: 105, name: 'Cafe Harvest T-Shirt', description: 'Comfortable cotton tee', price: 600, category: 'merchandise', image: 'images/5.jpg' },
    { id: 106, name: 'Reusable Coffee Cup', description: 'Eco-friendly to-go cup', price: 400, category: 'merchandise', image: 'images/6.jpg' },
    { id: 107, name: '₹500 Gift Card', description: 'Perfect for coffee lovers', price: 500, category: 'gift-vouchers', image: 'images/1000.png' },
    { id: 108, name: '₹1000 Gift Card', description: 'Treat someone special', price: 1000, category: 'gift-vouchers', image: 'images/2000.jpeg' },
    { id: 109, name: '₹2000 Gift Card', description: 'For the ultimate coffee enthusiast', price: 2000, category: 'gift-vouchers', image: 'images/5000.jpeg' }
];

function renderGiftItems(category = 'all') {
    const giftItemsContainer = document.getElementById('gifts-items');
    if (!giftItemsContainer) return;

    giftItemsContainer.innerHTML = '';

    const filteredItems = category === 'all' ? giftItems : giftItems.filter(item => item.category === category);

    filteredItems.forEach(item => {
        const giftItem = document.createElement('div');
        giftItem.classList.add('gift-item');
        giftItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="gift-item-content">
                <h3>${item.name}</h3>
                <p>${item.description}</p>
                <p class="price">₹${item.price.toFixed(2)}</p>
                <button class="add-to-cart-btn" data-item='${JSON.stringify(item)}'>Add to Cart</button>
            </div>
        `;
        giftItemsContainer.appendChild(giftItem);
    });

    // Add event listeners to all "Add to Cart" buttons
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const item = JSON.parse(this.getAttribute('data-item'));
            window.addToCart(item);
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    renderGiftItems();

    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            renderGiftItems(button.dataset.filter);
        });
    });
});
