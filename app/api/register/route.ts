
import { NextResponse } from "next/server";
import { connectDB } from "../../utilities/connectDB/connectDB";
import { NextRequest } from "next/server";
import bcrypt from 'bcrypt'


export async function POST(req: NextRequest, res:NextResponse) {
  const body =  await req.json()
  const { login, password, email, name, surname } = body;
  const db = await connectDB('app');
  if(db) {
    const user = await db.collection('users').findOne({
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
    await db.collection('users').insertOne({ login, password: hashedPassword, email, name, surname })
    const registeredUser = await db.collection('users').findOne({
      $or: [
        { login: login },
        { email: email }
      ]
    })
    await db.collection('users').updateOne({ email: registeredUser?.email }, {$set: { id: registeredUser?._id.toString() }})
    db.close()
  }
  
  return NextResponse.json({message: "User has been registered."}, {
    status: 200
  })
}
