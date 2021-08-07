// Se estan  llamando las clase desde el HTML y declarando variables para su uso
const screens = document.querySelectorAll('.screen') 

const choose_insect_btns = document.querySelectorAll('.choose-insect-btn')
const start_btn = document.getElementById('start-btn')
const game_container = document.getElementById('game-container')

const tiemEl = document.getElementById('time')
const scoreEl = document.getElementById('score')
const message = document.getElementById('message')

let seconds = 0;
let score = 0;
let selected_insect = {}

// Evento para el boton de inicio del juego, permite añadir la clase up a screens[0]
start_btn.addEventListener('click', ()=> screens[0].classList.add('up')) 

// Se realiza un forEach para los botones de los insectos, este forEach permite exportar los datos de la imagen

choose_insect_btns.forEach(btn => {
    btn.addEventListener('click', () => {
        const img = btn.querySelector('img')
        const src = img.getAttribute('src') //Obtener el atributo src
        const alt = img.getAttribute('alt') //Obtener el atributo alt
        selected_insect = {src, alt}   // Guardando los atributos src y alt en el objeto selected_insect
        screens[1].classList.add('up') //Permite ocultar el segundo screen, al seleccionar el insecto

        setTimeout(createInsect, 1000)
        startGame()
    })
})


function startGame() {
    setInterval(increaseTime,1000)
}

function increaseTime() {
    let m =  Math.floor(seconds/60) 
    let s = seconds % 60
    m = m < 10 ? `0${m}` : m  //Condicional ternario, permite incrementar el tiempo durante juego
    s = s < 10 ? `0${s}` : s
    tiemEl.innerHTML = `Time: ${m}:${s}`
    seconds++
}

function createInsect() {
    const insect = document.createElement('div') // se crea un nuevos elementos despues de cada click sobre el existente.
    insect.classList.add('insect')
    const {x,y} = getRandomLocation()  // Permite darle al par coordenado (x,y) un valor aleatorio
    insect.style.top = `${y}px`        //style.top: desplazarse de manera vertical
    insect.style.left = `${x}px`       //style.left: desplazarse de manera horizontal
    insect.innerHTML = ` <img
    src = "${selected_insect.src}" alt = "${selected_insect.alt}" 
    style = "transform: rotate(${Math.random()*360}deg)" />` // permite crear un elemento de HTML de tipo img y sus atributos pertenecen a el objeto select_insect, se le da una rotacion aleatoria.

    
                                                     
    insect.addEventListener('click', catchInsect) //Evento que permite capturar el insecto.
    game_container.appendChild(insect)            //appendChild: agregar un insect en el game container ?
}

function getRandomLocation() { //Esta funcion se utiliza para ubicar de manera aleatoria la imagen. Se usa en la funcion createInsect
    const width = window.innerWidth   //Toma el valor del ancho de la ventana
    const height = window.innerHeight //Toma el valor de la altura de la ventana
    const x = Math.random()*(width-200)+100 //Creacion del par ordenado de manera aleatoria
    const y = Math.random()*(height-200)+100

    return{x, y}
}

function catchInsect() {
    increaseScore()   //Aumenta el score  
    this.classList.add('caught')  //No entiendo el uso del this 
    setTimeout(()=> this.remove(),2000) //Se remueve 
    addInsects() 

}

function addInsects() {  //Permite incrementar los insectos, se usa en la funcion catchInsect
    setTimeout(createInsect,3000)
    setTimeout(createInsect,2500)
    
}

function increaseScore() { //Funcion que permite incrementar el puntaje, se utiliza en la funcion catchInsect
    score++
    if(score>19) {
        message.classList.add('visible')
    }
    scoreEl.innerHTML = `Score: ${score}`
}

message.addEventListener('click', ()=> screens[1].classList.remove('up'))  //Remover arriba el mensaje
