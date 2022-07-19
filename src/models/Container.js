const fs = require("fs");

class Contenedor {
  constructor(file) {
    this.file = file;
  }

  async save(object) {
    // Recibe un objeto, lo guarda en el archivo, devuelve el id asignado.
    try {
      let products = JSON.parse(await fs.promises.readFile(this.file, "utf-8"));

      // Archivo existente
      !products.length
        ? (object.id = 1)
        : (object.id = products[products.length - 1].id + 1);
      products.push(object);

      await fs.promises.writeFile(
        this.file,
        JSON.stringify(products, null, "\t")
      );
      return object.id;
    } catch (err) {
      // Si el archivo no existe, lo crea
      if (err.code === "ENOENT") {
        object.id = 1;
        await fs.promises.writeFile(
          this.file,
          JSON.stringify([object], null, "\t")
        );
        return object.id;
      } else {
        console.log("Error en método save: ", err);
      }
    }
  }

  async getById(number) {
    // Recibe un id y devuelve el objeto con ese id, o null si no está.
    try {
      let products = JSON.parse(await fs.promises.readFile(this.file, "utf-8"));
      const object = products.find(({id}) => id === number);
      console.log(object, "object45")
      return object ? object : null;
    } catch (err) {
      console.log("Error en método getById: ", err);
    }
  }

  async getAll() {
    // Devuelve un array con los objetos presentes en el archivo.
    try {
        return JSON.parse(await fs.promises.readFile(this.file, "utf-8"));
    } catch (err) {
      if (err.code === "ENOENT") {
        return {};
      } else {
        console.log("Error en método getAll: ", err);
      }
    }
  }

  async deleteById(number) {
    // Elimina del archivo el objeto con el id buscado.
    try {
      let products = JSON.parse(await fs.promises.readFile(this.file, "utf-8"));
      let productsAct = products.filter((object) => object.id != number);
      await fs.promises.writeFile(
        this.file,
        JSON.stringify(productsAct, null, "\t")
      );
    } catch (err) {
      console.log("Error en método deleteById: ", err);
    }
  }

  async deleteAll() {
    // Elimina todos los objetos presentes en el archivo.
    try {
      await fs.promises.writeFile(this.file, JSON.stringify([], null, "\t"));
    } catch (err) {
      console.log("Error en método deleteAll: ", err);
    }
  }

  async updateById(id, object) {
    // Actualiza un objeto según su id. DEvuelve el objeto, o no encontrado
    try {
      let products = JSON.parse(await fs.promises.readFile(this.file, "utf-8"));
      object.id = id;

      const index = products.findIndex((product) => {
        return product.id === object.id;
      });

      if (index !== -1) {
        products[index] = object;
        await fs.promises.writeFile(
          this.file,
          JSON.stringify(products, null, "\t")
        );
        return object;
      } else {
        return { error: "Producto no encontrado" };
      }
    } catch (err) {
      console.log("Error en método updateById: ", err);
    }
  }
}

module.exports = Contenedor;

// const fs = require("fs");

// class Contenedor {
//   constructor(products) {
//     this.products = products;
//   }

//   save = (object) => {
//     // recibe un objeto, le asigna un ID y lo guarda en el archivo
// object.timestamp = Date.now()
//     if (object.title && object.price && object.thumbnail) {
//       try {
//         object.id = this.products.length + 1;
//         this.products.push(object);
//         const json_products = JSON.stringify(this.products, null, " ");
//         fs.writeFileSync("src/products.json", json_products, "utf-8");
//         return object;
//       } catch (err) {
//         console.log(`Error en save: ${err}`);
//       }
//     }
//   };

//   update = (object, clientId) => {
//     // actualiza un objecto según el ID

//     let updatedData = this.products.findIndex(({ id }) => id == clientId);

//     if (updatedData == -1) {
//       return null;
//     }
//     try {
//       object.id = +clientId;
//       this.products[updatedData] = object;
//       const json_products = JSON.stringify(this.products, null, " ");
//       console.log(json_products);
//       fs.writeFileSync("src/products.json", json_products, "utf-8");
//       return object;
//     } catch (error) {
//       console.log(`Error en update: ${err}`);
//     }
//   };

//   getById = (clientId) => {
//     // obtiene el producto con el ID proporcionado por el cliente

//     let data = this.products.find(({ id }) => id == clientId);
//     if (data) {
//       try {
//         return data;
//       } catch (error) {
//         console.log(`Error en getById: ${error}`);
//       }
//     }
//   };

//   getAll = () => {
//     // devuelve un array con los objetos presentes en el archivo

//     try {
//       return this.products;
//     } catch (error) {
//       console.log(`Error en getAll: ${error}`);
//     }
//   };

//   deleteById = (clientId) => {
//     // elimina del archivo el objeto con el ID buscado
//     try {
//       let data = this.products.findIndex(({ id }) => id == clientId);
//       this.products.splice(data, 1);
//       let json_products = JSON.stringify(this.products, null, " ");
//       fs.writeFileSync("src/products.json", json_products, "utf-8");
//       return this.products;
//     } catch (err) {
//       console.log(`Error en deleteById: ${err}`);
//     }
//   };
// }

// module.exports = Contenedor;

// const container = new Contenedor("./src/products.json");

// console.log(container.getById(2), "prueba");
