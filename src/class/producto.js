class Producto {
    constructor(title, description, thumbnail, price, stock, code) {
        this.title = title;
        this.timestamp = new Date(Date.now());
        this.description = description;
        this.code = code;
        this.stock = stock;
        this.price = price;
        this.thumbnail = thumbnail;
        this.id = 0;
    }
}

module.exports = {
    Producto: Producto,
};