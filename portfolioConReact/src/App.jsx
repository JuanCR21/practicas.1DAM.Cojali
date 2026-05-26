import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [modoOscuro, setModoOscuro] = useState(
    localStorage.getItem("modo") == "oscuro"
  )

  const [estudios, setEstudios] = useState([
    {
      titulo: "Bachillerato (modalidad Ciencias y Tecnología)",
      descripcion: "2023 - 2025. IES Peñalba (Moral de Calatrava)"
    },
    {
      titulo: "Ciclo Formativo de Grado Superior de DAM",
      descripcion: "2025 - Actualidad. IES Gregorio Prieto (Valdepeñas)"
    }
  ])
  const [tituloEstudio, setTituloEstudio] = useState("")
  const [descEstudio, setDescEstudio] = useState("")

  const [usuario, setUsuario] = useState("JuanCR21")
  const [perfil, setPerfil] = useState(null)
  const [repos, setRepos] = useState([])

  useEffect(() => {
    document.body.className = modoOscuro ? "oscuro" : ""
    localStorage.setItem("modo", modoOscuro ? "oscuro" : "claro")
  }, [modoOscuro])

  useEffect(() => {
    buscarGitHub()
  }, [])

  function agregarEstudio() {
    if (tituloEstudio && descEstudio) {
      setEstudios([...estudios, { titulo: tituloEstudio, descripcion: descEstudio }])
      setTituloEstudio("")
      setDescEstudio("")
    }
  }

  function buscarGitHub() {
    fetch(`https://api.github.com/users/${usuario}`)
      .then(r => r.json())
      .then(datos => setPerfil(datos))

    fetch(`https://api.github.com/users/${usuario}/repos`)
      .then(r => r.json())
      .then(datos => setRepos(datos))
  }

  return (
    <>
      <header>
        <h1>Juan Chicharro Ruiz</h1>
        <p>Estudiante de DAM</p>
        <button id="tema" onClick={() => setModoOscuro(!modoOscuro)}>Cambiar tema</button>
      </header>

      <nav>
        <ul>
          <li><a href="#sobre-mi">Sobre mí</a></li>
          <li><a href="#hobbies">Hobbies</a></li>
          <li><a href="#habilidades">Habilidades</a></li>
          <li><a href="#proyectos">Proyectos futuros</a></li>
          <li><a href="#estudios">Estudios</a></li>
          <li><a href="#contacto">Contacto</a></li>
          <li><a href="#github">GitHub</a></li>
          <li><a href="preguntas&sugerencias.html">Enlace al formulario</a></li>
        </ul>
      </nav>

      <main>
        <section id="sobre-mi">
          <article>
            <h2>Sobre mí</h2>
            <p>Hola, me llamo Juan y soy estudiante de 1º DAM.</p>
            <p>Me interesa el desarrollo de software y aprender nuevas tecnologías.</p>
            <p>Estoy motivado con mi primer periodo de formación en empresa y con muchas ganas de observar cómo se trabaja en un entorno real y aprender de ello.</p>
          </article>
          <aside>
            <img src="/miFoto.jpg" alt="Foto personal" width="200" />
          </aside>
        </section>

        <section id="hobbies">
          <h2>Hobbies</h2>
          <ul>
            <li>Jugar videojuegos</li>
            <li>Correr carreras</li>
            <li>Escuchar música</li>
          </ul>
        </section>

        <section id="habilidades">
          <h2>Habilidades</h2>
          <ul>
            <li>HTML5, CSS y JavaScript</li>
            <li>Java y Python</li>
            <li>SQL y MySQL</li>
            <li>Git</li>
            <li>GitHub</li>
            <li>Trabajo en equipo</li>
          </ul>
        </section>

        <section id="proyectos">
          <h2>Proyectos futuros</h2>
          <div className="proyectos">
            <article className="proy">
              <h3>Aplicación móvil propia</h3>
              <p>Me gustaría desarrollar una aplicación y que la gente pudiera usarla a diario</p>
            </article>
            <article className="proy">
              <h3>Página web personal</h3>
              <p>Quiero crear una página web que sirva como portfolio personal a modo de CV</p>
            </article>
            <article className="proy">
              <h3>Bot para automatización</h3>
              <p>Me interesa crear un bot que pueda automatizar tareas en diferentes aplicaciones</p>
            </article>
          </div>
        </section>

        <section id="estudios">
          <h2>Añadir estudios</h2>
          <div>
            <label>Título: </label>
            <input type="text" value={tituloEstudio} onChange={e => setTituloEstudio(e.target.value)} /><br /><br />
            <label>Descripción: </label>
            <textarea value={descEstudio} onChange={e => setDescEstudio(e.target.value)} /><br /><br />
            <button type="button" onClick={agregarEstudio}>Añadir estudio</button><br /><br />
          </div>
          <div className="estudios" id="div-estudios">
            {estudios.map((estudio, i) => (
              <article className="estu" key={i}>
                <h3>{estudio.titulo}</h3>
                <p>{estudio.descripcion}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="contacto">
          <h2>Contacto</h2>
          <p>Enlace a <a href="https://github.com/JuanCR21" target="_blank">mi GitHub</a></p>
          <p>Email: <a href="mailto:juanchicharro2007@gmail.com">juanchicharro2007@gmail.com</a></p>
        </section>

        <section id="github">
          <h2>GitHub</h2>
          <input type="text" value={usuario} onChange={e => setUsuario(e.target.value)} placeholder="Usuario de GitHub" />
          <button onClick={buscarGitHub}>Buscar</button><br /><br />
          {perfil && (
            <div id="perfil">
              <article className="perfil-github">
                <img src={perfil.avatar_url} alt="avatar" />
                <h3>{perfil.login}</h3>
                <p>{perfil.bio || "Sin biografía"}</p>
              </article>
            </div>
          )}
          <br />
          <div id="repositorios">
            {repos.map((repo, i) => (
              <article className="repo" key={i}>
                <h3>{repo.name}</h3>
                <p>{repo.description || "Sin descripción"}</p>
                <a href={repo.html_url} target="_blank">Visitar repositorio</a>
              </article>
            ))}
          </div>
        </section>
      </main>

      <footer>
        <p>&copy; 2026 Juan Chicharro</p>
        <p>
          <a href="#">GitHub</a> |
          <a href="#">LinkedIn</a> |
          <a href="#">Twitter</a> |
          <a href="#">YouTube</a> |
          <a href="#">Instagram</a>
        </p>
      </footer>
    </>
  )
}

export default App