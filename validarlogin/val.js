export function ValidarLogin(req, res, next) {
    const { username, password } = req.body;

    // Verificar si el username es una cadena no vacía
    if (typeof username !== 'string' || typeof password !== 'string' || username.trim() === '' || password.trim() === '') {
        return res.status(400).send("El nombre de usuario es requerido y debe ser una cadena no vacía.");
    }

 next();
 }

