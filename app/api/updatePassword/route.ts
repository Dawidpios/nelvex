import { NextResponse, NextRequest } from "next/server";
import { connectDB } from "../../utilities/connectDB/connectDB";
import bcrypt from "bcrypt";
import { hashPassword, verifyPassword } from "../../utilities/passwordManage/passwordManage";

export async function POST(req: NextRequest, res: NextResponse) {
  const body = await req.json();
  const { oldPassword, confirmedOldPassword, newPassword, session, status } = body;
  if (status === "authenticated") {
    const { name, email } = session!.user;
    const db = await connectDB("app");
    if (db) {
      const user = await db.collection("users").findOne({
        $and: [{ name: name }, { email: email }],
      });
      if (user) {
        console.log(confirmedOldPassword)
        const validOldPassword = await verifyPassword(
          oldPassword,
          user.password
        );
        const validOldConfirmedPassword = await verifyPassword(
          confirmedOldPassword,
          user.password
        );

        if (validOldPassword && validOldConfirmedPassword) {
          const hashedPassword = await hashPassword(newPassword);
          await db
            .collection("users")
            .updateOne(
              { $and: [{ name: name }, { email: email }] },
              { $set: { password: hashedPassword } }
            );
          db.close();
          return NextResponse.json(
            { message: "Password changed" },
            { status: 200 }
          );
        } else
          return NextResponse.json(
            { message: "Old password is not correct" },
            { status: 401 }
          );
      } else
        return NextResponse.json(
          { message: "User not found" },
          { status: 404 }
        );
    } else
      return NextResponse.json(
        { message: "Database connection failed" },
        { status: 500 }
      );
  } else
    return NextResponse.json(
      { message: "You must be authenticated" },
      { status: 401 }
    );
}
