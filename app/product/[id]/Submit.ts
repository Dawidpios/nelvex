
export default async function Submit ({userId, productId, count} : {userId: string, productId: string, count: number}) {
  await fetch("http://localhost:3000/api/orderProduct", {
    method: 'POST',
    body: JSON.stringify({
      userId: userId,
      productId: productId,
      stock: count
    })
  })
}