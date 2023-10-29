import { Router } from 'express'
import { productsRouter } from './products.router.js'
import { indexRouter } from './index.router.js'
import { cartRouter } from './cart.router.js'

import { sessionRouter } from './session.router.js'
import { cookiesRouter } from './cookies.router.js'

const router = Router()

//lista de rutas base, se crean por modulo separado
router.use('/', indexRouter)
router.use('/products', productsRouter)
router.use('/cart', cartRouter)

router.use('/cookies', cookiesRouter)
router.use('/session', sessionRouter)

export const routerApp = router