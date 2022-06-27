class Contenedor {
    constructor() {
        this.products = require("../Archivos/productos.json");
    }

    save = (object) => {
        // recibe un objeto, le asigna un ID y lo guarda en el archivo

        if (object.title && object.price && object.thumbnail) {
            try {
                object.id = this.products.length + 1;
                this.products.push(object);
                return object;
            } catch (err) {
                console.log(`Error en save: ${err}`);
            }
        }
    };

    update = (object, clientId) => {
        // actualiza un objecto según el ID

        let data = this.products.findIndex(({
            id
        }) => id == clientId);
        if (data != -1) {
            try {
                object.id = clientId;
                this.products[data] = object;

                return object;
            } catch (error) {
                console.log(`Error en update: ${err}`);
            }
        }
    };

    getById = (clientId) => {
        // obtiene el producto con el ID proporcionado por el cliente

        let data = this.products.find(({
            id
        }) => id == clientId);
        if (data) {
            try {
                return data;
            } catch (error) {
                console.log(`Error en getById: ${error}`);
            }
        }
    };

    getAll = () => {
        // devuelve un array con los objetos presentes en el archivo

        try {
            return this.products;
        } catch (error) {
            console.log(`Error en getAll: ${error}`);
        }
    };

    deleteById = (clientId) => {
        // elimina del archivo el objeto con el ID buscado
        try {
            let data = this.products.filter(({
                id
            }) => id != clientId);
            return data;
        } catch (err) {
            console.log(`Error en deleteById: ${err}`);
        }

    };
}

module.exports = Contenedor;

// const container = new Contenedor();

// console.log(container.deleteById(8));