const express = require('express');
// integrar express al archivo
const app = express();
// ejecutar express
const path = require('path');
// habilitar path

app.set('views', path.join(__dirname, 'views'));
// esto es para correr el archide desde cualquier lugar
app.set('view egine', 'ejs');
// esto es para hacer ejs nuestro motor



app.get('/dog', (req, res) => {
    res.send('woof')
})
// esto imprime woof en: localhost:3000/dog, corriendo nodemon index.js



app.listen(3000, () => {
    console.log('estamos conectados')
})

// todo esto se necesita para iniciar un servidor