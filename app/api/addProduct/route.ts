import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "../../utilities/connectDB/connectDB";
import { Products } from "../../utilities/models/Product";

export async function POST(req: NextRequest, res: NextResponse) {
  
  const data = await req.json()
  const db = await connectDB('app')

  if(db) {
    const productData = {...data}
    const product = await Products.create(productData)
    product.id = product._id.toString()
    await product.save()
   
    return NextResponse.json({message: 'Product added success'}, {status: 200})
  }
}