const imagenes = document.querySelectorAll('.img-galeria')
const imagenLight = document.querySelector('.agregar-imagen')
const contenedorLight = document.querySelector('.imagen-light')
const closeLight = document.querySelector('.close')

imagenes.forEach(imagen => {
    imagen.addEventListener('click', () => {
        aparecerIamgen(imagen.getAttribute('src')) //ruta de la imagen
    })
})

contenedorLight.addEventListener('click', (e) => {
    if (e.target !== imagenLight){
        contenedorLight.classList.toggle('show')
        imagenLight.classList.toggle('showImage')
        hamburguer.style.opacity = '1'
    }
})

const aparecerIamgen = (imagen) => {
    imagenLight.src = imagen //se le agregar la direccion de la imagen a la clase imagen que no tiene src
    contenedorLight.classList.toggle('show')// muestra el contenedor que tiene una opacidad de 0.5
    imagenLight.classList.toggle('showImage') // muestra la imagen en si
    hamburguer.style.opacity = '0'
}