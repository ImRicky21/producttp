import DetailProductView from "@/components/views/detailProductView";
import productService from "@/services/product";
import { Products } from "@/types/products.type";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const DetailProductPage = () => {
  const { id } = useRouter().query;
  const [product, setProduct] = useState<Products | null>(null);
  useEffect(() => {
    const getDetailProduct = async (id: string) => {
      const { data } = await productService.getDetailProduct(id);
      setProduct(data.data);
    };
    getDetailProduct(id as string);
  }, [id]);
  console.log(product);

  return (
    <>
      <Head>
        <title>{product?.title}</title>
      </Head>
      <DetailProductView product={product} />
    </>
  );
};

export default DetailProductPage;
