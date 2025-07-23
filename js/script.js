// Simulador de estacionamiento
const capacidadEstacionamiento = 5
let cocheras = []

//Menu de inicio
function inicio() {
    let opcionSeleccionada
    do {
        opcionSeleccionada = prompt("Bienvenido al estacionamiento: \n1 - Estacionar vehiculo \n2 - Retirar vehiculo \n3 - Salir")
        switch (opcionSeleccionada) {
            case "1":
                estacionarAuto()
                break
            case "2":
                retirarAuto()
                break
            case "3":
                alert("Gracias por usar nuestro servicio")
                break
            default:
                alert("Opción no válida")
        }
        console.log("Vehiculos estacionados: " + cocheras.join(" - "))
    }
    while (opcionSeleccionada !== "3")
} console.log("Bienvenido al estacionamiento")

//Ingresar auto
function estacionarAuto() {
    if (cocheras.length < capacidadEstacionamiento) {
        let patente = prompt("Ingrese la patente del vehiculo:")

        if (cocheras.includes(patente)) {
            alert("El vehiculo ya fue estacionado")
        } else {
            cocheras.push(patente)
            alert("Ingrese al estacionamiento con su vehiculo")
            console.log("Vehiculo con patente " + patente + " estacionado")
        }
    } else {
        alert("El estacionamiento está lleno")
    }
}

//Retirar auto
function retirarAuto() {
    let retira = prompt("Ingrese la patente del vehiculo que retira:")
    if (cocheras.includes(retira)) {
        delete cocheras[cocheras.indexOf(retira)]
        alert("Vehiculo con patente " + retira + " se retira.")
        console.log("Vehiculo con patente " + retira + " retirado")
    } else {
        alert("Patente no encontrada")

    }
}

// Iniciar el simulador
inicio()