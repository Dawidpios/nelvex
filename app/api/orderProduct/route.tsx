import { NextResponse, NextRequest } from "next/server";
import { connectDB } from "../../utilities/connectDB/connectDB";


export async function POST(req: NextRequest, res:NextResponse) {
  const body =  await req.json()
  const { userId, productId, stock} = body

  const db = await connectDB('app')

  if(db) {
    const product = await db.collection('products').findOne({ id: productId });

    if(product) {
      const isOrderAvaiable = product.stock >= stock
      if(isOrderAvaiable) {
        const newStockValue = product.stock - stock
        await db.collection('products').updateOne({ id: productId }, { $set: { stock: newStockValue }});
        const user = await db.collection('users').findOne({ id: userId })
        if(user) {
          user.cart.push({
            id: product.id,
            title: product.title,
            stock: stock,
            image: product.thumbnail
          })
          await db.collection('users').updateOne({ id: userId }, { $set: { cart: [...user.cart] }});
          return NextResponse.json({status: 200})
        }
        
      }
    }
  }
}