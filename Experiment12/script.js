// Load data from localStorage or use default products
let products = JSON.parse(localStorage.getItem('products')) || [
    { id: 1, name: 'Headphones', price: 1499, emoji: '🎧', description: 'Premium sound and comfortable design.' },
    { id: 2, name: 'Smart Watch', price: 2499, emoji: '⌚', description: 'Track your daily activities.' },
    { id: 3, name: 'Laptop', price: 45999, emoji: '💻', description: 'Powerful laptop for work and study.' },
    { id: 4, name: 'Backpack', price: 999, emoji: '🎒', description: 'Stylish backpack for everyday use.' }
];

let cart = JSON.parse(localStorage.getItem('cart')) || [];
let orders = JSON.parse(localStorage.getItem('orders')) || [];

function saveData() {
    localStorage.setItem('products', JSON.stringify(products));
    localStorage.setItem('cart', JSON.stringify(cart));
    localStorage.setItem('orders', JSON.stringify(orders));
}

// Helper for creating safe text elements
function makeElement(tag, className, text) {
    const el = document.createElement(tag);
    if (className) el.className = className;
    if (text !== undefined) el.textContent = text;
    return el;
}

// Navigation
function showSection(id) {
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });

    document.getElementById(id).classList.add('active');

    if (id === 'shop') renderProducts();
    if (id === 'cart') renderCart();
    if (id === 'orders') renderOrders();
    if (id === 'seller') renderSeller();
}

// SHOP
function renderProducts() {
    const list = document.getElementById('productList');
    list.replaceChildren();

    products.forEach(product => {
        const card = makeElement('div', 'card');

        card.appendChild(makeElement('div', 'product-emoji', product.emoji));
        card.appendChild(makeElement('h3', '', product.name));
        card.appendChild(makeElement('p', 'price', '₹' + product.price));
        card.appendChild(makeElement('p', '', product.description));

        const btn = makeElement('button', 'add-btn', 'Add to Cart');
        btn.addEventListener('click', () => addToCart(product.id));

        card.appendChild(btn);
        list.appendChild(card);
    });
}

// ADD TO CART
function addToCart(id) {
    const product = products.find(p => p.id === id);
    if (!product) return;

    const item = cart.find(p => p.id === id);

    if (item) {
        item.quantity++;
    } else {
        cart.push({ id: product.id, quantity: 1 });
    }

    saveData();
    updateCartCount();
    alert('Product added to cart!');
}

// CART
function updateCartCount() {
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById('cartCount').textContent = count;
}

function renderCart() {
    const list = document.getElementById('cartItems');
    list.replaceChildren();

    let totalAmount = 0;

    if (cart.length === 0) {
        list.appendChild(makeElement('p', 'empty', 'Your cart is empty.'));
    }

    cart.forEach(item => {
        const product = products.find(p => p.id === item.id);

        if (!product) return;

        totalAmount += product.price * item.quantity;

        const row = makeElement('div', 'cart-row');

        const info = makeElement(
            'div',
            '',
            product.emoji + ' ' + product.name + ' | ₹' + product.price
        );

        const qty = document.createElement('input');
        qty.type = 'number';
        qty.min = '1';
        qty.value = item.quantity;
        qty.className = 'qty';
        qty.setAttribute('aria-label', 'Quantity for ' + product.name);

        qty.addEventListener('change', () => {
            const newQty = Number(qty.value);

            if (!Number.isInteger(newQty) || newQty < 1) {
                qty.value = item.quantity;
                return;
            }

            item.quantity = newQty;
            saveData();
            renderCart();
            updateCartCount();
        });

        const remove = makeElement('button', 'remove-btn', 'Remove');
        remove.addEventListener('click', () => {
            cart = cart.filter(c => c.id !== item.id);
            saveData();
            renderCart();
            updateCartCount();
        });

        row.append(info, qty, remove);
        list.appendChild(row);
    });

    document.getElementById('total').textContent =
        'Total Amount: ₹' + totalAmount;

    document.getElementById('checkoutBtn').disabled = cart.length === 0;
}

// CHECKOUT - simulated payment
function checkout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }

    const amount = cart.reduce((sum, item) => {
        const product = products.find(p => p.id === item.id);
        return sum + (product ? product.price * item.quantity : 0);
    }, 0);

    const confirmed = confirm(
        'Demo Payment\\nTotal: ₹' + amount +
        '\\n\\nClick OK to simulate successful payment.'
    );

    if (!confirmed) return;

    const purchasedItems = cart.map(item => {
        const product = products.find(p => p.id === item.id);

        return {
            name: product.name,
            price: product.price,
            emoji: product.emoji,
            quantity: item.quantity
        };
    });

    orders.unshift({
        id: Date.now(),
        items: purchasedItems,
        total: amount,
        date: new Date().toLocaleString(),
        status: 'Successful'
    });

    cart = [];

    saveData();
    updateCartCount();
    renderCart();

    alert('Payment successful! Your order has been placed.');
    showSection('orders');
}

// ORDERS
function renderOrders() {
    const list = document.getElementById('orderList');
    list.replaceChildren();

    if (orders.length === 0) {
        list.appendChild(makeElement('p', 'empty', 'No orders placed yet.'));
        return;
    }

    orders.forEach(order => {
        const card = makeElement('div', 'order-card');

        card.appendChild(makeElement('h3', '', 'Order #' + order.id));
        card.appendChild(makeElement('p', '', 'Date: ' + order.date));
        card.appendChild(makeElement('p', '', 'Status: ' + order.status));

        order.items.forEach(item => {
            card.appendChild(makeElement(
                'p',
                '',
                item.emoji + ' ' + item.name +
                ' × ' + item.quantity +
                ' = ₹' + (item.price * item.quantity)
            ));
        });

        card.appendChild(makeElement('h3', 'price', 'Total: ₹' + order.total));

        list.appendChild(card);
    });
}

// SELLER PANEL
function renderSeller() {
    const list = document.getElementById('sellerList');
    list.replaceChildren();

    products.forEach(product => {
        const row = makeElement('div', 'seller-row');

        const info = makeElement(
            'div',
            '',
            product.emoji + ' ' + product.name + ' - ₹' + product.price
        );

        const edit = makeElement('button', 'edit-btn', 'Edit');
        edit.addEventListener('click', () => editProduct(product.id));

        const remove = makeElement('button', 'remove-btn', 'Delete');
        remove.addEventListener('click', () => deleteProduct(product.id));

        row.append(info, edit, remove);
        list.appendChild(row);
    });
}

// ADD OR UPDATE PRODUCT
document.getElementById('sellerForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const id = document.getElementById('editId').value;
    const name = document.getElementById('productName').value.trim();
    const price = Number(document.getElementById('productPrice').value);
    const emoji = document.getElementById('productEmoji').value.trim();
    const description = document.getElementById('productDescription').value.trim();

    if (!name || !emoji || !description || price <= 0 || !Number.isFinite(price)) {
        alert('Please enter valid product details.');
        return;
    }

    if (id) {
        const product = products.find(p => p.id === Number(id));

        if (product) {
            product.name = name;
            product.price = price;
            product.emoji = emoji;
            product.description = description;
        }
    } else {
        products.push({
            id: products.length ? Math.max(...products.map(p => p.id)) + 1 : 1,
            name,
            price,
            emoji,
            description
        });
    }

    saveData();
    this.reset();

    document.getElementById('editId').value = '';
    document.getElementById('formTitle').textContent = 'Add Product';
    document.getElementById('saveBtn').textContent = 'Add Product';

    renderSeller();
    renderProducts();

    alert('Product saved successfully!');
});

// EDIT PRODUCT
function editProduct(id) {
    const product = products.find(p => p.id === id);
    if (!product) return;

    document.getElementById('editId').value = product.id;
    document.getElementById('productName').value = product.name;
    document.getElementById('productPrice').value = product.price;
    document.getElementById('productEmoji').value = product.emoji;
    document.getElementById('productDescription').value = product.description;

    document.getElementById('formTitle').textContent = 'Edit Product';
    document.getElementById('saveBtn').textContent = 'Update Product';

    document.getElementById('sellerForm').scrollIntoView({
        behavior: 'smooth'
    });
}

// DELETE PRODUCT
function deleteProduct(id) {
    if (!confirm('Are you sure you want to delete this product?')) return;

    products = products.filter(p => p.id !== id);
    cart = cart.filter(item => item.id !== id);

    saveData();
    updateCartCount();
    renderSeller();
    renderProducts();
    renderCart();
}

// INITIAL LOAD
saveData();
renderProducts();
renderCart();
renderOrders();
renderSeller();
updateCartCount();