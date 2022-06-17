const express = require('express');
const rutas = require('./routes/index');
const path = require('path');

const app = express()

app.set("json spaces", 2)
app.set('views', path.join(__dirname, './views') )
app.set('view engine', 'pug')

app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use('/html', express.static('html'))

app.use("/api/productos", rutas)

const server = app.listen(8080, () => {
    console.log(`Servidor prendido en el puerto ${server.address().port}`)
})
server.on('error', err => console.log(`Error en el server ${err}`))

app.use('/api', rutas)

app.get('/productoRandom', async (req, res) => {
    let data = await file.getAll();
    let random = Math.random() * data.length;
    let numbRandom = Math.floor(random);

    res.send(`<h1 >Producto: ${data[numbRandom].title}</h1><br>
        <h1>Precio: $${data[numbRandom].price}</h1><br>
        <img src="${data[numbRandom].thumbnail}" alt="Producto" style="max-width:200px; max-height:200px" /><br><a href='http://localhost:8080'><button style="margin: 10px 5px 0 0" type="submit">Inicio</button></a><button onClick="window.location.reload()">Número Random</button>
    `);
})
