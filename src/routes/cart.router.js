import { Router } from 'express';
import CartManager from '../dao/CartManager.js';
import ProductManager from '../dao/ProductManager.js'
import { LocalStorage } from 'node-localstorage';

const router = Router();
const cartManager = new CartManager();
const productManager = new ProductManager();
const localStorage = new LocalStorage('./scratch');

router.get('/', async (req, res) => {
    const cart = cartManager.getCarts();
    res.send('cart', cart)

})

router.post('/', async (req, res) => {
    try {

        let prodToCart;

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
            prodToCart = await cartManager.updateCart(cartProds._id, product);
            cartProds = await cartManager.getCartById(cid);
        } else {
            console.log("se actualiza producto")
            prodToCart = await cartManager.updateQuantity(cartProds._id, result._id, (parseInt(result.quantity) + parseInt(quantity)))
        }

        res.send({ 'cart': prodToCart })

    } catch (error) {
        console.log(error)
    }

})

router.get('/:cid', async () => {
    const cart = cartManager.getCartById()
    res.send('cart', cart)
})

router.put('/:cid/products/:pid', () => {
    const cart = cartManager.updateQuantity()
    res.send('cart', cart)
})

router.delete('/:cid/products/:pid', () => {
    const cart = cartManager.deleteProductFromCart()
    res.send('cart', cart)
})


export const cartRouter = router