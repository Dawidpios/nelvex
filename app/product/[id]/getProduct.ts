export default async function getProduct (id: string) {
  const product = await fetch("http://localhost:3000/api/getSingleProduct", {
    method: "POST",
    body: JSON.stringify(id),
  });
  const result = await product.json();
  return result;
};