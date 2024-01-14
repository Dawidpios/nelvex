import { NextResponse, NextRequest } from "next/server";
import { connectDB } from "../../utilities/connectDB/connectDB";

export async function POST(req: NextRequest, res: NextResponse) {
  const { userID, itemID } = await req.json();
  const db = await connectDB("app");

  if (db) {
    const user = await db.collection("users").findOne({ id: userID });

    if (user) {
      const newUserCart = user.cart.filter(
        ({ id }: { id: number }) => id !== itemID
      );
      await db
        .collection("users")
        .findOneAndUpdate({ id: userID }, { $set: { cart: newUserCart } });
      db.close()
      return NextResponse.json({ id: itemID }, { status: 200 });
    }
  }
}
