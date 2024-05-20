import { setLocale } from "yup";
import { es } from "yup-locales";
import { object, string, boolean } from "yup";

setLocale(es);

export const loginSchema = object({
  username: string().required().strict(),
  password: string().required().strict(),
});

export const createActividadSchema = object({
  title: string().required().strict(),
  //completed: boolean().optional().strict(),
});

export const updateActividadSchema = object({
  //id: string().required("El ID de la actividad es obligatorio"),
  title: string().optional().strict(),
  completed: boolean().optional().strict(),
});
