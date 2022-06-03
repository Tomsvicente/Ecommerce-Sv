const fs = require('fs');

// class Usuario {
//     constructor(nombre, apellido,libros,mascotas){
//         this.nombre = nombre
//         this.apellido = apellido
//         this.libros = libros
//         this.mascotas = mascotas
//     }



//         getFullName() {
//             console.log(`Hola ! Soy ${this.nombre} ${this.apellido}`)
//         }

//         addMascota(nombre){
//             this.mascotas.push(nombre);
//         }

//         countMascota(){
//             console.log(`Usted tiene ${this.mascotas.length} mascotas`);
//         }

//         addBook(titulo, escritor){
//             this.libros.push({nombre: titulo, autor: escritor})
//             console.log(`Usted agregó el libro ${titulo} del autor ${escritor}`)
//         }

//         getBookNames() {
//             let nombres = [];
//             this.libros.forEach(libros => nombres.push(libros.nombre));
//             console.log(`El usuario ${this.nombre} ${this.apellido} tiene estos libros disponibles : ${nombres}`)
//         }

// }

// const user = new Usuario("Tom", "Vicente", [{nombre: "Señor de los anillos", autor: "Tolkien"}], ['gato', 'perro']);


// user.getFullName();
// user.addMascota("loro");
// user.countMascota();
// console.log(user)
// user.addBook("Jekyll", "Hyde");
// user.getBookNames();

class Contenedor {
    constructor(nombreArchivo) {
        this.nombreArchivo = nombreArchivo;
        fs.promises.writeFile(nombreArchivo, "[]");
    }

    save = async (objeto) => {
        let datos = await fs.promises.readFile(this.nombreArchivo, "utf-8")
        let arrDatos = JSON.parse(datos);

        try{
            arrDatos = [...arrDatos, objeto];
            objeto.id = arrDatos.length;
            await fs.promises.writeFile(
                this.nombreArchivo,
                JSON.stringify(arrDatos, null, 2)
            );
            return objeto.id;
        } catch (err){
            console.log(`Hubo un error, no se puede escribir el archivo ${err}`);
        }
    };

    getById = async (numberID) => {
            let data = await fs.promises.readFile(this.nombreArchivo, "utf-8");
            let arrData = JSON.parse(data);
            let findID = arrData.find(({ id }) => id == numberID);
            try {
                findID == undefined
                ?  console.log(null)
                : console.log(`Producto: ${numberID} => ${findID.title}`);
            } catch (error) {
                console.log(`Error en el procesamiento de búsqueda: ${error}`);
            }
        
            return findID;
            };
        
    getAll = async () => {
        let data = await fs.promises.readFile(this.nombreArchivo, "utf-8");
        let arrData = JSON.parse(data);
        return arrData;
        };
        
    deleteById = async (numberID) => {
        let data = await fs.promises.readFile(this.nombreArchivo, "utf-8");
        let arrData = JSON.parse(data);
        
        try {
            let findID = arrData.filter(({ id }) => id != numberID);
            await fs.promises.writeFile(
                this.nombreArchivo,
                JSON.stringify(findID, null, 2)
            );
            } catch (err) {
                console.log(`No se ha podido guardar el objeto: ${err}`);
            }
        };
        
    deleteAll = () => {
        console.log("Se han eliminado todos los elementos")
        fs.promises.writeFile(this.nombreArchivo, "");
        };
}


const file = new Contenedor("./Archivos/productos.json");

const saveFunction = async () => {
await file.save({
    title: "Mouse",
    price: "14.000",
    thumbnail: "Mouse",
});

await file.save({
    title: "Monitor LG",
    price: "20.000",
    thumbnail: "Monitor Curvo",
});

await file.save({
    title: "Placa de video",
    price: "350.000",
    thumbnail: "Placa GeForce",
});

await file.save({
    title: "Silla Gamer",
    price: "15.000",
    thumbnail: "Silla gamer",
});

await file.save({
    title: "Teclado",
    price: "7.800",
    thumbnail: "Telcado Red Dragon",
});

// await file.getById(3);

// await file.getAll();

// await file.deleteById(2);

// await file.deleteAll(); /* Funciona descomentado */
};

saveFunction();
