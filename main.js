const mostrarProductos = () => {
    const conntenedor = document.getElementById ("producto-contenedor");

    productos.forEach ( producto => {
        const div = document.createElement("div");
        div.classList.add("card");
        div.innerHTML = ` <div class="productos-item">
                            <img class="foto-remera" src=${producto.img}>
                            <span class="modelo-remera">${producto.modelo}</span>
                            <span class="precio">$  ${producto.precio}</span>
                            <span class="medio-pagos">${producto.medioPago}</span>
                        </div>`
        conntenedor.appendChild(div);
    });
};
mostrarProductos();
