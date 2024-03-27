
// Función para mostrar el número en el texto superior
function mostrarResultado(values) {

  let suma = 0;
  let resultado = 0;

  for (i = 0; i < values.length; i++) {
    suma += values[i];
  };

  resultado = suma / 3;

  const textoDeResultado = document.getElementById("textoDeResultado");
  textoDeResultado.textContent = `El resultado mágico es: ${resultado}`;
}

// Función para generar los números aleatorios.
function generateRandomNumbers() {
  const min_value = Math.floor(Math.random() * 1000) + 1;
  const gap_value = Math.floor(Math.random() * 5) * 2 + 1;
  const values = [];
  for (let i = 0; i < 9; i++) {
    values.push(min_value + i * gap_value);
  }

  // Encontrar la mediana
  const median = Math.floor(values.length / 2);

  // Reordenar la lista según las reglas del juego
  let aux_var = 0;
  // Los dos números impares anteriores se intercalan desde la segunda posición anterior (3° y 1°)
  aux_var = values[median - 1];
  values[median - 1] = values[median - 2];
  values[median - 2] = aux_var;

  aux_var = values[median - 3];
  values[median - 3] = values[median - 4];
  values[median - 4] = aux_var;

  // Los dos números impares posteriores se intercalan desde la segunda siguiente posición (7° y 9°)
  aux_var = values[median + 1];
  values[median + 1] = values[median + 2];
  values[median + 2] = aux_var;

  aux_var = values[median + 3];
  values[median + 3] = values[median + 4];
  values[median + 4] = aux_var;

  // Los dos números pares anteriores se ordenan de forma descendente desde la posición posterior (6° y 8°)
  // Los dos números pares posteriores se ordenan de forma ascendente desde la posición anterior (4° y 2°)
  aux_var = values[median - 1];
  values[median - 1] = values[median + 1];
  values[median + 1] = aux_var;

  aux_var = values[median + 3];
  values[median + 3] = values[median - 3];
  values[median - 3] = aux_var;

  return values;
}

// Función para agregar los números dinámicamente a los elementos con la clase "number"
function agregarNumeros() {
  const numbersContainer = document.getElementById("numbers");
  const numeros = generateRandomNumbers();

  for (let numero of numeros) {
    const divNumero = document.createElement("div");
    divNumero.classList.add("number");
    divNumero.textContent = numero;
    divNumero.onclick = function() {
      pickNumber(this);
      this.classList.add("bounce");
      setTimeout(() => {
        this.classList.remove("bounce");
      }, 500);
    };
    numbersContainer.appendChild(divNumero);
  }

  // Llamo a la función para calcular el resultado esperado y mostrarlo por pantalla.
  mostrarResultado(numeros);
}

// Llamar a la función para agregar los números al cargar la página
agregarNumeros();

// Función para calcular la suma de las filas, columnas y diagonales.
function calcularSumaFilasColumnasDiagonales() {
  const textGanaste = document.getElementById("textoGanaste");
  const gridCells = document.querySelectorAll(".cell");
  const sumaFilas = [0, 0, 0];
  const sumaColumnas = [0, 0, 0];
  let sumaDiagonal1 = 0;
  let sumaDiagonal2 = 0;

  // Calcular la suma de filas y columnas
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      const index = i * 3 + j;
      const valor = parseInt(gridCells[index].textContent) || 0; // Si no hay número, se considera como 0
      sumaFilas[i] += valor;
      sumaColumnas[j] += valor;
      if (i === j) {
        sumaDiagonal1 += valor;
      }
      if (i + j === 2) {
        sumaDiagonal2 += valor;
      }
    }
  }

  // Asignar las sumas de filas a los casilleros circulares correspondientes
  document.getElementById("circular1").textContent = sumaFilas[0];
  document.getElementById("circular2").textContent = sumaFilas[1];
  document.getElementById("circular3").textContent = sumaFilas[2];

  // Asignar las sumas de columnas a los casilleros circulares correspondientes
  document.getElementById("circular4").textContent = sumaColumnas[0];
  document.getElementById("circular5").textContent = sumaColumnas[1];
  document.getElementById("circular6").textContent = sumaColumnas[2];

  // Asignar las sumas de las diagoneales a los casilleros cirucalres coresponidientes
  document.getElementById("circularDiagonal1").textContent = sumaDiagonal1;
  document.getElementById("circularDiagonal2").textContent = sumaDiagonal2;

  // Verificar si todas las sumas son iguales
  const sumaTotal = sumaFilas[0];

  if (sumaFilas.every(suma => suma === sumaTotal) &&
      sumaColumnas.every(suma => suma === sumaTotal) &&
      sumaDiagonal1 === sumaTotal &&
      sumaDiagonal2 === sumaTotal) {
    mostrarMensajeGanador();
  }

}


let selectedNumber = null;

function pickNumber(element) {
  selectedNumber = element.textContent;
}

function isNumberInGrid(number) {
    const gridCells = document.querySelectorAll(".cell");
    for (let cell of gridCells) {
      if (cell.textContent === number && cell.textContent !=="") {
        return true;
      }
    }
    return false;
}

function placeNumber(cell) {
  if (selectedNumber !== null && !isNumberInGrid(selectedNumber)) {
    cell.textContent = selectedNumber;
    selectedNumber = "";
    calcularSumaFilasColumnasDiagonales();
  }

  // Obtener el resultado mágico actual
  const resultado = parseFloat(document.getElementById("textoDeResultado").textContent.match(/\d+(\.\d+)?/)[0]);
  // Actualizar el color de fondo de los elementos circulares si la suma coincide
  const circularElements = document.querySelectorAll(".circular");
  circularElements.forEach(element => {
    const valor = parseInt(element.textContent);
    if (!isNaN(valor) && valor === resultado) {
      element.classList.add("match-sum"); // Agregar clase para coincidencia de suma
    } else {
      element.classList.remove("match-sum"); // Quitar clase si no coincide
    }
  });

  if (cell.textContent !==""){
    cell.classList.add("numbered"); // Agregar la clase "numbered" al colocar un número
  }else {
    cell.classList.remove("numbered"); // Quitar la clase "numbered" al quitar el número
  }

  // Agregar la clase "bounce" al hacer clic en el casillero
  cell.classList.add("bounce");

  // Quitar la clase "bounce" después de 500 milisegundos
  setTimeout(() => {
    cell.classList.remove("bounce");
  }, 500);

  // Pintar los números cuando se encuentran en el cuadro.
  const numbers = document.querySelectorAll(".number");
  numbers.forEach(numbersElement => {
    numbersElement.classList.remove("selected");
  });
  const squareNumbers = document.querySelectorAll(".cell");
  squareNumbers.forEach(squareElement => {
    const cellValue = parseInt(squareElement.textContent);
    numbers.forEach(numbersElement => {
      const numbersValue = parseInt(numbersElement.textContent);
      if (numbersValue === cellValue) {
        numbersElement.classList.add("selected");
      }
    });
  });
}

// Mostrar el mensaje de ganador y ocultar todos los demás elementos
function mostrarMensajeGanador() {
  const mensajeGanador = document.getElementById("hiddenContainer");
  mensajeGanador.style.display = "block";

  // Reproducir el sonido de victoria
  const victorySound = document.getElementById("victory-sound");
  victorySound.play();
  
  // Mostrar fuegos artificiales
  // Colores disponibles
  const colores = ["#FF5733", "#FFC300", "#DAF7A6", "#48C9B0", "#85C1E9", "#BB8FCE", "#F1948A"];

  // Función para obtener una posición aleatoria dentro del rango dado
  function getRandomPosition(max) {
    return Math.floor(Math.random() * max);
  }

  for (let i = 0; i < 20; i++) {
    const firework = document.createElement("div");
    firework.classList.add("firework");
    firework.style.left = getRandomPosition(window.innerWidth) + "px";
    firework.style.top = getRandomPosition(window.innerHeight) + "px";
    const tamaño = Math.random() * 100 + 10 + "px";
    firework.style.width = tamaño;
    firework.style.height = tamaño;
    const color = colores[Math.floor(Math.random() * colores.length)];
    firework.style.backgroundColor = color;
    document.body.appendChild(firework);

    const sparkle = document.createElement("div");
    sparkle.classList.add("sparkle");
    firework.appendChild(sparkle);
  }

  // Ocultar todos los demás elementos
  const container = document.getElementById("container");
  container.style.display = "none";
}

// Función para crear un nuevo Juego al apretar el botón.
function nuevoJuego() {

  // Recargar la página.
  window.location.reload();

}