import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  login: String,
  password: String,
  email: String,
  name: String,
  surname: String,
  cart: [],
  id: String,
  history: [],
  image: String
})


export const User = mongoose.models.User || mongoose.model('User', userSchema);