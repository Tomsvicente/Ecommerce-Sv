class Usuario {
    constructor(nombre, apellido,libros,mascotas){
        this.nombre = nombre
        this.apellido = apellido
        this.libros = libros
        this.mascotas = mascotas
    }



        getFullName() {
            console.log(`Hola ! Soy ${this.nombre} ${this.apellido}`)
        }

        addMascota(nombre){
            this.mascotas.push(nombre);
        }

        countMascota(){
            console.log(`Usted tiene ${this.mascotas.length} mascotas`);
        }

        addBook(titulo, escritor){
            this.libros.push({nombre: titulo, autor: escritor})
            console.log(`Usted agregó el libro ${titulo} del autor ${escritor}`)
        }

        getBookNames() {
            let nombres = [];
            this.libros.forEach(libros => nombres.push(libros.nombre));
            console.log(`El usuario ${this.nombre} ${this.apellido} tiene estos libros disponibles : ${nombres}`)
        }

}

const user = new Usuario("Tom", "Vicente", [{nombre: "Señor de los anillos", autor: "Tolkien"}], ['gato', 'perro']);


user.getFullName();
user.addMascota("loro");
user.countMascota();
console.log(user)
user.addBook("Jekyll", "Hyde");
user.getBookNames();

