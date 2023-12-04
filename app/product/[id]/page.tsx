import { notFound } from "next/navigation";

type ParamsProps = {
  params: {
    id: string;
  };
};

type Product = {
  title: string;
  price: number;
  description: string;
  brand: string;
  category: string;
  rating: number;
  stock: number;
  images: string;
  thumbnail: string;
};

const getProduct = async (id: string) => {
  const product = await fetch("http://localhost:3000/api/getSingleProduct", {
    method: "POST",
    body: JSON.stringify(id),
    cache: 'no-cache'
  });
  const result = await product.json();
  return result;
};

const ProductPage = async ({ params }: ParamsProps) => {
  const product = await getProduct(params.id);
  const {
    title,
    price,
    description,
    brand,
    category,
    rating,
    stock,
    images,
    thumbnail,
  }: Product = product;

  if(product.message === 'Product not found') {
    notFound()
  }

  return (
    <section>
      <h1>{title}</h1>
      <div>
        <p>Brand: {brand}</p>
        <p>Category: {category}</p>
        <p>Price: {price}$</p>
      </div>
      <div>
        <p>{description}</p>
      </div>
      <div>
        <p>Rating: {rating}</p>
        <p>Stock: {stock}</p>
      </div>
    </section>
  );
};

export default ProductPage;
