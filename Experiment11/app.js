require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');

const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB Connected Successfully'))
    .catch(err => console.log('MongoDB Error:', err.message));

// Product Schema
const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true }
});

const Product = mongoose.model('Product', productSchema);

// READ - Show all products
app.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        res.render('index', { products });
    } catch (err) {
        res.status(500).send('Error loading products');
    }
});

// CREATE - Add product
app.post('/products', async (req, res) => {
    try {
        await Product.create({
            name: req.body.name,
            price: req.body.price,
            description: req.body.description
        });

        res.redirect('/');
    } catch (err) {
        res.status(400).send('Unable to add product');
    }
});

// EDIT - Show edit form
app.get('/products/:id/edit', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).send('Product not found');
        }

        res.render('edit', { product });
    } catch (err) {
        res.status(400).send('Invalid product ID');
    }
});

// UPDATE - Update product
app.put('/products/:id', async (req, res) => {
    try {
        await Product.findByIdAndUpdate(req.params.id, {
            name: req.body.name,
            price: req.body.price,
            description: req.body.description
        }, { runValidators: true });

        res.redirect('/');
    } catch (err) {
        res.status(400).send('Unable to update product');
    }
});

// DELETE - Delete product
app.delete('/products/:id', async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.redirect('/');
    } catch (err) {
        res.status(400).send('Unable to delete product');
    }
});

// Start server
app.listen(3000, () => {
    console.log('Server running at http://localhost:3000');
});