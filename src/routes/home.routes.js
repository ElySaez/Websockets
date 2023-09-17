import { Router } from 'express'
import express from 'express'
import ProductManager from '../ProductManager.js'

const router = express.Router()
let loaded = ProductManager.getProducts()



router.get('/', (req, res) => {
  res.render('home', {loaded})
})





export default router;