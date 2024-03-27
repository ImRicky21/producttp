import AdminProductView from "@/components/views/admin/products";
import productService from "@/services/product";
import { useEffect, useState } from "react";

export default function AdminProductPage(props: any) {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const getAllProducts = async () => {
      const { data } = await productService.getAllProduct();
      setProducts(data.data);
    };
    getAllProducts();
  }, []);
  return (
    <>
      <AdminProductView products={products} />
    </>
  );
}
