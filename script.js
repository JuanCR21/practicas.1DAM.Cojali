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

const estudios = [];
const div = document.getElementById("div-estudios");
function agregarEstudio() {
    const tituloo = document.getElementById("titulo").value;
    const descripcionn = document.getElementById("descripcion").value;
    const nuevoEstudio = {
        titulo: tituloo,
        descripcion: descripcionn
    }
    estudios.push(nuevoEstudio);
    mostrarEstudio();
    document.getElementById("titulo").value = "";
    document.getElementById("descripcion").value = "";
}
function mostrarEstudio() {
    div.innerHTML = "";
    estudios.forEach(estudio => {
        var artic = document.createElement("article");
        artic.classList.add("estu");
        artic.innerHTML = `
                                <h3>${estudio.titulo}</h3>
                                <p>${estudio.descripcion}</p>
                            `;
        div.appendChild(artic);
    });
}