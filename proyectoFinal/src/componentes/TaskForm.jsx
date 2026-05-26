import { useState, useEffect } from 'react'

const tareaVacia = {
  titulo: "",
  descripcion: "",
  prioridad: "Media",
  estado: "Pendiente",
  fechaLimite: ""
}

function TaskForm({ tareaEditar, onGuardar, onCancelar }) {
  const [tarea, setTarea] = useState(tareaVacia)
  useEffect(() => {
    if (tareaEditar) {
      setTarea(tareaEditar)
    } else {
      setTarea(tareaVacia)
    }
  }, [tareaEditar])

  function handleChange(e) {
    const { name, value } = e.target
    setTarea({ ...tarea, [name]: value })
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!tarea.titulo.trim()) return
    onGuardar(tarea)
    setTarea(tareaVacia)
  }

  return (
    <section>
      <h2>{tareaEditar ? "Editar tarea" : "Nueva tarea"}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-grupo">
          <label>Título *</label>
          <input
            type="text"
            name="titulo"
            value={tarea.titulo}
            onChange={handleChange}
            maxLength={100}
            required
            placeholder="Título de la tarea"
          />
          <span className={`contador-chars ${tarea.titulo.length >= 90 ? "limite" : ""}`}>
            {tarea.titulo.length}/100
          </span>
        </div>
        <div className="form-grupo">
          <label>Descripción</label>
          <textarea
            name="descripcion"
            value={tarea.descripcion}
            onChange={handleChange}
            maxLength={500}
            placeholder="Descripción opcional..."
          />
          <span className={`contador-chars ${tarea.descripcion.length >= 480 ? "limite" : ""}`}>
            {tarea.descripcion.length}/500
          </span>
        </div>
        <div className="form-fila">
          <div className="form-grupo">
            <label>Prioridad</label>
            <select name="prioridad" value={tarea.prioridad} onChange={handleChange}>
              <option value="Alta">Alta</option>
              <option value="Media">Media</option>
              <option value="Baja">Baja</option>
            </select>
          </div>
          <div className="form-grupo">
            <label>Estado</label>
            <select name="estado" value={tarea.estado} onChange={handleChange}>
              <option value="Pendiente">Pendiente</option>
              <option value="En Progreso">En Progreso</option>
              <option value="Completada">Completada</option>
            </select>
          </div>
          <div className="form-grupo">
            <label>Fecha límite</label>
            <input
              type="date"
              name="fechaLimite"
              value={tarea.fechaLimite}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="botones-form">
          <button type="submit" className="btn-primario">
            {tareaEditar ? "Guardar cambios" : "Crear tarea"}
          </button>
          {tareaEditar && (
            <button type="button" className="btn-secundario" onClick={onCancelar}>
              Cancelar
            </button>
          )}
        </div>
      </form>
    </section>
  )
}

export default TaskForm
