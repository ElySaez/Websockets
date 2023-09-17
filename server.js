import express from 'express'
import handlebars from 'express-handlebars'
import ProductManager from './src/ProductManager.js'
import homeRouter from './src/routes/home.routes.js'
import __dirname from './utils.js'

import { Server } from 'socket.io'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
const PORT = 8080;

const httpServer = app.listen(PORT, () => console.log(`Listening on port ${PORT}`))
const io = new Server(httpServer)

app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/src/views/')
app.set('view engine', 'handlebars')
app.use(express.static(__dirname + './public'))
app.use('/', homeRouter)

app.get('/realtimeproducts', (req, res) => {
  res.render('realTimeProducts')
})

let record = ProductManager.getProducts()


io.on('connection', (socket) => {
  console.log("The socket id is", socket.id)  
  socket.emit("arrProd", record)

  socket.on("add", (data) => {
    ProductManager.addProduct(data)
    io.emit("arrProd", record)
    console.log("A new product has been added")
  })

  socket.on("deleteProd", id => {
    ProductManager.deleteProd(id)
    io.emit("arrProd", record)
    console.log("A product has been removed")
  })

})