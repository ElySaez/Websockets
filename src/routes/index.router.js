import { Router } from 'express'

const router = Router()

//index
router.get('/', (req, res) => {
  res.render('index')
})


export const indexRouter = router