import { Products } from "@/types/products.type";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import VisiKeilmuanView from "../visiKeilmuan";
import Carousel from "@/components/fragment/carousel";
import VideoProfileSection from "../videoProfile";
import productService from "@/services/product";
import ProductView from "../product";
import DosenView from "../dosen";
import { Dosens } from "@/types/dosen.type";
import dosenService from "@/services/dosen";
import SipamView from "../sipam";
import { Sipam } from "@/types/sipam.type";
import sipamService from "@/services/sipam";

type PropsTypes = {
  products: Products[];
  dosens: Dosens[];
  sipams: Sipam[];
};
export default function HomeView(props: PropsTypes) {
  const { products, dosens, sipams } = props;
  const [dataProduct, setDataProduct] = useState<Products[]>([]);
  const [dataDosen, setDataDosen] = useState<Dosens[]>([]);
  const [dataSipam, setDataSipam] = useState<Sipam[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const getAllProducts = async () => {
      const { data: productData } = await productService.getAllProduct();
      const { data: dosenData } = await dosenService.getAllDosens();
      const { data: sipamData } = await sipamService.getAllSipam();
      setDataProduct(productData.data);
      setDataDosen(dosenData.data);
      setDataSipam(sipamData.data);

      setIsLoading(false);
    };
    getAllProducts();
  }, [products, dosens, sipams]);
  console.log(dataProduct);
  console.log(dataDosen);
  console.log(dataSipam);

  const images = dataProduct.map((product) => product.image).slice(-3);

  return (
    <div className="w-full flex flex-col">
      <div className="flex justify-around flex-col md:flex-row mx-5 h-screen mt-10">
        <div className="m-10">
          <h1
            className={`text-5xl font-bold uppercase text-teal-500 `}
            data-aos="fade-up"
          >
            Teknologi Pendidikan
          </h1>
          <h1
            className="font-bold text-justify text-2xl text-slate-700"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            Fakultas Keguruan dan Ilmu Pendidikan
          </h1>
          <h1
            className="font-bold text-justify text-2xl text-slate-700"
            data-aos="fade-up"
            data-aos-delay="400"
          >
            Universitas Lambung Mangkurat
          </h1>
        </div>
        <div
          className="mx-5 md:w-2/5  justify-center justify-items-center align-middle mt-5"
          data-aos="fade-up"
          data-aos-delay="500"
        >
          {isLoading ? (
            <span className="bg-gray-300 h-72 w-full animate-pulse"></span>
          ) : (
            <Carousel images={images} />
          )}
        </div>
      </div>

      <div className="">
        <VisiKeilmuanView />
      </div>

      <div className="bg-white">
        <VideoProfileSection />
      </div>
      <div className="pt-10 m-6">
        <h3 className="text-3xl font-bold text-center text-teal-400">
          Sistem Informasi Dan Pelayanan Akademik Mahasiswa
        </h3>
        <SipamView sipams={sipams} />
      </div>
      <div className="pt-10 mt-6">
        <h3 className="text-3xl font-bold text-center text-teal-400">
          Dosen dan Staff
        </h3>
        <DosenView dosens={dataDosen} />
      </div>
      <div className="pt-10 m-6">
        <h3 className="text-3xl font-bold text-center text-teal-400">
          Berita Dan Pengumuman
        </h3>
        <ProductView products={dataProduct} />
      </div>
    </div>
  );
}
