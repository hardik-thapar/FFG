const menuItems = [
    { id: 1, name: 'Espresso', description: 'Rich and bold', price: 150, category: 'coffee', image: 'images/esspresso.png' },
    { id: 2, name: 'Cappuccino', description: 'Creamy and frothy', price: 180, category: 'coffee', image: 'images/cappucino.jpg' },
    { id: 3, name: 'Latte', description: 'Smooth and milky', price: 170, category: 'coffee', image: 'images/latte.png' },
    { id: 4, name: 'Americano', description: 'Bold and smooth', price: 160, category: 'coffee', image: 'images/americano.png' },
    { id: 5, name: 'Green Tea', description: 'Light and refreshing', price: 140, category: 'tea', image: 'images/green-tea.jpg' },
    { id: 6, name: 'Earl Grey', description: 'Aromatic and citrusy', price: 140, category: 'tea', image: 'images/earl-grey.jpg' },
    { id: 7, name: 'Chai Latte', description: 'Spicy and comforting', price: 150, category: 'tea', image: 'images/chai-latte.jpg' },
    { id: 8, name: 'Chocolate Shake', description: 'Rich and indulgent', price: 180, category: 'shakes', image: 'images/choco-shake.jpg' },
    { id: 9, name: 'Vanilla Shake', description: 'Creamy and classic', price: 170, category: 'shakes', image: 'images/vanilla-shake.jpg' },
    { id: 10, name: 'Strawberry Shake', description: 'Fresh and fruity', price: 180, category: 'shakes', image: 'images/strawberry-shake.png' },
    { id: 11, name: 'Carrot Cake', description: 'Moist and delicious', price: 200, category: 'cakes', image: 'images/carrot-cake.jpg' },
    { id: 12, name: 'Chocolate Brownie', description: 'Rich and fudgy', price: 180, category: 'cakes', image: 'images/chocolate-cake.png' },
    { id: 13, name: 'Cheesecake', description: 'Creamy and tangy', price: 220, category: 'cakes', image: 'images/cheescake.jpg' },
    { id: 14, name: 'Quiche', description: 'Savory and satisfying', price: 200, category: 'savory', image: 'images/blueberry-muffin.png' },
    { id: 15, name: 'Avocado Toast', description: 'Fresh and healthy', price: 220, category: 'savory', image: 'images/avacado.jpg' },
    { id: 16, name: 'Chicken Sandwich', description: 'Hearty and delicious', price: 240, category: 'savory', image: 'images/sand.jpg' },
    { id: 17, name: 'Candy Cane Latte', description: 'Festive peppermint latte topped with whipped cream and crushed candy cane', price: 190, category: 'christmas', image: 'images/cc1.jpg' },
    { id: 18, name: 'Gingerbread Latte', description: 'Warm spiced latte with gingerbread syrup and whipped cream', price: 190, category: 'christmas', image: 'images/cc2.jpg' },
    { id: 19, name: 'Maple Pecan Macchiato', description: 'Rich espresso with maple syrup and toasted pecan flavor', price: 200, category: 'christmas', image: 'images/cc3.jpg' },
    { id: 20, name: 'Christmas Pudding', description: 'Traditional festive pudding with dried fruits, nuts and brandy sauce', price: 220, category: 'christmas', image: 'images/cc4.jpg' }
];

function renderMenuItems(category = 'all') {
    const menuItemsContainer = document.getElementById('menu-items');
    if (!menuItemsContainer) return;

    menuItemsContainer.innerHTML = '';

    const filteredItems = category === 'all' ? menuItems : menuItems.filter(item => item.category === category);

    filteredItems.forEach(item => {
        const menuItem = document.createElement('div');
        menuItem.classList.add('menu-item');
        menuItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="menu-item-content">
                <h3>${item.name}</h3>
                <p>${item.description}</p>
                <p class="price">₹${item.price.toFixed(2)}</p>
                <button class="add-to-cart-btn" data-item='${JSON.stringify(item)}'>Add to Cart</button>
            </div>
        `;
        menuItemsContainer.appendChild(menuItem);
    });

    // ADD TO CART BUTTON
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const item = JSON.parse(this.getAttribute('data-item'));
            window.addToCart(item);
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    renderMenuItems();

    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            renderMenuItems(button.dataset.filter);
        });
    });
});
