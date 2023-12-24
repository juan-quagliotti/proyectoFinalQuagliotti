let url = "https://dolarapi.com";
const dolar = document.getElementById("dolar");

fetch("https://dolarapi.com/v1/dolares/oficial")
    .then(response => response.json())
    .then(data => console.log(data));

function mostrarAvisoEnConsola(mensaje) {
    return new Promise((resolve) => {
        console.log(mensaje);
        resolve();
    });
}

const Productos = function (nombre, stock, precio) {
    this.name = nombre;
    this.stock = stock;
    this.precio = precio;
}

let lista = [];


fetch("productos.json") // 
    .then(response => response.json())
    .then(data => {
        lista = data.map(item => new Productos(item.name, item.stock, item.precio));
        mostrarLista(lista);
    });

function mostrarLista(productos) {
    const container = document.getElementById("productos-container");
    container.innerHTML = "";

    productos.forEach((producto) => {
        const card = document.createElement("div");
        const nombre = document.createElement("h2");
        nombre.textContent = "Producto: " + producto.name;
        card.appendChild(nombre);
        const precio = document.createElement("p");
        precio.textContent = "Valor: $" + producto.precio;
        card.appendChild(precio);
        const stock = document.createElement("p");
        stock.textContent = "En stock: " + producto.stock;
        card.appendChild(stock);

        container.appendChild(card);
    });
}

const filtrarButt = document.getElementById("filtrar");
filtrarButt.addEventListener("click", filtrar);

function filtrar() {
    const input = document.getElementById("filtrar2").value;
    const clave = input.trim().toUpperCase();
    const resultado = lista.filter((producto) => producto.name.toUpperCase().includes(clave));

    if (resultado.length > 0) {
        mostrarLista(resultado);
    } else {
        Swal.fire({
            icon: "error",
            title: "😢",
            text: "No se encuentra el resultado buscado",
        });
    }
}

const agregarProductoButt = document.getElementById("agregarProducto");
agregarProductoButt.addEventListener("click", agregarProducto);

function agregarProducto() {
    const nombre = prompt("Ingrese el nombre del nuevo producto:");
    const stock = parseInt(prompt("Ingrese el stock del nuevo producto:"), 10);
    const precio = parseFloat(prompt("Ingrese el precio del nuevo producto:"));

    if (nombre && !isNaN(stock) && !isNaN(precio)) {
        const nuevoProducto = new Productos(nombre, stock, precio);
        lista.push(nuevoProducto);

        mostrarLista(lista);

        mostrarAvisoEnConsola(`Nuevo producto agregado: ${nombre}`).then(() => {
            mostrarMensaje(
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Se ha agregado un nuevo producto",
                    showConfirmButton: false,
                    timer: 1500
                })
            );
        });
    } else {
        Swal.fire({
            icon: "error",
            title: "😖",
            text: "Error al ingresar los datos del nuevo producto. Inténtelo de nuevo."
        });
    }
}




function mostrarMensaje(mensaje) {
    const mensajeElemento = document.getElementById("mensaje");
    mensajeElemento.textContent = mensaje;
}

const editarProductoButt = document.getElementById("editarProducto");
editarProductoButt.addEventListener("click", editarProducto);

function editarProducto() {
    const nombre = prompt("Ingrese el nuevo nombre del producto:");
    const stock = parseInt(prompt("Ingrese el nuevo stock del producto:"), 10);
    const precio = parseFloat(prompt("Ingrese el nuevo precio del producto:"));

    if (nombre && !isNaN(stock) && !isNaN(precio)) {
        const nombreMinuscula = nombre.toLowerCase();

        const productoAEditar = lista.find((producto) => producto.name.toLowerCase() === nombreMinuscula);

        if (productoAEditar) {
            productoAEditar.stock = stock;
            productoAEditar.precio = precio;

            mostrarLista(lista);

            mostrarAvisoEnConsola(`Producto editado: ${nombre}`).then(() => {
                mostrarMensaje(
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Se ha editado el producto",
                        showConfirmButton: false,
                        timer: 1500
                    })
                );
            });
        } else {
            Swal.fire({
                icon: "error",
                title: "😖",
                text: "Producto no encontrado. Inténtelo de nuevo."
            });
        }
    } else {
        Swal.fire({
            icon: "error",
            title: "😖",
            text: "Error al ingresar los datos del producto. Inténtelo de nuevo."
        });
    }
}
