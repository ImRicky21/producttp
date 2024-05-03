import { Inter } from "next/font/google";
import HomeView from "@/components/views/home";
import { useEffect, useState } from "react";
import productService from "@/services/product";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
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
        <title>Teknologi Pendidikan FKIP ULM</title>
      </Head>
      <main
        className={`flex justify-between bg-slate-200 scroll-smooth ${inter.className}`}
      >
        <HomeView products={products} />
      </main>
    </>
  );
}
