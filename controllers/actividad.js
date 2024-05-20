import { Router } from "express";
import { authMiddleware } from "../middlewares/middlewares.js";

import {
  getActividad,
  getActividades,
  createActividad,
  updateActividad,
  deleteActividad,
} from "../repositories/actividad.js";
import {
  createActividadSchema,
  updateActividadSchema,
} from "../schemas/index.js";

const router = new Router();

// Obtener todas las actividades
router.get('/todos', authMiddleware, (req, res) => {
	const actividades = getActividades();
	res.send(actividades);
  });

// Obtener una actividad por ID
router.get('/todos/:id', authMiddleware, (req, res) => {
  const actividad = getActividad(req.params.id);

  if (!actividad) {
    return res.status(404).send({ error: 'Actividad no encontrada' });
  }

  res.send(actividad);
});

// Crear una nueva actividad
router.post("/todos", authMiddleware, async (req, res) => {
	let validatedData;
  
	try {
	  // Validar y limpiar los datos del cuerpo de la solicitud
	  validatedData = createActividadSchema.validateSync(req.body, {
		stripUnknown: true,
	  });
	} catch (error) {
	  // Enviar una respuesta de error si la validación falla
	  return res.status(400).send({ error: error.message });
	}
  
	try {
	  // Crear la actividad con los datos validados
	  const newActividad = await createActividad(validatedData);
	  // Enviar una respuesta de éxito
	  res.status(201).json(newActividad);
	} catch (error) {
	  // Manejar errores durante la creación de la actividad
	  res.status(500).json({ error: 'Error al crear la actividad', details: error.message });
	}
  });

// Actualizar una actividad
router.put("/todos/:id", authMiddleware, (req, res) => {
	const id = req.params.id;
	let validatedActividad;
  
	try {
	  validatedActividad = updateActividadSchema.validateSync(req.body, {
		stripUnknown: true,
	  });
	} catch (ex) {
	  return res.status(400).send(ex);
	}
  
	const updatedActividad = updateActividad(id, validatedActividad);
  
	if (updatedActividad) {
	  res.send(updatedActividad);
	} else {
	  res.status(404).json({ error: 'Actividad no encontrada' });
	}
  });

// Eliminar una actividad
router.delete('/todos/:id', authMiddleware, (req, res) => {
	const id = req.params.id;
  
	if (deleteActividad(id)) {
	  res.status(204).send();
	} else {
	  res.status(404).json({ error: 'Actividad no encontrada' });
	}
  });
  
  export default router;





