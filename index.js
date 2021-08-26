const express = require('express');
// integrar express al archivo
const app = express();
// ejecutar express
const path = require('path');
// habilitar path
// -----------------------------------
// requerimos nuestro modelo
const Product = require('./models/product');

// --------------------------------------
// importamos mongoose
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/farmStand', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('conexion abierta')
    })
    .catch(err => {
        console.log('error')
        console.log(err)
    })
// ------------------------------------------
const categories = ['fruit', 'vegetable', 'dairy', 'fungi'];

const methodOverride = require('method-override')

app.use(methodOverride('_method'));

app.set('views', path.join(__dirname, 'views'));
// esto es para correr el archide desde cualquier lugar
app.set('view engine', 'ejs');
// esto es para hacer ejs nuestro motor
app.use(express.urlencoded({ extended: true }))
// con esto le pedimos a expres que nos regrese un resultado del post

// -----------------------------------------
// esto espera a una respuesta del servidor en este caso mongod
// app.get('/products',async (req, res) => {
//     const products = await Product.find({})
//     console.log(products)
//     res.send('Los productos se estan cargando, esto puede tardar un poco')
// })
// -------------------------------------------
// ahora respondemos con un template de ejs
app.get('/products', async (req, res) => {
    const products = await Product.find({})
    console.log(products)
    res.render('products/index', { products })
})
// ----------------------------------------------
// app.get('/dog', (req, res) => {
//     res.send('woof')
// })
// esto imprime woof en: localhost:3000/dog, corriendo nodemon index.js
// -----------------------------------------
// es hora de hacer nuevos productos desde un formulario
app.get('/products/new', (req, res) => {
    res.render('products/new', { categories })
})

app.post('/products', async (req, res) => {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.redirect(`/products/${newProduct._id}`)
    // console.log(newProduct);
    // res.send('procesando los productos')
})

// ----------------------------------------------
// detalles de productos
// app.get('/products/:id', async(req, res) => {
//     const {id} = req.params;
//     const product = await Product.findById(id);
//     console.log(product);
//     res.send('details page')
// })
// y listo mostramos el mensaje de details page simulando mostrar un template de ejs 
//  ahora viene template de ejs
app.get('/products/:id', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id);
    console.log(product);
    res.render('products/show', { product })
})

app.get('/products/:id/edit', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.render('products/edit', { product, categories })
})

app.put('/products/:id', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body, { runValidators: true, new: true });
    res.redirect(`/products/${product._id}`);
    // console.log(req.body);
    // res.send('PUT!!!');
    // este mensaje sirve para probar si funciona
})
// para editar necesitaremos instalar: method-override
// ----------------------------------------------
// es hora de eliminar productos
app.delete('/products/:id', async (req, res) => {
    const { id } = req.params;
    const deleteProduct = await Product.findByIdAndDelete(id);
    res.redirect('/products');
})

app.listen(3000, () => {
    console.log('estamos conectados')
})

// todo esto se necesita para iniciar un servidor

