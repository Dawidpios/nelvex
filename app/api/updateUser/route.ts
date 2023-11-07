import { NextResponse } from "next/server";
import { connectDB } from "../../utilities/connectDB/connectDB";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest, res:NextResponse) {
  const body =  await req.json()
  const {id, image} = body

  const db = await connectDB('users')
  if(db) {
    const user = await db.collection('users').findOne({ id: id })
    if(user) {
      await db.collection('users').updateOne({ id: id }, {$set: {image: image}})
      const updatedUser = await db.collection('users').findOne({ id: id })
      if(updatedUser) {
        const {password, _id, ...userWithOutPassword} = updatedUser
        return NextResponse.json({...userWithOutPassword}, {status:200})
      }
      return NextResponse.json({message: "User update failed"}, {status:500})
    }
      return NextResponse.json({message: "User not found"}, {status:404})
  }
  return NextResponse.json({message: "Database connection failed"}, {status:500})
}