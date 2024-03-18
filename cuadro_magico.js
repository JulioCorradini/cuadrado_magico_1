// Definir el array con los números
const numeros = [10, 11, 12, 13, 14, 15, 16, 17, 18]; // ESTE ARRAY DEBE CREARSE A PARTIR DE UNA LÓGICA PARTICULAR.

// Función para agregar los números dinámicamente a los elementos con la clase "number"
function agregarNumeros() {
  const numbersContainer = document.getElementById("numbers");
  for (let numero of numeros) {
    const divNumero = document.createElement("div");
    divNumero.classList.add("number");
    divNumero.textContent = numero;
    divNumero.onclick = function() {
      pickNumber(this);
    };
    numbersContainer.appendChild(divNumero);
  }
}

// Llamar a la función para agregar los números al cargar la página
agregarNumeros();

///////////////////////////////////////////////////////////////////////////
/*function calcularSumaFilasColumnasDiagonales() {
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

    // Mostrar las sumas en los elementos correspondientes
    const sumsRowsElement = document.getElementById("sums-rows");
    const sumsColumnsElement = document.getElementById("sums-columns");
    const sumsDiagonalsElement = document.getElementById("sums-diagonals");

    sumsRowsElement.innerHTML = sumaFilas.map(suma => `<div>${suma}</div>`).join("");
    sumsColumnsElement.innerHTML = sumaColumnas.map(suma => `<div>${suma}</div>`).join("");
    sumsDiagonalsElement.innerHTML = `<div>${sumaDiagonal1}</div><div>${sumaDiagonal2}</div>`;

  
    // Verificar si todas las sumas son iguales
    const sumaTotal = sumaFilas[0];
    if (sumaFilas.every(suma => suma === sumaTotal) &&
        sumaColumnas.every(suma => suma === sumaTotal) &&
        sumaDiagonal1 === sumaTotal &&
        sumaDiagonal2 === sumaTotal) {
      alert("¡Ganaste!"); // ESTO TIENE QUE SER UN MENSAJE EN PANTALLA.
    }
  }*/
  function calcularSumaFilasColumnasDiagonales() {
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
  
    // Verificar si todas las sumas son iguales
    const sumaTotal = sumaFilas[0];
    if (sumaFilas.every(suma => suma === sumaTotal) &&
        sumaColumnas.every(suma => suma === sumaTotal) &&
        sumaDiagonal1 === sumaTotal &&
        sumaDiagonal2 === sumaTotal) {
      alert("¡Ganaste!");
    }
  }
  
/////////////////////////////////////////////////////////////////////////  


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
    //////////////////////////////////////
    calcularSumaFilasColumnasDiagonales();
    ////////////////////////////////////////
  }
}

// Definir la variable con el número deseado
const resultado = 42; // ESTE VALOR DEBE SER EL RESULTADO DE LA SUMA DE LAS FILAS, COLUMNAS Y DIAGONALES.

// Función para mostrar el número en el texto superior
function mostrarResultado() {
  const textoDeResultado = document.getElementById("textoDeResultado");
  textoDeResultado.textContent = `El resultado mágico es: ${resultado}`;
}

// Llamar a la función para mostrar el número al cargar la página
mostrarResultado();