import { Router } from 'express';
import CartManager from '../dao/CartManager.js';
import { LocalStorage } from 'node-localstorage';

const router = Router();
const cartManager = new CartManager();
const localStorage = new LocalStorage('./scratch');

//por ahora no se usa
router.get('/', async (req, res) => {
    const cart = cartManager.getCarts();
    res.send({ 'cart': cart })
})

// revisa si existe un carrito previo en el localStorage
router.get('/checkCart', async (req, res) => {

    try {
        let cart;
        let cid = localStorage.getItem('cid');

        if (cid === null) {
            cart = null;
        } else {
            cart = await cartManager.getCartById(cid);
        }

        res.send({ 'cart': cart })
    } catch (error) {
        console.log(error)
    }

})

// agrega un producto al carrito
router.post('/', async (req, res) => {
    try {
        let cart;
        // Se valida si existe un carrito en localStorage, si no existe se crea uno nuevo
        let cid = localStorage.getItem('cid');
        if (cid === null) {
            console.log("se crea nuevo carrito")
            let newCart = await cartManager.createCart();
            localStorage.setItem('cid', newCart._id);
            cid = newCart._id;
        }

        // se obtienen los parametros de id de productos y cantidad
        const { quantity, pid } = req.body;
        const product = { product: pid, quantity: quantity }

        // se obtiene carrito y se busca si el producto existe o no
        let cartProds = await cartManager.getCartById(cid);
        const result = cartProds.products.find(function (e) {
            return e.product._id == pid;
        });

        // si el producto no existe se agrega, de lo contratio solo se actualiza la cantidad del producto
        if (result === undefined) {
            console.log("se agrega producto nuevo")
            cart = await cartManager.updateCart(cartProds._id, product);
            cartProds = await cartManager.getCartById(cid);
        } else {
            console.log("se actualiza producto")
            cart = await cartManager.updateQuantity(cartProds._id, result._id, (parseInt(result.quantity) + parseInt(quantity)))
        }

        res.send({ 'cart': cart })
    } catch (error) {
        console.log(error)
    }

})

//obtiene un carrito y sus productos por cid
router.get('/:cid', async (req, res) => {

    try {
        let cart;
        let { cid } = req.params;
        // Se valida si existe un carrito en localStorage, sino retorna null
        let scid = localStorage.getItem('cid');

        if (scid === cid) {
            cart = await cartManager.getCartById(cid)
        } else {
            cart = null;
        }

        res.send({ 'cart': cart })

    } catch (error) {
        console.log(error)
    }

})

// quita un producto del carrito
router.delete('/:cid/products/:pid', async (req, res) => {

    try {
        let { cid, pid } = req.params;
        const cart = await cartManager.deleteProductFromCart(cid, pid)

        res.send({ 'cart': cart })

    } catch (error) {
        console.log(error)
    }

})

// quita todos los productos del carrito
router.delete('/:cid/products', async (req, res) => {

    try {
        let { cid } = req.params;
        const cart = await cartManager.emptyCart(cid)

        res.send({ 'cart': cart })
    } catch (error) {
        console.log(error)
    }

})


router.put('/:cid/products/:pid', async (req, res) => {
    try {
        let { cid, pid } = req.params;
        const quantity = req.body
        const cart = await cartManager.updateQuantity(cid, pid, quantity.quantity)
        res.send({ 'cart': cart })
    } catch (error) {
        console.log(error)
    }
   
})




export const cartRouter = router