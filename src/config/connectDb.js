import { connect } from 'mongoose'

export const connectDb = async () => {
    try {
        console.log(`Base de datos conectada`)
        return await connect('mongodb://0.0.0.0:27017/ecommerce')
    } catch (error) {
        console.log(error)
    }
}