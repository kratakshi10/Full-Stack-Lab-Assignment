const express = require('express');
const app = express();

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));

// Route 1: Home
app.get('/', (req, res) => {
    res.render('index', { title: 'Home' });
});

// Route 2: About
app.get('/about', (req, res) => {
    res.send('<h1>About Us</h1><p>Welcome to our Express application.</p><a href="/">Home</a>');
});

// Route 3: Services
app.get('/services', (req, res) => {
    res.send('<h1>Our Services</h1><p>Web Development, Design and Programming.</p><a href="/">Home</a>');
});

// Route 4: Contact Form
app.get('/contact', (req, res) => {
    res.render('contact');
});

// Route 5: POST Request
app.post('/contact', (req, res) => {
    const name = req.body.name;
    const message = req.body.message;

    res.send(`<h1>Thank You, ${name}!</h1>
              <p>Your message: ${message}</p>
              <a href="/">Go Home</a>`);
});

// Start server
app.listen(3000, () => {
    console.log('Server running at http://localhost:3000');
});