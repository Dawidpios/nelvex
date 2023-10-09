import mongoose from "mongoose";
const password = process.env.DB_PASSWORD;

export const connectDB = async (path:string) => {
  mongoose.set('strictQuery', false);
  const client = await mongoose.connect(`mongodb+srv://alww:${password}@nelvex.m0mewzc.mongodb.net/${path}`)
  
  if(!client) { 
    console.error("Error connecting to MongoDB:")
    return null
  }

  return client.connection;
};
