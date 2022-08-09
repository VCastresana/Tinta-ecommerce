
let carrito = []

// pinta las cards cargando la info del json

const contenedorProductos = document.getElementById('producto-contenedor');

fetch("./stock.json")
    .then( (response) => response.json() )
    .then( (data) => {
        mostrarProductos(data);
    })

const mostrarProductos = (data) => {
    data.forEach(producto => {
    const div = document.createElement("div");
    div.classList.add('card')
    div.innerHTML =  
    ` <div class="productos-item">
    <img class="foto-remera" id="foto-producto" src=${producto.img}>
    <h3 class="modelo-remera">${producto.modelo}</h3>
    <p class="precio">$  ${producto.precio}</p>
    <p class="medio-pagos">${producto.medioPago}</p>    
    <div class="selectores">
    <select name="select" id="selectorColor" class="selectorColor">
    <option id="${producto.color.NE}" class="color"> ${producto.color.NE}</option>
    <option id="${producto.color.BL}" class="color"> ${producto.color.BL}</option>
    <option id="${producto.color.BO}" class="color"> ${producto.color.BO}</option>
    </select> 
    <select name="select" id="selectorTalle" class="selectorTalle">
    <option value="${producto.talle.S}"  class="talle">${producto.talle.S}</option>
    <option value="${producto.talle.M}" class="talle">${producto.talle.M}</option>
    <option value="${producto.talle.L}" class="talle">${producto.talle.L}</option>
    </select> 
    <input type="number" name="cant" id="selectorCantidad" class="selectorCantidad"  min="1" max="5" value="1" />
    </div>
    <button id="agregar${producto.id}" class="boton-agregarCarrito" id="boton-agregarCarrito">Comprar</button>   
                    
</div>`

    contenedorProductos.appendChild(div)

// selecciona producto, color, talle y cantidad

    const boton = document.getElementById(`agregar${producto.id}`)
    boton.addEventListener('click', () => {

        const colorRemera = document.querySelector(`#agregar${producto.id}`).parentElement.querySelector('#selectorColor').value;
        const talleRemera = document.querySelector(`#agregar${producto.id}`).parentElement.querySelector('#selectorTalle').value;  
        const cantRemera = document.querySelector(`#agregar${producto.id}`).parentElement.querySelector('#selectorCantidad').value;

        console.log(colorRemera, talleRemera, cantRemera);

        swal({
            title: "Salud!",
            text: "Tu producto se agregó al carrito con éxito", 
            icon: "success",
            confirm: "ok",
          })
        agregarAlCarrito(producto.id, colorRemera, talleRemera, cantRemera)
    })
});
}


// agregando al carrito producto (color, talle y cantidad)

function agregarAlCarrito(id, colorRemera, talleRemera, cantRemera){

    fetch("./stock.json")
    .then( (response) => response.json() )
    .then( (data) => {
        let item = data.find(prod => prod.id === id) 
        item.color = colorRemera;
        item.talle = talleRemera;
        item.cantidad = cantRemera;
        console.log(item);

        let productoEnCarrito = carrito.find(item => item.id === id)

        if (productoEnCarrito){ 
            productoEnCarrito.cantidad++
        }else { 
            carrito.push(item)
        }        
        actualizarCarrito() 
    })
}

const contenedorCarrito = document.getElementById('carrito-contenedor')
const contadorCarrito = document.getElementById('contadorCarrito')
const precioTotal = document.getElementById('precioTotal')


// pinta los elementos seleccionados en el modulo carrito

const actualizarCarrito = () => {

    contenedorCarrito.innerHTML = "" 

    carrito.forEach((prod) => {
        const div = document.createElement('div')
        div.className = ('productoEnCarrito')
        div.innerHTML = `

        <img src="${prod.img}"class="imgModal">
        <div class="modal-parrafo1">
        <p><b>Modelo:</b> ${prod.modelo}</p>
        <p><b>Color:</b> ${prod.color}</p>
        <p><b>Talle:</b> ${prod.talle}</p>
        </div>
        <div class="modal-parrafo2">
        <p><b>Cantidad:</b> ${prod.cantidad}</p>
        <p><b>Precio por unidad:</b><br> $ ${prod.precio}</p>

        </div>
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

// eliminando productos seleccionados del carrito

const eliminarDelCarrito = (id) => {

    const item = carrito.find((prod) => prod.id === id)

    const indice = carrito.indexOf(item)
    carrito.splice(indice, 1) 
    actualizarCarrito() 

    localStorage.removeItem(prod.id);
}

// vaciar el carrito de forma total

const botonVaciar = document.getElementById('vaciar-carrito')

botonVaciar.addEventListener('click', () => {

    swal({
        title: "Atención",
        text: "Todos los productos se borraran del carrito ",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
          swal("El carrito ha quedado vacío", {
            icon: "success",
          });
          carrito.length = 0
          actualizarCarrito()
        } else {
          swal("Podes seguir con tu compra");
        }
      });

    carrito.length = 0
    actualizarCarrito()

    localStorage.removeItem('carrito');
})
