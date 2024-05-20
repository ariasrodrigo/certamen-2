import { Router } from "express";
import {authMiddleware} from '../middlewares/middlewares.js'
//import { ValidarLogin } from "../validarlogin/val.js"
import {login,logout} from '../repositories/usersact.js'
import { loginSchema } from "../schemas/index.js"
import { randomBytes } from "node:crypto";

const router = Router();

// Ruta para iniciar sesión
router.post('/login', async (req, res) => {
    
    try {
        // Validar las credenciales del usuario
        let credentials = loginSchema.validateSync(req.body, {stripUnknown: true});

        console.log(credentials)

        let user = await login(credentials.username, credentials.password);
        console.log(user)

        res.send(user);

    } catch(ex) {
        res.status(401).send();
    }
})

// Ruta para cerrar sesión
router.post('/logout', authMiddleware, (req, res) => {
    // Realizar el proceso de cierre de sesión utilizando el token proporcionado en el middleware
    logout(req.token);

    // Enviar una respuesta con código 204 (Sin contenido) para indicar que la operación fue exitosa
    res.status(204).send();
  });

export default router;