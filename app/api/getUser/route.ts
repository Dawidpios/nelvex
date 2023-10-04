import { NextResponse } from "next/server";
import { connectDB } from "../../../utilities/connectDB/connectDB";
import { NextRequest } from "next/server";

export async function POST(req:NextRequest, res:NextResponse) {
  const body = await req.json()
  const id = body
  const db = await connectDB('users')

  if(db) {
    const user = await db.collection('users').findOne({id : id})  
    if(user) {
      const {password, _id, ...userWithOutPassword} = user
      return NextResponse.json({...userWithOutPassword}, {status: 200})
    }
    if(!user) {
      return NextResponse.json({message: 'User not found'}, {status:200})
    }
  } else {
    return NextResponse.json({message: 'Database connection failed'}, {status: 500})
  }
}