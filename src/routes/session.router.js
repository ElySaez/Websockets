import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
    if (req.session.counter) {
        req.session.counter++
        res.send(`se ha visitado el sitio ${req.session.counter} veces`)
    } else {
        req.session.counter = 1
        res.send('<h1>Bienvenidos</h1>')
    }
})

router.post('/login', (req, res) => {
    const { email, password } = req.body
    //validando como si estuviesemos buscando en bd
    if (email != 'admin@gmail.com' || password != 'admin123') {
        return res.send('login fallido')
    }
    req.session.user = email
    req.session.admin = true
    res.send('login success')
})

router.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) res.send({ status: 'logout error', error: err })
        res.send('logout exitoso')
    })
})

export const sessionRouter = router