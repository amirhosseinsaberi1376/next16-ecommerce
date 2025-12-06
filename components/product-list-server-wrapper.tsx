import { getProducts, GetProductsParams } from "@/lib/actions";
import ProductList from "./product-list";

interface ProductListServerWrapperPorps {
  params: GetProductsParams;
}

export default async function ProductListServerWrapper({
  params,
}: ProductListServerWrapperPorps) {
  const products = await getProducts(params);

  return <ProductList products={products} />;
}
