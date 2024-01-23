import { NextResponse, NextRequest } from "next/server";
import { connectDB } from "../../utilities/connectDB/connectDB";

export async function POST(req: NextRequest, res: NextResponse) {
  const { userID, itemID } = await req.json();
  const db = await connectDB("app");

  if (db) {
    const user = await db.collection("users").findOne({ id: userID });

    if (user) {
      const newUserCart = user.cart.filter(
        ({ id }: { id: string }) => id !== itemID
      );
      const updatedHistory = user.history.map(
        (item: { id: string; status: string }) => {
          if (item.id === itemID) {
            item.status = "Cancelled";
          }
          return item;
        }
      );
      await db
        .collection("users")
        .updateMany(
          { id: userID },
          { $set: { cart: newUserCart, history: [...updatedHistory] } }
        );
      const productStock = user.cart.find(
        (item: { id: string }) => item.id === itemID
      ).stock;
      await db.collection("products").updateOne(
        { id: itemID },
        {
          $inc: {
            stock: productStock,
          },
        }
      );
      return NextResponse.json({ id: itemID }, { status: 200 });
    }
    db.close();
  }
}
