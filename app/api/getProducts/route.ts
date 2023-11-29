import { NextResponse, NextRequest } from "next/server";
import { connectDB } from "../../utilities/connectDB/connectDB";
import axios from 'axios'

export async function GET(req: NextRequest, res: NextResponse) {

  const db = await connectDB('users')

  if(db) {
    const products = await db.collection('products').find({}).toArray() 
    if(products.length > 0) {
      return NextResponse.json({...products}, {status: 200})
    }
    const mockedProductsUrl = await fetch('https://dummyjson.com/products?limit=10')
    const res = await mockedProductsUrl.json()

    db.close()
    return NextResponse.json({...res}, {status: 200})
  }
}