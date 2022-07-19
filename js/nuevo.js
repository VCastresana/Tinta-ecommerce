
const contenedorProductos = document.getElementById('producto-contenedor')

const contenedorCarrito = document.getElementById('carrito-contenedor')

const botonVaciar = document.getElementById('vaciar-carrito')

const contadorCarrito = document.getElementById('contadorCarrito')

const cantidad = document.getElementById('cantidad')
const precioTotal = document.getElementById('precioTotal')
const cantidadTotal = document.getElementById('cantidadTotal')


let carrito = []

stockProductos.forEach((producto) => {
    const div = document.createElement('div')
    div.classList.add('card')
    div.innerHTML =  ` <div class="productos-item">
    <img class="foto-remera" src=${producto.img}>
    <h3 class="modelo-remera">${producto.modelo}</h3>
    <p class="precio">$  ${producto.precio}</p>
    <p class="medio-pagos">${producto.medioPago}</p>    
    <div class="selectores">
    <select name="select" id="selectorColor" class="selectorColor">
    <option value="value0">Color</option>
    <option value="value1" class="color"> ${producto.color.NE}</option>
    <option value="value2" class="color"> ${producto.color.BL}</option>
    <option value="value3" class="color"> ${producto.color.BO}</option>
    </select> 
    <select name="select" id="selectorTalle" class="selectorTalle">
    <option value="value0">Talle</option>
    <option value="value1" class="talle">${producto.talle.S}</option>
    <option value="value2" class="talle">${producto.talle.M}</option>
    <option value="value3" class="talle">${producto.talle.L}</option>
    </select> 
    </div>
    <button id="agregar${producto.id}" class="boton-agregarCarrito" id="boton-agregarCarrito">Comprar</button>   
                    
</div>`

    contenedorProductos.appendChild(div)

    const boton = document.getElementById(`agregar${producto.id}`)
    boton.addEventListener('click', () => {

        swal({
            title: "Salud!",
            text: "Tu producto se agregó al carrito con éxito", 
            icon: "success",
            confirm: "ok",
          })

        agregarAlCarrito(producto.id)
    })
})
  

function agregarAlCarrito(id){

    let item = stockProductos.find(prod => prod.id === id) 
    let productoEnCarrito = carrito.find(item => item.id === id)

    if (productoEnCarrito){ 
        productoEnCarrito.cantidad++;
    }else { 
        item.cantidad = 1;
        carrito.push(item)
    }
    
    actualizarCarrito() 
}


const eliminarDelCarrito = (id) => {
    const item = carrito.find((prod) => prod.id === id)

    const indice = carrito.indexOf(item)
    carrito.splice(indice, 1) 
    actualizarCarrito() 
    console.log(carrito)
}

const actualizarCarrito = () => {

    contenedorCarrito.innerHTML = "" 

    carrito.forEach((prod) => {
        const div = document.createElement('div')
        div.className = ('productoEnCarrito')
        div.innerHTML = `
        
        <div>
        <p><b>Modelo:</b> ${prod.modelo}</p>
        </div>
        <p><b>Precio:</b> $ ${prod.precio}</p>
        <p><b>Cantidad:</b> ${prod.cantidad}</p>
        <button onclick="eliminarDelCarrito(${prod.id})" class="boton-eliminar"><img src="./img/trash-can-solid.png" class="icono-basura"></button>
        `

        contenedorCarrito.appendChild(div)
        
        localStorage.setItem('carrito', JSON.stringify(carrito))

    })

   

    contadorCarrito.innerText = carrito.length 
    console.log(carrito)
    precioTotal.innerText = carrito.reduce((acc, prod) => acc + prod.cantidad * prod.precio, 0)

}

document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('carrito')){
        carrito = JSON.parse(localStorage.getItem('carrito'))
        actualizarCarrito()
    }
})

botonVaciar.addEventListener('click', () => {
    carrito.length = 0
    actualizarCarrito()
})
