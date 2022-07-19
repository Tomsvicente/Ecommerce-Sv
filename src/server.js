const app = require("./app");
const productos = require("./products.json");
const Contenedor = require("./models/Container");
const data = new Contenedor();
// starting server

const expressServer = app.listen(app.get("port"));
console.log(
  `Servidor HTTP conectado, escuchando en el puerto ${app.get("port")}`
);

// websockets

const { Server: IOServer } = require("socket.io");
const io = new IOServer(expressServer);

io.on("connection", (socket) => {
  console.log(`User ${socket.id} connected`);

  // chat message event

  socket.on("chat:message", (data) => {
    io.sockets.emit("chat:message", data);
    // messagesArray.push(messageInfo);
    // io.emit("server:mensajes", messagesArray);
  });

  // chat typing event

  socket.on("chat:typing", (data) => {
    socket.broadcast.emit("chat:typing", data);
  });

  // sending products

  socket.on("cliente:producto", async (formData) => {
    await data.save(formData);
    productos = await data.getAll();
  });

  io.sockets.emit("server:productos", productos);
});
