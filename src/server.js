require('dotenv').config()
const app = require('./app');
const {Server: HttpServer} = require('http');
const {Server: IOServer} = require("socket.io");
const path = require('path');
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);
const Contenedor = require('./class/container')
const messageArray = [];

const main = async ()=>{
    await httpServer.listen(app.get('port'))
    console.log(
        `Servidor HTTP conectado, escuchando en el puerto ${app.get('port')}`
        );
    }

    const productosList = new Contenedor()
    
io.on('connection', async socket => {

    let productos = await productosList.getAll()

    console.log(`Usuario conectado: ${socket.id}`)
    socket.emit('server:mensaje', messageArray)
    socket.on('cliente:mensaje', messageInfo => {
        messageArray.push(messageInfo)
        io.emit('server:mensaje', messageArray)
    })

    io.emit('server:productos', productos);

    socket.on('cliente:producto', async productInfo => {
        await productosList.save(productInfo)
        productos = await productosList.getAll()

        io.emit('server:productos', productos)
    })
})




main()