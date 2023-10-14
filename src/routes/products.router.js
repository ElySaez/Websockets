import { Router } from 'express'
import ProductManager from '../dao/ProductManager.js'

const router = Router()
const productManager = new ProductManager()

//lista de rutas de productos
router.get('/', async (req, res) => {
  res.render('products')
})

router.get('/all', async (req, res) => {
  try {
    // Se valida los paramtros del paginador, sino llegaran a existir se definen unos por defecto
    let query = req.query.query === "undefined" || null ? '' : req.query.query;
    let limit = req.query.limit === "undefined" || null ? 10 : req.query.limit;
    let qpage = req.query.page === "undefined" || null ? 1 : req.query.page;
    let sort = req.query.sort === "undefined" || null ? 'desc' : req.query.sort;

    let {
      docs,
      hasPrevPage,
      hasNextPage,
      prevPage,
      nextPage,
      page
    } = await productManager.getProducts(query, limit, qpage, sort);

    res.send({
      status: true,
      payload: docs,
      hasPrevPage,
      hasNextPage,
      prevPage,
      nextPage,
      page
    })
  } catch (error) {
    console.log(error)
  }


})

router.post('/new', async (req, res) => {
  try {
    const newUser = req.body

    let result = await productManager.createProduct(newUser)
    res.send({
      status: true,
      payload: result
    })
  } catch (error) {
    console.log(error)
  }
})

router.delete('/:pid', async (req, res) => {
  try {
    let {pid} = req.params;
    let result = await productManager.deleteProduct(pid)
    res.send({
      status: true,
      payload: result
    })
  } catch (error) {
    console.log(error)
  }
})


export const productsRouter = router