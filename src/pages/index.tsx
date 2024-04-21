import { Inter } from "next/font/google";
import HomeView from "@/components/views/home";
import { useEffect, useState } from "react";
import productService from "@/services/product";

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
    <main className={`flex justify-between m-3 ${inter.className}`}>
      <HomeView products={products} />
    </main>
  );
}
