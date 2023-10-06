import { Router } from 'express'
import { productsRouter } from './products.router.js'
import { indexRouter } from './index.router.js'

const router = Router()

//lista de rutas base, se crean por modulo separado
router.use('/', indexRouter)
router.use('/products', productsRouter)

export const routerApp = router