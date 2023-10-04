import { NextResponse } from "next/server";
import { connectDB } from "../../../utilities/connectDB/connectDB";
import { NextRequest } from "next/server";

export async function GET(req:NextRequest, res:NextResponse) {
  const db = await connectDB('users')
  
  if(db) {
    const users = db.collection('users').find({})

    if(users) {
      const usersID = users.map(user => user.id)
      return NextResponse.json({usersID}, {status: 200})
    }

    if(!users) {
      return NextResponse.json({message: 'Users not found'}, {status:404})
    }
  } else {
    return NextResponse.json({message: 'Database connection failed'}, {status: 500})
  }
}