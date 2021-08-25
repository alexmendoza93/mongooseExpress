const express = require('express');
// integrar express al archivo
const app = express();
// ejecutar express
const path = require('path');
// habilitar path
// -----------------------------------
// requerimos nuestro modelo
const Product =require('./models/product');

// --------------------------------------
// importamos mongoose
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/farmStand', {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log('conexion abierta')
    })
    .catch(err => {
        console.log('error')
        console.log(err)
    })
// ------------------------------------------

app.set('views', path.join(__dirname, 'views'));
// esto es para correr el archide desde cualquier lugar
app.set('view engine', 'ejs');
// esto es para hacer ejs nuestro motor

// -----------------------------------------
// esto espera a una respuesta del servidor en este caso mongod
// app.get('/products',async (req, res) => {
//     const products = await Product.find({})
//     console.log(products)
//     res.send('Los productos se estan cargando, esto puede tardar un poco')
// })
// -------------------------------------------
// ahora respondemos con un template de ejs
app.get('/products',async (req, res) => {
    const products = await Product.find({})
    console.log(products)
    res.render('products/index')
})
// ----------------------------------------------
// app.get('/dog', (req, res) => {
//     res.send('woof')
// })
// esto imprime woof en: localhost:3000/dog, corriendo nodemon index.js



app.listen(3000, () => {
    console.log('estamos conectados')
})

// todo esto se necesita para iniciar un servidor