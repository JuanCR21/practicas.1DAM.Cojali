import { useState, useEffect } from 'react'
import './App.css'
import Cabecera from './componentes/Header.jsx'
import Formulario from './componentes/TaskForm.jsx'
import Filtros from './componentes/FilterBar.jsx'
import Lista from './componentes/TaskList.jsx'

const ordenPrioridad = { "Alta": 1, "Media": 2, "Baja": 3 }

function App() {
  const [tareas, setTareas] = useState(() => {
    const guardadas = localStorage.getItem("tareas")
    return guardadas ? JSON.parse(guardadas) : []
  })

  const [tareaEditar, setTareaEditar] = useState(null)

  const [idEliminar, setIdEliminar] = useState(null)

  const [mensaje, setMensaje] = useState("")

  const [filtros, setFiltros] = useState({
    estado: "Todas",
    prioridad: "Todas",
    orden: "reciente"
  })

  useEffect(() => {
    localStorage.setItem("tareas", JSON.stringify(tareas))
  }, [tareas])

  function mostrarMensaje(texto) {
    setMensaje(texto)
    setTimeout(() => setMensaje(""), 2500)
  }

  function handleGuardar(datosTarea) {
    if (tareaEditar) {
      setTareas(tareas.map(t =>
        t.id === tareaEditar.id ? { ...datosTarea, id: tareaEditar.id } : t
      ))
      setTareaEditar(null)
      mostrarMensaje("Tarea actualizada correctamente")
    } else {
      const nueva = { ...datosTarea, id: Date.now() }
      setTareas([...tareas, nueva])
      mostrarMensaje("Tarea creada correctamente")
    }
  }

  function handleEditar(tarea) {
    setTareaEditar(tarea)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  function handleCancelar() {
    setTareaEditar(null)
  }

  function handlePedirEliminar(id) {
    setIdEliminar(id)
  }

  function handleConfirmarEliminar() {
    setTareas(tareas.filter(t => t.id !== idEliminar))
    setIdEliminar(null)
    mostrarMensaje("Tarea eliminada")
  }

  function handleCancelarEliminar() {
    setIdEliminar(null)
  }

  function handleCompletar(id) {
    setTareas(tareas.map(t =>
      t.id === id ? { ...t, estado: "Completada" } : t
    ))
    mostrarMensaje("Tarea marcada como completada")
  }

  function handleCambiarFiltro(clave, valor) {
    setFiltros({ ...filtros, [clave]: valor })
  }

  function getTareasFiltradas() {
    let resultado = [...tareas]
    if (filtros.estado !== "Todas") {
      resultado = resultado.filter(t => t.estado === filtros.estado)
    }
    if (filtros.prioridad !== "Todas") {
      resultado = resultado.filter(t => t.prioridad === filtros.prioridad)
    }
    resultado.sort((a, b) => {
      switch (filtros.orden) {
        case "reciente":
          return b.id - a.id
        case "antiguo":
          return a.id - b.id
        case "fechaLimite":
          if (!a.fechaLimite) return 1
          if (!b.fechaLimite) return -1
          return a.fechaLimite.localeCompare(b.fechaLimite)
        case "prioridadAZ":
          return ordenPrioridad[a.prioridad] - ordenPrioridad[b.prioridad]
        case "prioridadZA":
          return ordenPrioridad[b.prioridad] - ordenPrioridad[a.prioridad]
        case "tituloAZ":
          return a.titulo.localeCompare(b.titulo)
        case "tituloZA":
          return b.titulo.localeCompare(a.titulo)
        default:
          return 0
      }
    })

    return resultado
  }

  return (
    <>
      <Cabecera />
      <main>
        <Formulario
          tareaEditar={tareaEditar}
          onGuardar={handleGuardar}
          onCancelar={handleCancelar}
        />
        <Filtros filtros={filtros} onCambiarFiltro={handleCambiarFiltro} />
        <Lista
          tareas={getTareasFiltradas()}
          onEditar={handleEditar}
          onEliminar={handlePedirEliminar}
          onCompletar={handleCompletar}
        />
      </main>
      <footer>
        <p>&copy; 2026 Gestor de Tareas</p>
      </footer>
      {idEliminar && (
        <div className="modal-fondo">
          <div className="modal">
            <h3>¿Eliminar tarea?</h3>
            <p>Esta acción no se puede deshacer.</p>
            <div className="modal-botones">
              <button className="btn-peligro" onClick={handleConfirmarEliminar}>
                Sí, eliminar
              </button>
              <button className="btn-secundario" onClick={handleCancelarEliminar}>
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
      {mensaje && (
        <div className="mensaje">{mensaje}</div>
      )}
    </>
  )
}

export default App
