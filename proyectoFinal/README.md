# Gestor de Tareas por Juan Chicharro Ruiz

Aplicación web de gestión de tareas desarrollada con React y Vite como proyecto final del módulo de DAM.

## Tecnologías usadas

- **Vite** - Herramienta de construcción
- **React 18** - Framework de interfaz de usuario
- **CSS puro** - Estilos sin librerías externas
- **localStorage** - Persistencia de datos en el navegador

## Funcionalidades

- Crear, editar y eliminar tareas
- Cada tarea tiene título, descripción, prioridad, estado y fecha límite
- Filtrar tareas por estado y por prioridad
- Ordenar tareas por fecha de creación, fecha límite, prioridad o título
- Los datos se guardan automáticamente en el navegador
- Confirmación antes de eliminar tareas
- Diseño responsive para móvil, tablet y escritorio

## Poner en marcha el proyecto

### Requisitos previos

- Node.js instalado (versión 18 o superior)

### Pasos

```bash
# 1. Entramos en la carpeta del proyecto (desde la carpeta raíz)
cd ./proyectoFinal

# 2. Instalamos las dependencias
npm i

# 3. Arrancamos el servidor de desarrollo
npm run dev
```

Luego lo abrimos en el navegador con `http://localhost:5173` o pulsando la tecla `o` y `enter` desde donde arrancó el servidor

## Estructura de archivos

```
src/
├── componentes/
│   ├── Header.jsx       # Cabecera de la aplicación
│   ├── TaskForm.jsx     # Formulario para crear y editar tareas
│   ├── FilterBar.jsx    # Controles de filtrado y ordenación
│   ├── TaskList.jsx     # Contenedor de la lista de tareas
│   └── TaskCard.jsx     # Tarjeta individual de cada tarea
├── App.jsx              # Componente principal con toda la lógica
├── App.css              # Estilos de la aplicación
├── main.jsx             # Punto de entrada
...
```
