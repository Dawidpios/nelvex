import { NextResponse, NextRequest } from "next/server";
import { connectDB } from "../../utilities/connectDB/connectDB";

export async function POST(req: NextRequest, res: NextResponse) {
  const body = await req.json();
  const { userId, productId, stock } = body;

  const db = await connectDB("app");
  if (db) {
    const product = await db.collection("products").findOne({ id: productId });

    if (product) {
      const isOrderAvaiable = product.stock >= stock;
      if (isOrderAvaiable) {
        const newStockValue = product.stock - stock;
        await db
          .collection("products")
          .updateOne({ id: productId }, { $set: { stock: newStockValue } });
        const user = await db.collection("users").findOne({ id: userId });
       
        if (user) {
          console.log(user)
          if (
            user.cart.find((item: { id: string }) => item?.id === product.id)
          ) {
            const updatedCart = user.cart.map(
              (item: { id: string; stock: number }) => {
                if (item.id === product.id) {
                  return NextResponse.json(
                    { ...item, stock: stock + item.stock },
                    { status: 200 }
                  );
                }
              }
            );
            
            await db
              .collection("users")
              .updateOne({ id: userId }, { $set: { cart: [...updatedCart] } });
            return NextResponse.json({ status: 200 });
          }
          user.cart.push({
            id: product.id,
            title: product.title,
            stock: stock,
            image: product.image,
            price: product.price,
          });
          await db
            .collection("users")
            .updateOne({ id: userId }, { $set: { cart: [...user.cart] } });
          return NextResponse.json({ status: 200 });
        }
      }
      return NextResponse.json({ status: 200 });
    }
    return NextResponse.json({ message: "Product not found" }, { status: 404 });
  }
}
