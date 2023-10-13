import { Router } from 'express'
import { productsRouter } from './products.router.js'
import { indexRouter } from './index.router.js'
import { cartRouter } from './cart.router.js'

const router = Router()

//lista de rutas base, se crean por modulo separado
router.use('/', indexRouter)
router.use('/products', productsRouter)
router.use('/cart', cartRouter)

export const routerApp = router