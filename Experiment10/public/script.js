const productList = document.getElementById('productList');
const productForm = document.getElementById('productForm');
const message = document.getElementById('message');

// Fetch products from API
async function fetchProducts() {
    try {
        const response = await fetch('/api/products');
        const products = await response.json();

        displayProducts(products);
    } catch (error) {
        productList.textContent = 'Unable to fetch products.';
    }
}

// Display products on frontend
function displayProducts(products) {
    productList.replaceChildren();

    if (products.length === 0) {
        const empty = document.createElement('p');
        empty.className = 'empty';
        empty.textContent = 'No products available.';
        productList.appendChild(empty);
        return;
    }

    products.forEach(product => {
        const card = document.createElement('div');
        card.className = 'card';

        const title = document.createElement('h3');
        title.textContent = product.name;

        const price = document.createElement('p');
        price.className = 'price';
        price.textContent = '₹' + product.price;

        const rating = document.createElement('p');
        rating.className = 'rating';
        rating.textContent = '⭐ ' + product.rating + ' / 5';

        const id = document.createElement('p');
        id.textContent = 'Product ID: ' + product.id;

        card.append(title, price, rating, id);
        productList.appendChild(card);
    });
}

// Add new product using POST API
productForm.addEventListener('submit', async function(event) {
    event.preventDefault();

    const product = {
        name: document.getElementById('name').value.trim(),
        price: Number(document.getElementById('price').value),
        rating: Number(document.getElementById('rating').value)
    };

    if (!product.name || product.price <= 0 ||
        product.rating < 0 || product.rating > 5) {
        message.textContent = 'Please enter valid product details.';
        return;
    }

    try {
        const response = await fetch('/api/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(product)
        });

        if (!response.ok) {
            throw new Error('Unable to add product');
        }

        message.textContent = 'Product added successfully!';
        message.style.color = 'green';

        productForm.reset();

        fetchProducts();

    } catch (error) {
        message.textContent = 'Error adding product.';
        message.style.color = 'red';
    }
});

// Load products when page opens
fetchProducts();