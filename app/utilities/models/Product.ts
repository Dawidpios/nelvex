import mongoose from 'mongoose'

const productsSchema = new mongoose.Schema({
  id: String,
  title: String,
  price: Number,
  description: String,
  category: String,
  image: String,
  rating: {
    rate: Number,
    count: Number
  },
  stock: Number,
})


export const Products = mongoose.models.Products || mongoose.model('Products', productsSchema);