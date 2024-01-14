import { NextResponse, NextRequest } from "next/server";
import { connectDB } from "../../utilities/connectDB/connectDB";

export async function POST(req: NextRequest, res: NextResponse) {
  const id =  await req.json()
  const db = await connectDB('app')

  if(db) {
    const product = await db.collection('products').findOne({ id : id });
    
    if(product) {
      return NextResponse.json({...product}, {status: 200})
    }

    db.close()
    return NextResponse.json({message: "Product not found"}, {status: 200})
  }
}