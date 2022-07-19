const contenedorModal = document.getElementsByClassName('modal-contenedor')[0]
const botonAbrir = document.getElementById('botonCarrito')
const botonCerrar = document.getElementById('carritoCerrar')
const modalCarrito = document.getElementsByClassName('modal-carrito')[0]



botonAbrir.addEventListener("click", () =>{
    carrito.length === 0 ?
    swal({
        text: "El carrito esta vacío",
        confirm: "ok",
    }) : contenedorModal.classList.toggle('modal-active')
})

botonCerrar.addEventListener('click', ()=>{
    contenedorModal.classList.toggle('modal-active')
})

contenedorModal.addEventListener('click', (event) =>{
    contenedorModal.classList.toggle('modal-active')

})
modalCarrito.addEventListener('click', (event) => {
    event.stopPropagation() 
})
