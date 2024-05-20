//import fs from "node:fs";
import { randomUUID } from "node:crypto";
//const toDos = JSON.parse(fs.readFileSync("./toDos.json", "utf8"));
export const toDos = []

// Obtener todas las actividades
export function getActividades() {
  return toDos;
}

// Obtener una actividad por ID
export function getActividad(id) {
  return toDos.find((m) => m.id === id) ?? null;
}

// Crear una nueva actividad
export function createActividad(todo) {
  const newTodo = {
    ...todo,
    id: randomUUID(),
    CreatedAt: new Date().toISOString(),
  };
  toDos.push(newTodo);
  return newTodo;
}

// Actualizar una actividad
export function updateActividad(id, todo) {
  const actualTodo = getActividad(id);

  if (!actualTodo) {
    return null;
  }

  if (todo.Title !== undefined) {
    actualTodo.Title = todo.Title;
  }

  
  if (todo.Completed !== undefined) {
    actualTodo.Completed = todo.Completed;
  }

  actualTodo.UpdatedAt = new Date().toISOString();
  return actualTodo;
}

// Eliminar una actividad
export function deleteActividad(id) {
  const index = toDos.findIndex((m) => m.id === id);

  if (index === -1) {
    return false;
  }

  toDos.splice(index, 1);
  return true;
}
