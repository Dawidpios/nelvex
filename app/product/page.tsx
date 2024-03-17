import ProductsList from "@/components/products/ProductsList";
export const dynamic = 'force-dynamic'
type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  image: string;
};

type Props = {
  products: Product[]
}

const getProducts = async () => {
  const result = await fetch("http://localhost:3000/api/getProducts", {
    method: "GET",
    next: {
      tags: ['getProducts']
    }
  });
  const products = await result.json()
  return products;
};


const ProductList = async () => {
  const products = await getProducts()

  return (
    <>
      <ProductsList products={products}></ProductsList>
    </>
  );
};

export default ProductList