import { NextResponse } from "next/server";
import { connectDB } from "../../utilities/connectDB/connectDB";
import { NextRequest } from "next/server";
import { User } from "../../utilities/models/User";

export async function POST(req:NextRequest, res:NextResponse) {
  const body = await req.json()
  const id = body
  const db = await connectDB('app')

  if(db) {
    const user = await User.findById(id)  
    if(user) {
      const {login, email, id, surname, name, cart, history } = user
      const userWithOutPassword = {
        login,
        email,
        id,
        surname,
        name, 
        cart, 
        history
      }
      return NextResponse.json({...userWithOutPassword}, {status: 200})
    }
    if(!user) {
      return NextResponse.json({message: 'User not found'}, {status:200})
    }
  } else {
    return NextResponse.json({message: 'Database connection failed'}, {status: 500})
  }
}