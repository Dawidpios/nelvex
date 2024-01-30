import { NextResponse, NextRequest } from "next/server";
import { connectDB } from "../../utilities/connectDB/connectDB";
import { Products } from "../../utilities/models/Product";

export async function POST(req: NextRequest, res: NextResponse) {
  const id =  await req.json()
  const db = await connectDB('app')

  if(db) {
    const product = await Products.findOne({id: id});
    if(product) {
      return NextResponse.json({...product._doc}, {status: 200})
    }
    db.close()
    return NextResponse.json({message: "Product not found"}, {status: 200})
  }
}