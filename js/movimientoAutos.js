//hacer el ingreso del coche

// codigo con la correccion del else if anidado por switch

// ingresarAuto.onclick = () => {
//     let patente = datoPatente.value.toUpperCase()
//     let mensaje = ""

//     switch (true) {
//         case !cocheras.find(cochera => cochera.disponible):
//             mensaje = "El estacionamiento está lleno"
//             break

//         case patente === "":
//             mensaje = "Ingrese una patente"
//             break

//         case cocheras.some(cochera => cochera.patente === patente):
//             mensaje = "El vehiculo ya está estacionado"
//             break

//         default:
//             let cocheraLibre = cocheras.find(cochera => cochera.disponible)
//             cocheraLibre.patente = patente
//             cocheraLibre.disponible = false
//             mensaje = "Ingrese con su vehiculo " + patente
//             datoPatente.value = ""
//             guardarCocheras()
//             mostrarCocheras()
//             break
//     }

//     pMensaje.textContent = mensaje
// }


// funcion buscar cochera libre
function buscarCocheraLibre() {
    return cocheras.find(cochera => cochera.disponible)
}

//buscar cochera libre por tipo de vehiculo
function buscarCocheraLibrePorTipo(tipo) {
    return cocheras.find(c => c.disponible && c.tipo === tipo)
}

// tomar la hora del momento del ingreso o egreso del auto
function horaActual(){
    const hora = (new Date().getHours())*60
    const minutos = new Date().getMinutes()
    return (hora+minutos)
}

function asignarCochera(patente, tipo,horaIngreso=horaActual()) {
    const cocheraLibre = buscarCocheraLibrePorTipo(tipo)
    if (cocheraLibre) {
        cocheraLibre.patente = patente
        cocheraLibre.disponible = false
        cocheraLibre.horaIngreso = horaIngreso
        guardarCocheras()
        mostrarCocheras()
        return cocheraLibre
    }
    return null
}

// // muestraa mensajes y limpia inputs
// function mostrarMensaje(mensaje) {
//     pMensaje.textContent = mensaje
//     datoPatente.value = ""
//     tipoVehiculo.value = ""
// }

//mensajes con sweet alert
function mostrarMensaje(mensaje, tipo = "info") {
    Swal.fire({
        text: mensaje,
        icon: tipo,
        confirmButtonText: "Ok"
    });
    datoPatente.value = ""
    tipoVehiculo.value = ""
}



// Esta parte la investigue en internet para ver como sacar los espacios en blanco aunque en el html puse maximo de 7 caracteres pero con una patente vieja puede haber un espacio
//tambien a como comparar las patentes ingresadas para determirar si son del formato que existe o no

//valida el formato de las patentes
function validarPatente(patente) {
    patente = patente.trim().toUpperCase()
    const formatoViejo = /^[A-Z]{3}[0-9]{3}$/
    const formatoNuevo = /^[A-Z]{2}[0-9]{3}[A-Z]{2}$/
    if (formatoViejo.test(patente) || formatoNuevo.test(patente)) {
        return patente
    }
    return null
}


//ingresar el coche con las funciones optimizadas

ingresarAuto.onclick = () => {
    const patente = validarPatente(datoPatente.value)
    const tipo = tipoVehiculo.value

    switch (true) {
        case patente === null:
            mostrarMensaje("Ingrese una patente válida","error")
            break

        case tipo === "":
            mostrarMensaje("Seleccione un tipo de vehículo")
            break

        case cocheras.some(c => c.patente === patente):
            mostrarMensaje("El vehiculo ya está estacionado")
            break

        case !buscarCocheraLibrePorTipo(tipo):
            mostrarMensaje(`No hay cocheras disponibles para el tipo: ${tipo}`)
            break

        default:
            //aca se realiza la confirmacion de los datos ingresados
            Swal.fire({
                title: "Confirmar ingreso",
                text: `Patente: ${patente} | Tipo: ${tipo}`,
                icon: "question",
                showCancelButton: true,
                confirmButtonText: "CONFIRMAR DATOS",
                cancelButtonText: "CORREGIR DATOS"
            }).then(result => {
                if (result.isConfirmed) {
                    const cocheraLibre = asignarCochera(patente, tipo)
                    if (cocheraLibre) {
                        mostrarMensaje(
                            `Vehículo ${patente} ingresa. Estacione en la cochera N°${cocheraLibre.id} (tipo: ${tipo}).`,"success")
                        mostrarAlerta()

                    }
                }
            })
            break
    }
}


// function mostrarAlerta() {
//     Swal.fire({
//         title: "ATENCION",
//         text: "Recuerde retirar su vehículo antes de las 22:00 hrs.",
//         icon: "warning",
//         confirmButtonText: "Entendido"
//     });
// }

//hacer el retiro del coche

// codigo anterior 

// retirarAuto.onclick = () => {
//     let patente = datoPatente.value.toUpperCase()
//     if (datoPatente.value === "") {
//         pMensaje.textContent = "Ingrese una patente"
//     }
//     else {
//         let cocheraOcupada = cocheras.find(c => c.patente === patente)

//         if (!cocheraOcupada) {
//             pMensaje.textContent = "Patente no encontrada"
//         }
//         else {
//             cocheraOcupada.patente = ""
//             cocheraOcupada.disponible = true
//             pMensaje.textContent = "Vehiculo con patente " + patente + " se retira."
//             datoPatente.value = ""
//             guardarCocheras()
//             mostrarCocheras()
//         }
//     }
// }

// codigo optimizado con funciones con la misma lógica de ingresarAuto
function liberarCochera(patente) {
    const cocheraOcupada = cocheras.find(c => c.patente === patente)
    if (cocheraOcupada) {
        cocheraOcupada.patente = ""
        cocheraOcupada.disponible = true
        cocheraOcupada.horaEgreso = horaActual()
        tiempoEstacionado = Math.floor(cocheraOcupada.horaEgreso - cocheraOcupada.horaIngreso)/60
        tarifa = Math.round(tiempoEstacionado*cocheraOcupada.tarifa)
        guardarCocheras()
        mostrarCocheras()
        return {tiempoEstacionado, tarifa}
    }
    return false
}



retirarAuto.onclick = () => {
    const patente = validarPatente(datoPatente.value)

    switch (true) {
        case patente === null:
            mostrarMensaje("Ingrese una patente válida","error")
            break

        case !cocheras.some(c => c.patente === patente):
            mostrarMensaje("Patente no encontrada")
            break

        default:
            Swal.fire({
                title: "Confirmar retiro",
                text: `¿Desea retirar el vehículo con patente ${patente}?`,
                icon: "question",
                showCancelButton: true,
                confirmButtonText: "Si, RETIRAR ",
                cancelButtonText: "CORREGIR DATOS"
            }).then(result => {
                if (result.isConfirmed) {
                    if (liberarCochera(patente)) {
                        mostrarMensaje(`Vehículo con patente ${patente} se retira. Tiempo estacionado ${tiempoEstacionado*60} minutos, paga al salir $${tarifa} pesos`, "success")
                        
                    }
                }
            })
            break
    }
}
