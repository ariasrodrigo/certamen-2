import { scrypt } from 'node:crypto';
import { users }  from '../repositories/usersact.js';

// Middleware para autenticar usuarios
export function authMiddleware(req, res, next) {
    const authorizationToken = req.get('x-authorization')

	if (!authorizationToken) {
		return res.status(401).send({ error: 'Token de autorización no enviado. Recuerda usar el header X-Authorization' })
	}

	const user = users.find(user => user.token === authorizationToken)

	if (!user) {
		return res.status(401).send('Token inválido')
	}

	// Almacenar el token de autorización en el objeto de solicitud para su uso posterior
	req.token=authorizationToken;
	next()
}

// Función para verificar la contraseña
export function checkPassword(password, hash) {
	const [salt, key] = hash.split(':')

	return new Promise((resolve) => {
		scrypt(password, salt, 64, (err, derivedKey) => {
			if(err) {
				// En caso de error, se resuelve con falso
				return resolve(false) 
			}

			// Comparar la clave derivada con la clave almacenada
			resolve(derivedKey.toString('hex') === key)
		})
	})
}