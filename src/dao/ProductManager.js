import { ProductModel } from './models/ProductsModel.js'
import { ObjectId } from 'mongodb';

export default class ProductManager {

    constructor() {
        this.model = ProductModel;
    }


    getProducts() {
        try {
            return this.model.find({}).exec();
        } catch (error) {
            console.log("ProductManager:getProducts() error: ", error)
        }
    }

    createProduct(newProduct) {
        try {
            return this.model.create(newProduct)
        } catch (error) {
            console.log("ProductManager:createProduct() error: ", error)
        }
    }

    deleteProduct(uid) {
        console.log(uid)
        try {
            const filter = {
                '_id': new ObjectId(uid)
            };

            console.log(filter)
            return this.model.deleteOne({ _id: uid })
        } catch (error) {
            console.log("ProductManager:deleteUser() error: ", error)
        }
    }

    getProductById(uid) {
        try {
            return this.model.findOne({ _id: uid })
        } catch (error) {
            console.log("ProductManager:getProductById() error: ", error)
        }
    }

    updateUser() {

    }


}