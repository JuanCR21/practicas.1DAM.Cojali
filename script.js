const boton = document.getElementById("tema");
if (boton != null) {
    boton.addEventListener("click", () =>{
        document.body.classList.toggle("oscuro");
        if (document.body.classList.contains("oscuro")){
            localStorage.setItem("modo", "oscuro");
        } else {
            localStorage.setItem("modo", "claro");
        }
    });
}
if (localStorage.getItem("modo") == "oscuro"){
    document.body.classList.add("oscuro");
}