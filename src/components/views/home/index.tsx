import { Products } from "@/types/products.type";
import Image from "next/image";
import { useEffect, useState } from "react";
import VisiKeilmuanView from "../visiKeilmuan";
import Carousel from "@/components/fragment/carousel";
type PropsTypes = {
  products: Products[];
};
export default function HomeView(props: PropsTypes) {
  const { products } = props;
  const [productsData, setProductsData] = useState<Products[]>([]);
  useEffect(() => {
    setProductsData(products);
  }, [products]);
  const images = products.map((product) => product.image).slice(-3);
  console.log(products);
  return (
    <div className="flex flex-col m-4 justify-between gap-12">
      <div className="flex justify-between">
        <div className="">
          <h1 className="text-5xl font-bold uppercase">Teknologi Pendidikan</h1>
          <h1>Fakultar Keguruan dan Ilmu Pendidikan</h1>
          <h1>Universitas Lambung Mangkurat</h1>
        </div>
        <div className="p-7 w-2/5">
          <Carousel images={images} />
        </div>
      </div>

      <div>
        <VisiKeilmuanView />
      </div>
    </div>
  );
}
