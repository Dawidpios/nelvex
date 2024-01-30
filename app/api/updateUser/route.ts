import { NextResponse } from "next/server";
import { connectDB } from "../../utilities/connectDB/connectDB";
import { NextRequest } from "next/server";
import { User } from "../../utilities/models/User";

export async function POST(req: NextRequest, res: NextResponse) {
  const body = await req.json();
  const { id, image } = body;

  const db = await connectDB("app");
  if (db) {
    const user = await User.findById(id);
    if (user) {
      await User.findOneAndUpdate({ id: id }, { image: image });
      return NextResponse.json({ message: "User updated" }, { status: 200 });
    }
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }
  return NextResponse.json(
    { message: "Database connection failed" },
    { status: 500 }
  );
}
