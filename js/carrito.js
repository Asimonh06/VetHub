//Variable que mantiene el estado visible del carrito
let carritoVisible = false;

function ready(){
    //funcionalidad del boton eliminar
    let botonesEliminarItem = document.getElementsByClassName('btn-eliminar')
    for(let i = 0; i < botonesEliminarItem.length; i++){ 
        let button = botonesEliminarItem[i];
        button.addEventListener('click', eliminarItemCarrito);
    }

    //Agregando funcionalidad al boton de sumar, el simbolo de +
    let botonesSumarCantidad = document.getElementsByClassName('sumar-cantidad');
    for(let i = 0; i < botonesSumarCantidad.length; i++){ 
        let button = botonesSumarCantidad[i];
        button.addEventListener('click', sumarCantidad);
    }

    //Agregando funcionalidad al boton de restar, el simbolo de -
    let botonesRestarCantidad = document.getElementsByClassName('restar-cantidad');
    for(let i = 0; i < botonesRestarCantidad.length; i++){ 
        let button = botonesRestarCantidad[i];
        button.addEventListener('click', restarCantidad);
    }

    //Agregando funcionalidad a los botones de agregar al carrito
    let botonesAgregarAlCarrito = document.getElementsByClassName('boton-item');
    for(let i = 0; i < botonesAgregarAlCarrito.length; i++){ 
        let button = botonesAgregarAlCarrito[i];
        button.addEventListener('click', agregarAlCarritoClicked);
    }

    //agregamos funcionalidad al boton de pagar
    let botonPagar = document.getElementsByClassName('btn-pagar')[0];
    botonPagar.addEventListener('click', pagarClicked);

}

//Esperamos que todos los elementos de la pagina se carguen para continuar con el script
if(document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded', ready);
} else {
    ready();
}

//Elimina un item del carrito
function eliminarItemCarrito(event) {
    let buttonClicked = event.target;
    buttonClicked.parentElement.parentElement.remove();

    //se actualiza el total del carrito despues de eliminar un item
    actualizarTotalCarrito();

    //Controla si hay items en el carrito despues de eliminarlo
    //Si no hay items en el carrito, se oculta el carrito
    ocultarCarrito();
}

function actualizarTotalCarrito(){
    //seleccionamos el contenedor de carrito
    let contenedorCarrito = document.getElementsByClassName('carrito')[0];
    let carritoItems = contenedorCarrito.getElementsByClassName('carrito-item');
    let total = 0
    //recorremos cada item del carrito para actualizar el total
    for(let i = 0; i < carritoItems.length; i++){
        let item = carritoItems[i];
        let precioElemento = item.getElementsByClassName('carrito-item-precio')[0];
        //quitamos el simbolo de soles
        let precio = parseFloat(precioElemento.innerText.replace('S/',''));
        console.log(precio);
        let cantidadItem = item.getElementsByClassName('carrito-item-cantidad')[0];
        let cantidad = cantidadItem.value;
        console.log(cantidad);
        total += precio * cantidad;
        document.getElementsByClassName('carrito-precio-total')[0].innerText = 'S/ '+ total.toLocaleString('es');
    }
    
}

function ocultarCarrito(){
    let carritoItems = document.getElementsByClassName('carrito-items')[0];
    //verificamos si hay items en el carrito 
    if (carritoItems.childElementCount == 0){
        let carrito = document.getElementsByClassName('carrito')[0];
        carrito.style.marginRight = '-100%';
        carrito.style.opacity = '0';
        carritoVisible = false;

        //Ahora maximizo el contenedor de carrito, ya que ya no hay items en el carrito
        let items = document.getElementsByClassName('contenedor-items')[0];
        items.style.width = '100%';

    }
}

//Aumento en uno la cantidad de un elemento seleccionado
function sumarCantidad(event){
    let buttonClicked = event.target;
    let selector = buttonClicked.parentElement;
    let cantidadActual = selector.getElementsByClassName('carrito-item-cantidad')[0].value;
    console.log(cantidadActual);
    cantidadActual++;
    selector.getElementsByClassName('carrito-item-cantidad')[0].value = cantidadActual;
    //Actualizamos el total del carrito
    actualizarTotalCarrito();
}

function restarCantidad(event){
    let buttonClicked = event.target;
    let selector = buttonClicked.parentElement;
    let cantidadActual = selector.getElementsByClassName('carrito-item-cantidad')[0].value;
    console.log(cantidadActual);
    cantidadActual--;
    //Controlamos que no sea menor que 1
    if(cantidadActual >= 1){
        selector.getElementsByClassName('carrito-item-cantidad')[0].value = cantidadActual;
        //Actualizamos el total del carrito
        actualizarTotalCarrito();
    }
}

function agregarAlCarritoClicked(event){
    let button = event.target;
    let item = button.parentElement;
    let titulo = item.getElementsByClassName('titulo-item')[0].innerText;
    console.log(titulo);
    let precio = item.getElementsByClassName('precio-item')[0].innerText;
    let imagenSrc = item.getElementsByClassName('img-item')[0].src;
    console.log(imagenSrc);
    console.log(precio);
    //funcion que agrega el item al carrito, enviando por parametros el titulo, el precio y la imagen del item
    agregarItemAlCarrito(titulo, precio, imagenSrc);
    //Hacemos visible el carrito cuando se agrega un item al carrito
    hacerVisibleCarrito();
}

function agregarItemAlCarrito(titulo, precio, imagenSrc){
    let item = document.createElement('div');
    let itemsCarrito = document.getElementsByClassName('carrito-items')[0];
    
    //Controlamos si el item que esta ingresando no existe en el carrito
    let nombresItemsCarrito = itemsCarrito.getElementsByClassName('carrito-item-titulo');
    for(let i = 0; i < nombresItemsCarrito.length; i++){
        if(nombresItemsCarrito[i].innerText == titulo){
            // itemsCarrito++;
            // Si el item ya está en el carrito, solo aumentamos la cantidad
            let cantidadInput = nombresItemsCarrito[i].parentElement.getElementsByClassName('carrito-item-cantidad')[0];
            cantidadInput.value = parseInt(cantidadInput.value) + 1; // Aumentar la cantidad en 1
            actualizarTotalCarrito(); // Actualizamos el total
            return; // Salimos de la función
        }
    }

    let itemCarritoContenido = `
    <div class="carrito-item">
        <img src="${imagenSrc}" alt="" width="80px">
        <div class="carrito-item-detalles">
            <span class="carrito-item-titulo">${titulo}</span>
            <div class="selector-cantidad">
                <i class='bx bx-minus restar-cantidad' ></i>
                <input type="text" value="1" class="carrito-item-cantidad" disabled>
                <i class='bx bx-plus sumar-cantidad' ></i>
            </div>
            <span class="carrito-item-precio">${precio}</span>
        </div>
        <span class="btn-eliminar">
            <i class='bx bxs-trash-alt' ></i>
        </span>
    </div>
    `

    item.innerHTML = itemCarritoContenido;
    itemsCarrito.appendChild(item);

    //agregamos la funcionalidad de eliminar al nuevo item
    item.getElementsByClassName('btn-eliminar')[0].addEventListener('click', eliminarItemCarrito);


    //Agregamos la funcionalidad de sumar al nuevo item
    item.getElementsByClassName('sumar-cantidad')[0].addEventListener('click', sumarCantidad);

    //Agregamos la funcionalidad de restar al nuevo item
    item.getElementsByClassName('restar-cantidad')[0].addEventListener('click', restarCantidad);

}

function pagarClicked(event){
    //Eliminar todos los items del carrito
    let itemsCarrito = document.getElementsByClassName('carrito-items')[0];
    while(itemsCarrito.hasChildNodes()){
        itemsCarrito.removeChild(itemsCarrito.firstChild);
    }
    actualizarTotalCarrito();

    ocultarCarrito();
}

function hacerVisibleCarrito(){
    carritoVisible = true;
    let carrito = document.getElementsByClassName('carrito')[0];
    carrito.style.marginRight = '0';
    carrito.style.opacity = '1';

    let items = document.getElementsByClassName('contenedor-items')[0];
    items.style.width = '60%';
}

function pagarClicked(event) {
    let itemsCarrito = document.getElementsByClassName('carrito-items')[0];
    let mensaje = "Items en mi carrito:\n";
    let total = 0;

    // Recorrer los items del carrito para crear el mensaje
    for (let item of itemsCarrito.getElementsByClassName('carrito-item')) {
        let titulo = item.getElementsByClassName('carrito-item-titulo')[0].innerText;
        let precioElemento = item.getElementsByClassName('carrito-item-precio')[0].innerText;
        let cantidad = item.getElementsByClassName('carrito-item-cantidad')[0].value;
        
        // Formatear el precio para el mensaje
        let precio = parseFloat(precioElemento.replace('S/', '').replace(',', '.'));
        total += precio * cantidad;

        // Añadir al mensaje
        mensaje += `${titulo} - Cantidad: ${cantidad} - Precio: ${precioElemento}\n`;
    }

    // Añadir el total al mensaje
    mensaje += `\nTotal: S/ ${total.toLocaleString('es')}`;

    // Codificar el mensaje para la URL
    let mensajeCodificado = encodeURIComponent(mensaje);
    
    // Crear la URL para WhatsApp
    let numeroWhatsApp = "+51987172867"; // numero a enviar el mensaje
    let urlWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${mensajeCodificado}`;

    // Abrir WhatsApp
    window.open(urlWhatsApp, '_blank');

    // Limpiar el carrito
    while (itemsCarrito.hasChildNodes()) {
        itemsCarrito.removeChild(itemsCarrito.firstChild);
    }
    actualizarTotalCarrito();
    ocultarCarrito();
}
