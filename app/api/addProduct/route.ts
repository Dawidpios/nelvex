import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "../../utilities/connectDB/connectDB";


export async function POST(req: NextRequest, res: NextResponse) {
  
  const data = await req.json()
  const db = await connectDB('app')

  if(db) {
    const productData = {...data}
    await db.collection('products').insertOne(productData)
    const product = await db.collection('products').findOne({id: productData.id})
    await db.collection('products').updateOne({id: productData.id}, {$set : {id: product?._id.toString()}})
    return NextResponse.json({message: 'Product added success'}, {status: 200})
  }
}