const express = require('express');
const app = express();

app.use(express.json());
app.use(express.static('public'));

let products = [
    { id: 1, name: 'Laptop', price: 55000, rating: 4.5 },
    { id: 2, name: 'Smartphone', price: 25000, rating: 4.3 },
    { id: 3, name: 'Headphones', price: 1500, rating: 4.1 },
    { id: 4, name: 'Smart Watch', price: 3000, rating: 4.6 }
];

// GET API - Fetch all products
app.get('/api/products', (req, res) => {
    res.json(products);
});

// POST API - Add a new product
app.post('/api/products', (req, res) => {
    const { name, price, rating } = req.body;

    if (!name || price === undefined || rating === undefined ||
        !Number.isFinite(Number(price)) ||
        !Number.isFinite(Number(rating)) ||
        Number(price) <= 0 ||
        Number(rating) < 0 || Number(rating) > 5) {
        return res.status(400).json({ message: 'Invalid product details' });
    }

    const newProduct = {
        id: products.length ? Math.max(...products.map(p => p.id)) + 1 : 1,
        name: name.trim(),
        price: Number(price),
        rating: Number(rating)
    };

    if (!newProduct.name) {
        return res.status(400).json({ message: 'Product name is required' });
    }

    products.push(newProduct);
    res.status(201).json(newProduct);
});

// Start server
app.listen(3000, () => {
    console.log('Server running at http://localhost:3000');
});