import mongoose from 'mongoose'

const cartSchema = new mongoose.Schema({
  products: [
    {
      product: {
        type: String,
        ref: 'products'
      },
      quantity: Number,
    }
  ]
}, {versionKey: false})

cartSchema.pre('find', function() {
  this.populate('products.product')
})

export const CartModel = mongoose.model("carts", cartSchema)
