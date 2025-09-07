// // Limpiar localStorage
// document.getElementById("limpiarStorage").onclick = () => {
//     localStorage.removeItem("cocheras")
//     inicializarCocheras()
//     setTimeout(mostrarCocheras, 200)
// }

// limpiar storage con password --- password: admin123
document.getElementById("limpiarStorage").onclick = () => {
    Swal.fire({
        title: "Llame a un administrador",
        input: "password",
        inputLabel: "contraseña del admin para limpiar el estacionamiento",
        inputPlaceholder: "Contraseña",
        showCancelButton: true,
        confirmButtonText: "Eliminar",
        cancelButtonText: "Cancelar"
    }).then(result => {
        if (result.isConfirmed) {
            const password = result.value
            const clave = "admin123"
            if (password === clave) {
                localStorage.removeItem("cocheras")
                inicializarCocheras()
                setTimeout(mostrarCocheras, 200)
                Swal.fire({
                    icon: "success",
                    text: "Estacionamiento reiniciado correctamente"
                })
            } else {
                Swal.fire({
                    icon: "error",
                    text: "Contraseña incorrecta, no se borra nada"
                })
            }
        }
    })
}
