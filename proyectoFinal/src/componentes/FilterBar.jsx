function FilterBar({ filtros, onCambiarFiltro }) {
  return (
    <section>
      <h2>Filtros y ordenación</h2>
      <div className="filtros-contenedor">

        <div className="form-grupo">
          <label>Estado</label>
          <select
            value={filtros.estado}
            onChange={e => onCambiarFiltro("estado", e.target.value)}
          >
            <option value="Todas">Todas</option>
            <option value="Pendiente">Pendiente</option>
            <option value="En Progreso">En Progreso</option>
            <option value="Completada">Completada</option>
          </select>
        </div>

        <div className="form-grupo">
          <label>Prioridad</label>
          <select
            value={filtros.prioridad}
            onChange={e => onCambiarFiltro("prioridad", e.target.value)}
          >
            <option value="Todas">Todas</option>
            <option value="Alta">Alta</option>
            <option value="Media">Media</option>
            <option value="Baja">Baja</option>
          </select>
        </div>

        <div className="form-grupo">
          <label>Ordenar por</label>
          <select
            value={filtros.orden}
            onChange={e => onCambiarFiltro("orden", e.target.value)}
          >
            <option value="reciente">Más recientes primero</option>
            <option value="antiguo">Más antiguos primero</option>
            <option value="fechaLimite">Fecha límite (próximas)</option>
            <option value="prioridadAZ">Prioridad (Alta → Baja)</option>
            <option value="prioridadZA">Prioridad (Baja → Alta)</option>
            <option value="tituloAZ">Título (A → Z)</option>
            <option value="tituloZA">Título (Z → A)</option>
          </select>
        </div>

      </div>
    </section>
  )
}

export default FilterBar
