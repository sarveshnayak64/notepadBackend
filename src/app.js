import express from 'express'
import cors from 'cors';
import authRoutes from './auth/auth.route.js';
import notesRoutes from './notes/notes.route.js';
import permissionsRoutes from './permissions/permissions.route.js';
import { verifyToken } from './auth/auth.service.js';


const app = express()

app.use(cors())

app.use(express.json())

const PORT = process.env.PORT || 5000

app.use('/',authRoutes)
app.use('/',notesRoutes)
app.use('/',permissionsRoutes)


app.get('/notes', verifyToken, (req, res) => {
    console.log(req)
    res.json({ "red": "yellow" })
})


app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something went wrong!')
})


app.listen(PORT, () => {
    console.log('Running on port ' + PORT)
})