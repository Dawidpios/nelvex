export default async function getProduct(id: string) {
  const product = await fetch(process.env.URL_API +"/getSingleProduct", {
    method: "POST",
    body: JSON.stringify(id),
    next: { tags: ["getSingleProduct"] },
  });
  const result = await product.json();
  return result;
}
