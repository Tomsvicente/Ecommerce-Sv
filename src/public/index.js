// Socket
const socket = io();

// Formularios
// Formulario productos
const productForm = document.querySelector('#productForm');
const nameInput = document.querySelector('#nameInput');
const priceInput = document.querySelector('#priceInput');
const urlInput = document.querySelector('#urlInput');

// Formulario mensajes
const formMessage = document.querySelector('#formMessage');
const usernameInput = document.querySelector('#usernameInput');
const messageInput = document.querySelector('#messageInput');
const messagePool = document.querySelector('#messagePool');

// Formulario carrito
const prodCarrito = document.querySelector('#prodCarrito');
const titleProd = document.querySelector('#titleProd');
const priceProd = document.querySelector('#priceProd');
const thumbProd = document.querySelector('#thumbProd');
const CartPool = document.querySelector('#cartPool');

// Productos
async function renderProducts(productos) {
    const response = await fetch('./hbs/productList.hbs');
    const plantilla = await response.text();

    document.querySelector('#productPool').innerHTML = "";
    productos.forEach(producto => {
        const template = Handlebars.compile(plantilla);
        const html = template(producto);
        document.querySelector('#productPool').innerHTML += html;
    })
} 

function submitHandlerProduct(event) {
    // Para que no recargue la página al ocurrir el evento
    event.preventDefault();

    const title = nameInput.value;
    const price = priceInput.value;
    const thumbnail = urlInput.value;
    productForm.reset();
    socket.emit('cliente:producto', { title, price, thumbnail });
}

//Carrito
async function renderCart(productoCart) {
    const response = await fetch('./hbs/carritoProducts.hbs');
    const plantilla = await response.text();

    document.querySelector('#CartPool').innerHTML = "";
    productoCart.forEach(producto => {
        const template = Handlebars.compile(plantilla);
        const html = template(producto);
        document.querySelector('#productoCart').innerHTML += html;
    })
} 

function submitHandlerCart(event) {
    // Para que no recargue la página al ocurrir el evento
    event.preventDefault();

    const title = titleProd.value;
    const price = priceProd.value;
    const thumbnail = thumbProd.value;
    console.log("TITULO :" + title + " Price :" + price + " Thumbnail :" + thumbnail);
    productForm.reset();
    socket.emit('cliente:producto', { title, price, thumbnail });
}

// Chat
function submitHandlerMessage(event) {
    // Para que no recargue la página al ocurrir el evento
    event.preventDefault();

    const message = messageInput.value;
    const username = usernameInput.value;
    const timeStamp = new Date();
    const localTs = timeStamp.toLocaleString("fr-FR");
    formMessage.reset();
    socket.emit('cliente:mensaje', { username, localTs, message });
}

function renderMessage(messageArray) {
    const html = messageArray.map(messageInfo => {
        return(`<div class="msgContainer">
        <span class="msgUser" style="color:midnightblue; font-weight: bold">${messageInfo.username}</span>
        [<span class="msgTs" style="color: saddlebrown;">${messageInfo.localTs}</span>] :
        <span class="msgMsg" style="font-style:italic; color:seagreen">${messageInfo.message}</span>
        </div>`)
    }).join(" ");
    messagePool.innerHTML = html;
}

// Eventos
productForm.addEventListener('submit', submitHandlerProduct);
socket.on('server:productos', renderProducts);

formMessage.addEventListener('submit', submitHandlerMessage);
socket.on('server:mensaje', renderMessage);

prodCarrito.addEventListener('submit', submitHandlerCart);
socket.on('server:productoCart', renderCart);
