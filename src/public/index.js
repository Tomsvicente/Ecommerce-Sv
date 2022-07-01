const socket = io()

//Formularios mensajes
const formMessage = document.querySelector('#formMessage')
const userInput = document.querySelector('#userInput')
const messageInput = document.querySelector('#messageInput')
const messagePool = document.querySelector('#messagePool')

//Formularios productos
const formProduct = document.querySelector('#formProduct')
const nameInput = document.querySelector('#nameInput')
const priceInput = document.querySelector('#priceInput')
const urlInput = document.querySelector('#urlInput')

async function addProduct(productos){
    const res = await fetch('../public/hbs/productList.hbs');
    const layout = await res.text();

    document.querySelector('#productPool').innerHTML = "";
    productos.forEach(producto => {
        const template = Handlebars.compile(layout)
        const html = template(producto);
        document.querySelector('#productPool').innerHTML += html;
    })
}

function submitHandlerProduct(event) {
    event.preventDefault()

    const title = nameInput.value
    const price = priceInput.value
    const thumbnail = urlInput.value
    
    socket.emit('cliente:producto', {title, price, thumbnail})
}


formMessage.addEventListener('submit', event => {
    event.preventDefault()

    const message = messageInput.value
    const userName = userInput.value
    const date = new Date();
    const dateNow = date.toLocaleString("fr-FR")

    socket.emit('cliente:mensaje', { userName, dateNow , message })
})

socket.on('server:mensaje', messageArray => {
    messagePool.innerHTML = ""

    messageArray.forEach(messageInfo => {
        messagePool.innerHTML += `<li>
        <span class="msgUsuario">${messageInfo.userName}</span>
        [<span class="msgFecha">${messageInfo.dateNow}</span>] : 
        <span class="msgEnviado">${messageInfo.message}</span>
        </li>`
    })
    
})

formProduct.addEventListener('submit', submitHandlerProduct);
socket.on('server:productos', addProduct);