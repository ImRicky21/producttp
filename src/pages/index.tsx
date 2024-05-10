import { Inter } from "next/font/google";
import HomeView from "@/components/views/home";
import { useEffect, useState } from "react";
import productService from "@/services/product";
import Head from "next/head";
import dosenService from "@/services/dosen";
import sipamService from "@/services/sipam";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [products, setProducts] = useState([]);
  const [dosens, setDosens] = useState([]);
  const [sipams, setSipams] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dosenResponse = await dosenService.getAllDosens();
        const productResponse = await productService.getAllProduct();
        const sipamResponse = await sipamService.getAllSipam();

        setDosens(dosenResponse.data.data);
        setProducts(productResponse.data.data);
        setSipams(sipamResponse.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    console.log(products);
  }, [products]);

  useEffect(() => {
    console.log(dosens);
  }, [dosens]);

  useEffect(() => {
    console.log(sipams);
  }, [sipams]);

  console.log(sipams);
  console.log(products);
  console.log(dosens);
  return (
    <>
      <Head>
        <title>Teknologi Pendidikan FKIP ULM</title>
      </Head>
      <main className={`flex justify-between scroll-smooth ${inter.className}`}>
        <HomeView products={products} dosens={dosens} sipams={sipams} />
      </main>
    </>
  );
}
