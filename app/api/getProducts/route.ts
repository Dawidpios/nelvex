import { NextResponse, NextRequest } from "next/server";
import { connectDB } from "../../utilities/connectDB/connectDB";
import { Products } from "../../utilities/models/Product";

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest, res: NextResponse) {

  const db = await connectDB('app')

  if(db) {
    const products = await Products.find({})
    if(products.length > 0) {
      return NextResponse.json([...products], {status: 200})
    }

    db.close()
    return NextResponse.json({message: "Products not found"}, {status: 200})
  }
}