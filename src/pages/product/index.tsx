import ProductView from "@/components/views/product";
import productService from "@/services/product";
import Head from "next/head";
import { useEffect, useState } from "react";

export default function ProductsPage() {
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
      <Head>
        <title>Berita / Pengumuman</title>
      </Head>
      <ProductView products={products} />
    </>
  );
}
