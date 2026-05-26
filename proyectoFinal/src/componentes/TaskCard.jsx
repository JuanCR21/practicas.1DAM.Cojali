function TaskCard({ tarea, onEditar, onEliminar, onCompletar }) {
  function estaVencida() {
    if (!tarea.fechaLimite || tarea.estado === "Completada") return false
    const hoy = new Date()
    hoy.setHours(0, 0, 0, 0)
    const limite = new Date(tarea.fechaLimite + "T00:00:00")
    return limite < hoy
  }

  function clasePrioridad() {
    if (tarea.prioridad === "Alta") return "badge prioridad-alta"
    if (tarea.prioridad === "Media") return "badge prioridad-media"
    return "badge prioridad-baja"
  }

  function claseEstado() {
    if (tarea.estado === "Pendiente") return "badge estado-pendiente"
    if (tarea.estado === "En Progreso") return "badge estado-en-progreso"
    return "badge estado-completada"
  }

  function formatearFecha(fecha) {
    if (!fecha) return null
    const [anio, mes, dia] = fecha.split("-")
    return `${dia}/${mes}/${anio}`
  }

  return (
    <article className={`tarjeta ${tarea.estado === "Completada" ? "completada" : ""}`}>
      <div className="tarjeta-cabecera">
        <span className="tarjeta-titulo">{tarea.titulo}</span>
      </div>
      {tarea.descripcion && (
        <p className="tarjeta-descripcion">{tarea.descripcion}</p>
      )}
      <div className="tarjeta-meta">
        <span className={clasePrioridad()}>{tarea.prioridad}</span>
        <span className={claseEstado()}>{tarea.estado}</span>
        {tarea.fechaLimite && (
          <span className={`tarjeta-fecha ${estaVencida() ? "vencida" : ""}`}>
            {estaVencida() ? "⚠️ " : ""}
            {formatearFecha(tarea.fechaLimite)}
          </span>
        )}
      </div>
      <div className="tarjeta-acciones">
        {tarea.estado !== "Completada" && (
          <button className="btn-verde" onClick={() => onCompletar(tarea.id)}>
            Completar
          </button>
        )}
        <button className="btn-secundario" onClick={() => onEditar(tarea)}>
          Editar
        </button>
        <button className="btn-peligro" onClick={() => onEliminar(tarea.id)}>
          Eliminar
        </button>
      </div>
    </article>
  )
}

export default TaskCard
