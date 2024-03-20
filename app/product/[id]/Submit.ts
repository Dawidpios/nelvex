
export default async function Submit ({userId, productId, count} : {userId: string, productId: string, count: number}) {
  await fetch(process.env.URL_API +"/orderProduct", {
    method: 'POST',
    body: JSON.stringify({
      userId: userId,
      productId: productId,
      stock: count
    })
  })
}