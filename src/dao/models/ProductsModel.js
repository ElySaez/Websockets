import { Schema, model } from 'mongoose'

const productsSchema = new Schema({
    title: { type: String, max: 30, required: true },
    description: { type: String, max: 100, required: true },
    category: { type: String, max: 30, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true }
});

export const ProductModel = model("products", productsSchema);