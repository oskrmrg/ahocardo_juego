const teclado = document.getElementById("teclado-letras");
const opcionpalabras = document.getElementById("opcion-palabra");
const ingreso = document.getElementById("user-input-section");
const tecladonuevo = document.getElementById("new-game-container");
const juegonuevo = document.getElementById("new-game-button");
const ahorcado = document.getElementById("canvas");
const adivinopalabra = document.getElementById("result-text");
const cancelarjuego = document.getElementById("cancelar");

let categoria = {
  animales: [ "VACA", "TORO", "GALLINA", "GANSO", "PATO", "PAVO", "MULA", "BURRO", "CABALLO", "CERDO", "OVEJA", "CORDERO", "CABRA", "CHIVO", "GALLO", "POLLO", ],
  
  frutas: [ "LIMON", "MANZANA", "PERA", "DURAZNO", "NARANJA", "FRESA", "KIWI", "CEREZA", "GUAYABA", "PARCHITA", "LECHOZA", "MELON", "PLATANO", "MANDARINA",],

  superheroes: [ "BATMAN", "SUPERMAN", "ROBIN", "WONDERWOMAN", "SPIDERMAN", "HULK", "IRONMAN", "THOR", "CAPITANAMERICA", "LINTERNAVERDE", "FLASH", "BLACKPANTHER",],
      
};

let ganados = 0;
let conteo = 0;

let palabra = "";

const categoriaescoger = () => {
  opcionpalabras.innerHTML += `<h3>Selecciona una Categoría de Palabras</h3>`;
  let botonjuego = document.createElement("div");
  for (let value in categoria) {
    botonjuego.innerHTML += `<button class="options" onclick="mostrarpalabra('${value}')">${value}</button>`;
  }
  opcionpalabras.appendChild(botonjuego);
};

const bloquear = () => {
  let botonopc = document.querySelectorAll(".options");
  let keyboard = document.querySelectorAll(".letras");
  
  botonopc.forEach((button) => {
    button.disabled = true;
  });
  
  keyboard.forEach((button) => {
    button.disabled.true;
  });
  tecladonuevo.classList.remove("hide");
};

const mostrarpalabra = (optionValue) => {
  let botonopc = document.querySelectorAll(".options");
  
  botonopc.forEach((button) => {
    if (button.innerText.toLowerCase() === optionValue) {
      button.classList.add("active");
    }
    button.disabled = true;
  });
 
  teclado.classList.remove("hide");
  ingreso.innerText = "";
  
  let optionpalabras = categoria[optionValue];
  
  palabra = optionpalabras[Math.floor(Math.random() * optionpalabras.length)];
  palabra = palabra.toUpperCase();
  
  let verletra = palabra.replace(/./g, '<span class="guiones">_</span>');

  ingreso.innerHTML = verletra;
};

const empezar = () => {
  ganados = 0;
  conteo = 0;
 
  ingreso.innerHTML = "";
  opcionpalabras.innerHTML = "";
  teclado.classList.add("hide");
  tecladonuevo.classList.add("hide");
  teclado.innerHTML = "";
  
  for (let i = 65; i < 91; i++) {
    let button = document.createElement("button");
    button.classList.add("letras");
    
    button.innerText = String.fromCharCode(i);
   
    button.addEventListener("click", () => {
      let opcioncaracter = palabra.split("");
      let guion = document.getElementsByClassName("guiones");
      
      if (opcioncaracter.includes(button.innerText)) {
        opcioncaracter.forEach((char, index) => {
          
          if (char === button.innerText) {
            
            guion[index].innerText = char;
            
            ganados += 1;
            
            if (ganados == opcioncaracter.length) {
              adivinopalabra.innerHTML = `<h2 class='win-msg'>Felicidades. Has Ganado!!</h2><p>La palabra era: <span>${palabra}</span></p>`;
              bloquear();
            }
          }
        });
      } else {
          conteo += 1;
          drawMan(conteo);
          if (conteo == 6) {
            adivinopalabra.innerHTML = `<h2 class='lose-msg'>Uhhh, Perdiste!!</h2><p>La palabra era: <span>${palabra}</span></p> <img src="/images/figura.png"></img>`;
            
            bloquear();
          }
      }
      button.disabled = true;
    });
    teclado.append(button);
  }

  categoriaescoger();
  let { dibujoinicio } = ahorcadodibujo();
  dibujoinicio();
};

//Canvas
const ahorcadodibujo = () => {
  let contenido = ahorcado.getContext("2d");
  contenido.beginPath();
  contenido.strokeStyle = "#000";
  contenido.lineWidth = 2;
  
  const linea = (fromX, fromY, toX, toY) => {
    contenido.moveTo(fromX, fromY);
    contenido.lineTo(toX, toY);
    contenido.stroke();
  };
  const circulo = () => {
    contenido.beginPath();
    contenido.arc(70, 30, 10, 0, Math.PI * 2, true);
    contenido.stroke();
  };
  const figura = () => {
    linea(70, 40, 70, 80);
  };
  const brazoi = () => {
    linea(70, 50, 50, 70);
  };
  const brazod = () => {
    linea(70, 50, 90, 70);
  };
  const piernai = () => {
    linea(70, 80, 50, 110);
  };
  const piernad = () => {
    linea(70, 80, 90, 110);
  };
  
  const dibujoinicio = () => {
    contenido.clearRect(0, 0, contenido.canvas.width, contenido.canvas.height);
    linea(10, 130, 130, 130);
    linea(10, 10, 10, 131);
    linea(10, 10, 70, 10);
    linea(70, 10, 70, 20);
  };
  return { dibujoinicio, circulo, figura, brazoi, brazod, piernai, piernad };
};

const drawMan = (count) => {
  let { circulo, figura, brazoi, brazod, piernai, piernad } = ahorcadodibujo();
  switch (count) {
    case 1:
      circulo();
      break;
    case 2:
      figura();
      break;
    case 3:
      brazoi();
      break;
    case 4:
      brazod();
      break;
    case 5:
      piernai();
      break;
    case 6:
      piernad();
      break;
    default:
      break;
  }
};

//Empezar Juego Nuevo
juegonuevo.addEventListener("click", empezar);
window.onload = empezar;

//Cancelar Juego Actual
cancelarjuego.addEventListener("click", empezar);
window.onload = empezar;
