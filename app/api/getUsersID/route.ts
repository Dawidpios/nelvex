import { NextResponse } from "next/server";
import { connectDB } from "../../utilities/connectDB/connectDB";
import { NextRequest } from "next/server";
import { User } from "../../utilities/models/User";

export async function GET(req:NextRequest, res:NextResponse) {
  const db = await connectDB('app')
  
  if(db) {
    const users = await User.find({})

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