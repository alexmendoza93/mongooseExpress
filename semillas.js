// en este archivo correremos productos por default
const mongoose = require('mongoose');
// requerimos mongoose
const Product =require('./models/product');
// requerimos el modelo

mongoose.connect('mongodb://localhost:27017/farmStand', {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log('conexion abierta')
    })
    .catch(err => {
        console.log('error')
        console.log(err)
    })
// nos conectamos con mongoose

// const p = new Product({
//     name: 'Grapefruit',
//     price: 1.89,
//     category: 'fruit'
// })
// // esto hace un nuevo producto
// p.save().then(p => {
//     console.log(p)
// })
// .catch(e => {
//     console.log(e)
// })
const seedProducts = [
    {
        name: 'zanahoria',
        price: 10,
        category: 'vegetable'
    },
    {
        name: 'melon',
        price: 13,
        category: 'fruit'
    },
    {
        name: 'sandia',
        price: 9,
        category: 'fruit'
    },
    {
        name: 'cebolla',
        price: 14,
        category: 'vegetable'
    }
    
]

Product.insertMany(seedProducts)
// cuando son varios productos no hace falta guardarlo, eso se hace en automatico, entonces:
    .then(res => {
        console.log(res)
    })
    .catch(e => {
        console.log(e)
    })