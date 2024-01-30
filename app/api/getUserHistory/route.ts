import { NextResponse, NextRequest } from "next/server";
import { connectDB } from "../../utilities/connectDB/connectDB";
import { User } from "../../utilities/models/User";

export async function GET(req: NextRequest, res: NextResponse) {
  const db = await connectDB("app");
  const url = new URL(req.url);
  const userId = url.searchParams.get("userId");
  
  if (db) {
    const user = await User.findById(userId);

    if (user) {
      return NextResponse.json(user.history, { status: 200 });
    } else {
      db.close();
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
  }
  return NextResponse.json(
    { message: "Database connection failed" },
    { status: 500 }
  );
}
