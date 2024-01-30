
import { NextResponse } from "next/server";
import { connectDB } from "../../utilities/connectDB/connectDB";
import { NextRequest } from "next/server";
import bcrypt from 'bcrypt'
import { User } from "../../utilities/models/User";


export async function POST(req: NextRequest, res:NextResponse) {
  const body =  await req.json()
  const { login, password, email, name, surname } = body;
  const db = await connectDB('app');
  if(db) {
    const user = await User.findOne({
      $or: [
        { login: login },
        { email: email }
      ]
    })
    if(user) {
      db.close()
      return NextResponse.json({message: "User already exist"}, {
        status: 409
      })
    }
    const hashedPassword = await bcrypt.hash(password, 12)
    const newUser = await User.create({ login, password: hashedPassword, email, name, surname, cart: [] })
    newUser.id = newUser._id.toString()
    await newUser.save()

    db.close()
  }
  
  return NextResponse.json({message: "User has been registered."}, {
    status: 200
  })
}