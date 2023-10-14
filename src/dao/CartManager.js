import { CartModel } from "./models/Cartmodel.js";

export default class CartManager {

    constructor() {
        this.model = CartModel;
    }

    getCarts(limit) {
        if (limit === 0 || !limit) {
            return this.model.find({})
        } else {
            return this.model.find({}).limit(limit)
        }
    }

    async getCartById(id) {
        return await this.model.findById(id).populate('products.product')
    }


    async createCart(cart) {
        return await this.model.create(cart)
    }

    async updateCart(cid, product) {
        try {
            return await this.model.findByIdAndUpdate({ _id: cid },
                { $push: { products: product } },
                { new: true, useFindAndModify: false }).populate('products.product')

        } catch (error) {
            console.log(error)
        }
    }

    async updateQuantity(cid, pid, quantity) {
        try {
            return await this.model.findOneAndUpdate(
                {
                    _id: cid,
                    products: { $elemMatch: { _id: pid } }
                },
                {
                    $set: { "products.$.quantity": quantity }
                }, { new: true, safe: true, upsert: true }).populate('products.product')
        } catch (error) {
            console.log(error)
        }
    }

    async deleteProductFromCart(cid, pid) {
        console.log('deleteProductFromCart', cid, pid)
        try {
            return await this.model.findByIdAndUpdate({ _id: cid },
                { $pull: { products: { _id: pid } } },
                { new: true, useFindAndModify: false }).populate('products.product')
        } catch (error) {
            console.log(error)
        }

    }

    async emptyCart(cid) {
        try {
            return await this.model.findByIdAndUpdate({ _id: cid },
                { $set: { products: [] } })
        } catch (error) {
            console.log(error)
        }

    }
}