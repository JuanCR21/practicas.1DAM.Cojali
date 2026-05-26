import Datos from './TaskCard.jsx'

function TaskList({ tareas, onEditar, onEliminar, onCompletar }) {
  return (
    <section>
      <h2>Tareas</h2>
      <p className="contador-tareas">Total: {tareas.length} tarea{tareas.length !== 1 ? "s" : ""}</p>
      {tareas.length === 0 ? (
        <p className="no-tareas">No hay tareas que mostrar.</p>
      ) : (
        tareas.map(tarea => (
          <Datos
            key={tarea.id}
            tarea={tarea}
            onEditar={onEditar}
            onEliminar={onEliminar}
            onCompletar={onCompletar}
          />
        ))
      )}
    </section>
  )
}

export default TaskList
