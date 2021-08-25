// aqui hacemos un modelo que sera requerido por nuestro index.js

const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
         required: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    category: {
        type: String,
        lowercase: true,
        enum: ['fruit', 'vegetable', 'dairy']
    }
    
})

const Product = mongoose.model('Product', productSchema);
// esto compila nuestro modelo

module.exports = Product;
// con esto podemos exportar nuestro modelo