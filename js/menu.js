const hamburguer = document.querySelector('.hamburger')
const menu = document.querySelector('.menu-navegacion')

hamburguer.addEventListener('click', () => {
    menu.classList.toggle('spread') //cada vez q haces click se quita y agrega la clase spread
})

window.addEventListener('click', (e) => {
    if(menu.classList.contains('spread')
    && e.target != menu && e.target != hamburguer){
        menu.classList.toggle('spread')
    }
})