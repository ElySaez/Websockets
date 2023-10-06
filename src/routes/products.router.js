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
    let prods = []
    const response = await productManager.getProducts();

    response.forEach(e => {
      let item = {
        "id": e._id,
        "title": e.title,
        "description": e.description,
        "category": e.category,
        "price": e.price,
        "stock": e.stock
      }
      prods.push(item);
    })

    res.send({
      status: true,
      payload: prods
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

router.delete('/:id', async (req, res) => {
  try {
    let { id } = req.params;
    console.log(id)
    let result = await productManager.deleteProduct(id)
    res.send({
      status: true,
      payload: result
    })
  } catch (error) {
    console.log(error)
  }
})


export const productsRouter = router