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

const estudios = [
    {
        titulo: "Bachillerato (modalidad Ciencias y Tecnología)",
        descripcion: "2023 - 2025. IES Peñalba (Moral de Calatrava)"
    },
    {
        titulo: "Ciclo Formativo de Grado Superior de DAM",
        descripcion: "2025 - Actualidad. IES Gregorio Prieto (Valdepeñas)"
    }
];
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

const perfil = document.getElementById("perfil");
const repositorios = document.getElementById("repositorios");
function buscarGitHub() {
    const usuario = document.getElementById("usuario").value;
    perfil.innerHTML = "<p>Cargando perfil...</p>";
    repositorios.innerHTML = "<p>Cargando repositorios...</p>";
    fetch(`https://api.github.com/users/${usuario}`)
        .then(respuesta => respuesta.json())
        .then(datos => {
            perfil.innerHTML = `
                                    <article class="perfil-github">
                                        <img src="${datos.avatar_url}">
                                        <h3>${datos.login}</h3>
                                        <p>${datos.bio ? datos.bio : "Sin biografía"}</p>
                                    </article>
                                `;
        });
    fetch(`https://api.github.com/users/${usuario}/repos`)
        .then(respuesta => respuesta.json())
        .then(datos => {
            repositorios.innerHTML = "";
            datos.forEach(repositorio => {
                var artic = document.createElement("article");
                artic.classList.add("repo");
                artic.innerHTML = `
                                        <h3>${repositorio.name}</h3>
                                        <p>${repositorio.description ? repositorio.description : "Sin descripción"}</p>
                                        <a href="${repositorio.html_url}" target="_blank">Visitar repositorio</a>
                                    `;
                repositorios.appendChild(artic);
            });
        });
}
buscarGitHub();