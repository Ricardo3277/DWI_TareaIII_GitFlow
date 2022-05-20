//Base de datos -- simulada mediante un array o documento tipo json
const baseDato = [{
        id: 1,
        nombre: 'Control PS4',
        precio: 1889,
        Imagen: "Images/controlPS4.jpg"
    },
    {
        id: 2,
        nombre: 'Control Xbox',
        precio: 1698,
        Imagen: "Images/controlXBOX.jpg"

    },
    {
        id: 3,
        nombre: 'PlayStation 5',
        precio: 13999,
        Imagen: "Images/Consola PlayStation.jpg"

    },
    {
        id: 4,
        nombre: 'FIFA 22',
        precio: 1249,
        Imagen: "Images/FIFA22.jpg"

    },
    {
        id: 5,
        nombre: 'Control PS5',
        precio: 1299,
        Imagen: "Images/controlPS5.jpg"

    },
    {
        id: 6,
        nombre: 'Audiculares PS5',
        precio: 3299,
        Imagen: "Images/Audiculares.jpg"

    },
    {
        id: 7,
        nombre: 'Audiculares XBOX',
        precio: 3200,
        Imagen: "Images/XboxHeadSet.jpg"
    },
]

let carrito = []
const domItems = document.querySelector('#item')
const domCarrito = document.querySelector('#carrito')
const domTotal = document.getElementById('total')
const domBotonVaciar = document.getElementById('botonVaciar')

function renderizarProductos() {
    baseDato.forEach((info) => {
        //Creamos la estructura del main
        //creamos la card que es un div con class car
        const cardProducto = document.createElement('div')
        cardProducto.classList.add('card', 'col-sm-4')

        //Creamos el body de la card
        const cardBody = document.createElement('div')
        cardBody.classList.add('card-body')

        //Creamos el titulo de la card
        const cardTitle = document.createElement('h5')
        cardTitle.classList.add('card-title')
        cardTitle.textContent = info.nombre

        //Creamos la imagen de la card
        const cardImage = document.createElement('img')
        cardImage.classList.add('img-fluid')
        cardImage.setAttribute('src', info.Imagen)

        //Creamos el elemento para el precio del producto
        const cardPrecio = document.createElement('p')
        cardPrecio.textContent = `$${info.precio}`

        //Crear el boton
        const btnAgregar = document.createElement('button')
        btnAgregar.textContent = "+"
        btnAgregar.classList.add('btn', 'btn-primary')
        btnAgregar.addEventListener('click', agregarProductoAlCarrito)
        btnAgregar.setAttribute('marcador', info.id)

        //Agregar los elementos al contenedor main con appendChild
        cardBody.appendChild(cardTitle)
        cardBody.appendChild(cardImage)
        cardBody.appendChild(cardPrecio)
        cardBody.appendChild(btnAgregar)
        cardProducto.appendChild(cardBody)
        domItems.appendChild(cardProducto)
    })
}

/*
//Creamos la estructura del main
//creamos la card que es un div con class car
const cardProducto = document.createElement('div')
cardProducto.classList.add('card', 'col-sm-4')

//Creamos el body de la card
const cardBody = document.createElement('div')
cardBody.classList.add('card-body')

//Creamos el titulo de la card
const cardTitle = document.createElement('h5')
cardTitle.classList.add('card-title')
cardTitle.textContent = "Nombre de Producto"

//Creamos la imagen de la card
const cardImage = document.createElement('img')
cardImage.classList.add('img-fluid')
cardImage.setAttribute('src', 'Images/controlPS4.jpg')

//Creamos el elemento para el precio del producto
const cardPrecio = document.createElement('p')
cardPrecio.textContent = "$ 1, 350"

//Crear el boton
const btnAgregar = document.createElement('button')
btnAgregar.textContent = "+"
btnAgregar.classList.add('btn', 'btn-primary')
btnAgregar.addEventListener('click', renderizarCarrito)

//Agregar los elementos al contenedor main con appendChild
cardBody.appendChild(cardTitle)
cardBody.appendChild(cardImage)
cardBody.appendChild(cardPrecio)
cardBody.appendChild(btnAgregar)
cardProducto.appendChild(cardBody)
domItems.appendChild(cardProducto)
*/

//Crear funcion para a�adir producto desde Array por me id de productos
function agregarProductoAlCarrito(evento) {
    carrito.push(evento.target.getAttribute('marcador'))
    renderizarCarrito()
}

//Crear funciones para la funcionalidad 
function renderizarCarrito() {
    //Vaciar carrito aunque no tenga nada
    domCarrito.textContent = ''
        ///AQUI VA A HACER MAS LINEAS DE CODIGO PARA USO DE BASE DE DATOS ********
    const carritoNoDuplicados = [...new Set(carrito)]

    carritoNoDuplicados.forEach((item) => {
        const miItem = baseDato.filter((itemBaseDatos) => {
            return itemBaseDatos.id === parseInt(item);
        })
        const numeroUnidadesItem = carrito.reduce((total, itemId) => {
            return itemId === item ? total += 1 : total
        }, 0)

        //crear un li
        const nuevoNodo = document.createElement('li');
        //Agregamos estilo
        nuevoNodo.classList.add('list-group-item', 'text-center')
            //Agregamos contenido
        nuevoNodo.textContent = `${miItem[0].nombre} x ${numeroUnidadesItem} - $${miItem[0].precio} `

        //Agregar boton para eliminar producto del carrito
        const btnEliminar = document.createElement('button')
            //Agregamos estilo al boton (rojito)
        btnEliminar.classList.add('btn', 'btn-danger')
        btnEliminar.textContent = 'X'
        btnEliminar.dataset.item = item
        btnEliminar.addEventListener('click', eliminarProductoCarrito)

        //Hacemos appendChild de los elementos
        nuevoNodo.appendChild(btnEliminar)
        domCarrito.appendChild(nuevoNodo)
    })
    domTotal.textContent = calcularTotales()
}

//crear function para vaciar el carrito
function vaciarCarrito() {
    //Esto unicamente limpia el contenido de la UL
    domCarrito.textContent = ''
        //vaciamos el array carrito
    carrito = []
    renderizarCarrito()
}

//crear funcion para eliminar un solo producto del carrito (no del contador)
function eliminarProductoCarrito(evento) {
    const id = evento.target.dataset.item
        //eliminamos el producto del array
    carrito = carrito.filter((carritoId) => {
        return carritoId != id
    })
    renderizarCarrito()
}

//funcion para calcular el total a pagar por todos los productos al carrito
function calcularTotales() {
    //recorrer el carrito
    return carrito.reduce((total, item) => {
        const NewItem = baseDato.filter((itemBaseDatos) => {
            return itemBaseDatos.id === parseInt(item)
        })
        return total + NewItem[0].precio
    }, 0)
}

domBotonVaciar.addEventListener('click', vaciarCarrito)

renderizarProductos()