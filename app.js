import express from 'express'
import ActividadController from "./controllers/actividad.js";
import UsersactController from "./controllers/usersact.js";
import { scrypt, randomBytes, randomUUID } from 'node:crypto'

//export const todos = []

const app = express()

app.use(express.json())
app.use(express.static('public'))

app.use("/api", ActividadController);
app.use("/api", UsersactController);

app.get('/api', (req, res) => {
    res.type('text/plain')
    res.send('Hello World!')
})



// ... hasta aquí

export default app