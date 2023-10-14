import { ProductModel } from './models/ProductsModel.js'

export default class ProductManager {

    constructor() {
        this.model = ProductModel;
    }

    getProducts(query, limit, page, sort) {
        try {
            let src = query ? { title: { $regex: query, '$options' : 'i' }  } : null;

            if ((limit === 0 || !limit)) {
                return this.model.paginate( src, { paginate: false, page: page, sort: { price: sort } })
            } else {
                return this.model.paginate( src, { limit: limit, page: page, sort: { price: sort } })
            }
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

    deleteProduct(pid) {
        try {
            return this.model.deleteOne({ _id: pid })
        } catch (error) {
            console.log("ProductManager:deleteUser() error: ", error)
        }
    }

    getProductById(pid) {
        try {
            return this.model.findOne({ _id: pid })
        } catch (error) {
            console.log("ProductManager:getProductById() error: ", error)
        }
    }


}