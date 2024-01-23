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
          if (
            user.cart.find((item: { id: string }) => item?.id === product.id)
          ) {
            const updatedCart = user.cart.map(
              (item: { id: string; stock: number }) => {
                if (item?.id === product.id) {
                  return {...item, stock: stock + item.stock }
                }
                return item
              }
            );
            const updatedHistory = user.history.map(
              (item: { id: string; stock: number }) => {
                if (item?.id === product.id) {
                  return {...item, stock: stock + item.stock }
                }
                return item
              }
            );
            await db
              .collection("users")
              .updateMany({ id: userId }, { $set: { cart: [...updatedCart], history: [...updatedHistory] } });
            return NextResponse.json({ status: 200 });
          }
          const productParam = {
            id: product.id,
            title: product.title,
            stock: stock,
            image: product.image,
            price: product.price,
            status: 'Ordered'
          }
          user.cart.push(productParam);
          user.history.push(productParam)
          await db
            .collection("users")
            .updateMany({ id: userId }, { $set: { cart: [...user.cart], history: [...user.history] }});
          return NextResponse.json({ status: 200 });
        }
      }
      return NextResponse.json({ status: 200 });
    }
    return NextResponse.json({ message: "Product not found" }, { status: 404 });
  }
}
