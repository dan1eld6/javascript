// Simulador de estacionamiento
const capacidadEstacionamiento = 10
let cocheras = JSON.parse(localStorage.getItem("cocheras")) ||
[
    { patente: "", disponible: true, id: 1 },
    { patente: "", disponible: true, id: 2 },
    { patente: "", disponible: true, id: 3 },
    { patente: "", disponible: true, id: 4 },
    { patente: "", disponible: true, id: 5 },
    { patente: "", disponible: true, id: 6 },
    { patente: "", disponible: true, id: 7 },
    { patente: "", disponible: true, id: 8 },
    { patente: "", disponible: true, id: 9 },
    { patente: "", disponible: true, id: 10 }
]

const ingresarAuto = document.getElementById("ingresarAuto")
const retirarAuto = document.getElementById("retirarAuto")
const pMensaje = document.getElementById("pMensaje")
const datoPatente = document.getElementById("patente")
const izquierda = document.getElementById("izquierda")
const derecha = document.getElementById("derecha")

function guardarCocheras() {
    localStorage.setItem("cocheras", JSON.stringify(cocheras))
}

function mostrarCocheras() {
    izquierda.innerHTML = ""
    derecha.innerHTML = ""

    cocheras.forEach((cochera, i) => {
        const divCochera = `<div class="cochera ${cochera.disponible ? 'libre' : 'ocupada'}">
                        Cochera ${cochera.id} - ${cochera.disponible ? 'Libre' : cochera.patente}
                    </div>`

        if (i < capacidadEstacionamiento / 2) {
            izquierda.innerHTML += divCochera
        } else {
            derecha.innerHTML += divCochera
        }
    })
}

mostrarCocheras();

ingresarAuto.onclick = () => {
    let patente = datoPatente.value.toUpperCase()
    if (!cocheras.find(cochera => cochera.disponible)){
        pMensaje.textContent = "El estacionamiento está lleno"
    }
    else if (patente === "") {
        pMensaje.textContent = "Ingrese una patente"
    }
    else if (cocheras.some(cochera => cochera.patente === patente)) {
        pMensaje.textContent = "El vehiculo ya está estacionado"
    }
    else {
        let cocheraLibre = cocheras.find(cochera => cochera.disponible)
        cocheraLibre.patente = patente
        cocheraLibre.disponible = false
        pMensaje.textContent = "Ingrese con su vehiculo " + patente
        datoPatente.value = ""
        guardarCocheras()
        mostrarCocheras() 
    }
}
retirarAuto.onclick = () => {
    let patente = datoPatente.value.toUpperCase()
    if (datoPatente.value === "") {
        pMensaje.textContent = "Ingrese una patente"
    }
    else {
        let cocheraOcupada = cocheras.find(c => c.patente === patente);

        if (!cocheraOcupada) {
            pMensaje.textContent = "Patente no encontrada";
        }
        else {
            cocheraOcupada.patente = "";
            cocheraOcupada.disponible = true;
        pMensaje.textContent = "Vehiculo con patente " + patente + " se retira."
        datoPatente.value = ""
        guardarCocheras()
        mostrarCocheras()
        }
    }
}

// Limpiar localStorage
document.getElementById("limpiarStorage").onclick = () => {
localStorage.removeItem("cocheras") 
mostrarCocheras()
}

//Menu de inicio
// function inicio() {
//     let opcionSeleccionada
//     do {
//         opcionSeleccionada = prompt("Bienvenido al estacionamiento: \n1 - Estacionar vehiculo \n2 - Retirar vehiculo \n3 - Salir")
//         switch (opcionSeleccionada) {
//             case "1":
//                 estacionarAuto()
//                 break
//             case "2":
//                 retirarAuto()
//                 break
//             case "3":
//                 alert("Gracias por usar nuestro servicio")
//                 break
//             default:
//                 alert("Opción no válida")
//         }
//         console.log("Vehiculos estacionados: " + cocheras.join(" - "))
//     }
//     while (opcionSeleccionada !== "3")
// } console.log("Bienvenido al estacionamiento")

//Ingresar auto
// function estacionarAuto() {
//     if (cocheras.length < capacidadEstacionamiento) {
//         let patente = prompt("Ingrese la patente del vehiculo:")

//         if (cocheras.includes(patente)) {
//             alert("El vehiculo ya fue estacionado")
//         } else {
//             cocheras.push(patente)
//             alert("Ingrese al estacionamiento con su vehiculo")
//             console.log("Vehiculo con patente " + patente + " estacionado")
//         }
//     } else {
//         alert("El estacionamiento está lleno")
//     }
// }

//Retirar auto
// function retirarAuto() {
//     let retira = prompt("Ingrese la patente del vehiculo que retira:")
//     if (cocheras.includes(retira)) {
//         delete cocheras[cocheras.indexOf(retira)]
//         alert("Vehiculo con patente " + retira + " se retira.")
//         console.log("Vehiculo con patente " + retira + " retirado")
//     } else {
//         alert("Patente no encontrada")

//     }
// }

// Iniciar el simulador
// inicio()
