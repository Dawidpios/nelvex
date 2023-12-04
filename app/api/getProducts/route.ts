import { NextResponse, NextRequest } from "next/server";
import { connectDB } from "../../utilities/connectDB/connectDB";

export async function GET(req: NextRequest, res: NextResponse) {

  const db = await connectDB('app')

  if(db) {
    const products = await db.collection('products').find({}).toArray() 
    if(products.length > 0) {
      return NextResponse.json([...products], {status: 200})
    }

    db.close()
    return NextResponse.json({message: "Products not found"}, {status: 200})
  }
}