import express from "express"
import handlebars from 'express-handlebars'
import Handlebars from 'handlebars'
import { allowInsecurePrototypeAccess } from '@handlebars/allow-prototype-access'

import { fileURLToPath } from 'url'
import { dirname } from 'path'
import path from 'path'

import { connectDb } from './src/config/connectDb.js'
import { routerApp } from './src/routes/index.js'

const app = express()
const PORT = 8080;

//handlebars path view config
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

connectDb()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.engine('hbs', handlebars.engine({
  extname: 'hbs',
  defaultLayout: 'main',
  handlebars: allowInsecurePrototypeAccess(Handlebars)
}))
app.set('view engine', 'hbs')
app.set('views', __dirname + '/src/views/')
app.use(express.static(path.join(__dirname, '/src/public')));

app.use(routerApp)

app.listen(PORT, () => {
  console.log(`Server listen on port ${PORT}`)
})