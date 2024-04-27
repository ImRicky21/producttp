import { Products } from "@/types/products.type";
import Image from "next/image";
import { useEffect, useState } from "react";
import VisiKeilmuanView from "../visiKeilmuan";
import Carousel from "@/components/fragment/carousel";
import VideoProfileSection from "../videoProfile";
type PropsTypes = {
  products: Products[];
};
export default function HomeView(props: PropsTypes) {
  const { products } = props;
  const [productsData, setProductsData] = useState<Products[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setProductsData(products);
    setIsLoading(false);
  }, [products]);
  const images = products.map((product) => product.image).slice(-3);

  return (
    <div className="flex flex-col w-screen justify-between gap-12">
      <div className="flex justify-between flex-col md:flex-row p-5">
        <div className="">
          <h1 className={`text-5xl font-bold uppercase `}>
            Teknologi Pendidikan
          </h1>
          <h1>Fakultar Keguruan dan Ilmu Pendidikan</h1>
          <h1>Universitas Lambung Mangkurat</h1>
        </div>
        <div className="p-7 md:w-2/5 justify-center justify-items-center align-middle ">
          {isLoading ? (
            <div className="bg-gray-300 h-72 w-full animate-pulse"></div>
          ) : (
            <Carousel images={images} />
          )}
        </div>
      </div>

      <div>
        <VisiKeilmuanView />
      </div>
      <div>
        <VideoProfileSection />
      </div>
    </div>
  );
}
