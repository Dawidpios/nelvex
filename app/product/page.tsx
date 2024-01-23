import ProductsList from "@/components/products/ProductsList";

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
  });
  const products = await result.json()
  return products;
};


const ProductList = async () => {
  const products = await getProducts()

  return (
    <div>
      <ProductsList products={products}></ProductsList>

    </div>
  );
};

export default ProductList