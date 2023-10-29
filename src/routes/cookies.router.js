import { Router } from 'express';

const router = Router();


router.get('/setcookies', async (req, res) => {
    res.cookie('soyUnaCookie', 'Confirmo, soy una cookie', { maxAge: 10000000000 }).send('cookie seteada')
})
router.get('/setsignedcookies', async (req, res) => {
    res.cookie('soyUnaCookie', 'Confirmo, soy una cookie', { maxAge: 10000000000, signed: true }).send('cookie seteada')

})

//archivo de texto{ coderCookie: 'esta es la info de la cookie'}

router.get('/getcookies', (req, res) => {
    console.log(req.cookies)
    res.send(req.cookies)
})
router.get('/getsignedcookies', (req, res) => {
    console.log(req.signedCookies)
    res.send(req.signedCookies)
})

router.get('/deletecookies', (req, res) => {
    res.clearCookie('soyUnaCookie').send('Cookie borrada')
})

export const cookiesRouter = router