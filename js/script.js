// Simulador de estacionamiento

const capacidadEstacionamiento = 16
const URL = "./db/data.json"

let cocheras = []

// function inicializarCocheras() {
//     fetch(URL)
//         .then(response => response.json())
//         .then(data => {
//             cocheras = data
//             guardarCocheras()
//         })
// }

//conexion a base de datos con async, await y catch
async function inicializarCocheras() {
    try {
        const response = await fetch(URL)
        if (!response.ok) {
            throw new Error(`Error al cargar las cocheras: ${response.status}`)
        }
        const data = await response.json()
        cocheras = data
        guardarCocheras()
    } catch (error) {
        console.error("Error al inicializar cocheras:", error)
        Swal.fire({
            title: "Error",
            text: "No se pudo cargar la base de datos del estacionamiento.",
            icon: "error",
            confirmButtonText: "Ok"
        })
    }
}



// Cargar cocheras
function cargarCocheras() {
    const guardadas = JSON.parse(localStorage.getItem("cocheras"))
    if (guardadas && guardadas.length > 0) {
        cocheras = guardadas
    } else {
        inicializarCocheras()
    }
}

function guardarCocheras() {
    localStorage.setItem("cocheras", JSON.stringify(cocheras))
}

cargarCocheras()

//Datos de panel de estacionamiento
const ingresarAuto = document.getElementById("ingresarAuto")
const retirarAuto = document.getElementById("retirarAuto")
const pMensaje = document.getElementById("pMensaje")
const datoPatente = document.getElementById("patente")
const izquierda = document.getElementById("izquierda")
const central = document.getElementById("central")
const derecha = document.getElementById("derecha")
const tipoVehiculo = document.getElementById("tipoVehiculo")

function mostrarCocheras() {
    izquierda.innerHTML = ""
    central.innerHTML = ""
    derecha.innerHTML = ""

    cocheras.forEach((cochera, i) => {
        const divCochera = `<div class="cochera ${cochera.disponible ? 'libre' : 'ocupada'}">
                        Cochera ${cochera.id} - ${cochera.disponible ? 'Libre' : cochera.patente}
                    </div>`

        if (i < 6) { 
            izquierda.innerHTML += divCochera
        } else if (i >= 6 && i < 10) {
            central.innerHTML += divCochera
        } else {
            derecha.innerHTML += divCochera
        }
    })
} 

mostrarCocheras();
