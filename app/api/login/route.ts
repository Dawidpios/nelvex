import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "../../../utilities/connectDB/connectDB";
import bcrypt from 'bcrypt'


export async function POST(req:NextRequest, res:NextResponse) {
  const body = await req.json()
  const {login, password} = body
  const db = await connectDB('users');
  if(db) {
    const user = await db.collection('users').findOne({$or: [
      { login: login },
      { email: "email" }
    ]})
    if(user) {
      const passwordIsCorrect = await bcrypt.compare(password, user.password)
      if(passwordIsCorrect) {
        await db.collection('users').updateOne(
          { _id: user._id },
          { $set: { logged: true } }
        );
        return NextResponse.json({message:"Login success"}, {
          status:200
        })
      } else {
        return NextResponse.json({message:"Invalid email or password."}, {
          status:401
        })
      }
    } else { 
      return NextResponse.json({message:"Invalid email or password."}, {
        status:401
      })
    }

  }
}