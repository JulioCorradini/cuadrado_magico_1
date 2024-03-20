
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
    textGanaste.style.display = "block";
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
}