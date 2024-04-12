import PaginationComponent from "@/components/pagination/PaginationComponent";
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
  const result = await fetch(process.env.URL_API +"/getProducts", {
    method: "GET",
    next: {
      tags: ['getProducts']
    }
  });
  const products = await result.json()
  return products;
};


const ProductList = async ({searchParams} : {searchParams: { [key: string]: string | string[] | undefined }}) => {
  const productsResult = await getProducts()

  const page = searchParams['page'] ?? '1'
  const perPage = '5'

  const paginStart = (Number(page) - 1) * (Number(perPage))
  const end = paginStart + Number(perPage)

  const products = productsResult.slice(paginStart, end)
  
  return (
    <>
      <ProductsList products={products}></ProductsList>
      <PaginationComponent dataLength={productsResult.length} ></PaginationComponent>
    </>
  );
};

export default ProductList