const express = require('express');
const methodOverride = require('method-override');

const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

let products = [
    { id: 1, name: 'Laptop', price: 55000, description: 'Powerful laptop for work and study.' },
    { id: 2, name: 'Headphones', price: 1500, description: 'Comfortable headphones with clear sound.' },
    { id: 3, name: 'Smart Watch', price: 2500, description: 'Smart watch with modern features.' }
];

let nextId = 4;

// READ - Show all products
app.get('/', (req, res) => {
    res.render('index', { products });
});

// CREATE - Add a new product
app.post('/products', (req, res) => {
    const { name, price, description } = req.body;

    products.push({
        id: nextId++,
        name,
        price,
        description
    });

    res.redirect('/');
});

// EDIT - Show edit form
app.get('/products/:id/edit', (req, res) => {
    const product = products.find(p => p.id === parseInt(req.params.id));

    if (!product) {
        return res.status(404).send('Product not found');
    }

    res.render('edit', { product });
});

// UPDATE - Update product
app.put('/products/:id', (req, res) => {
    const product = products.find(p => p.id === parseInt(req.params.id));

    if (!product) {
        return res.status(404).send('Product not found');
    }

    product.name = req.body.name;
    product.price = req.body.price;
    product.description = req.body.description;

    res.redirect('/');
});

// DELETE - Remove product
app.delete('/products/:id', (req, res) => {
    products = products.filter(p => p.id !== parseInt(req.params.id));
    res.redirect('/');
});

// Start server
app.listen(3000, () => {
    console.log('Server running at http://localhost:3000');
});