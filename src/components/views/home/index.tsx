import { Products } from "@/types/products.type";
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
import WaveUpperRight from "@/components/svg/upper";
import KaryaMahasiswaView from "../karyaMahasiswa";

type PropsTypes = {
  products: Products[];
  dosens: Dosens[];
  sipams: Sipam[];
};
export default function HomeView(props: PropsTypes) {
  const { products, dosens, sipams } = props;
  const [isLoading, setIsLoading] = useState(true);
  const [dataProduct, setDataProduct] = useState<Products[]>([]);
  const [dataDosen, setDataDosen] = useState<Dosens[]>([]);
  const [dataSipam, setDataSipam] = useState<Sipam[]>([]);

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

  const images = dataProduct.map((product) => product.image).slice(-3);
  const titles = dataProduct.map((product) => product.title).slice(-3);

  return (
    <div className="w-full flex flex-col scroll-smooth">
      <div className="w-full absolute  ">
        <WaveUpperRight className="fill-teal-300" />
      </div>

      <div className="flex justify-around flex-col md:flex-row h-full my-10 md:mt-32 md:mb-40   ">
        <div className="m-10 flex flex-wrap flex-col justify-center">
          <div className="bg-teal-300 h-1 rounded-lg wipeIn w-1/2"></div>
          <p className="uppercase text-teal-400 font-bold" data-aos="fade-up">
            Selamat Datang Di Program Studi
          </p>
          <h1
            className={`text-5xl font-bold uppercase text-teal-400 `}
            data-aos="fade-up"
          >
            Teknologi Pendidikan
          </h1>
          <h1
            className="font-semibold md:text-justify text-2xl text-slate-950"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            Fakultas Keguruan dan Ilmu Pendidikan
          </h1>
          <h1
            className="font-bold md:text-justify text-2xl text-slate-950"
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
            <span className="bg-gray-300 h-72 w-full animate-pulse">
              <div className="bg-gray-300 h-72 w-full animate-pulse"></div>
            </span>
          ) : (
            <Carousel images={images} titles={titles} />
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
          Dosen Dan Tenaga Kependidikan
        </h3>
        <p className="text-center text-teal-400 capitalize">
          Berikut merupakan tenaga pendidik dan tenaga kependidikan yang ada di
          program studi Teknologi Pendidikan
        </p>
        <DosenView dosens={dataDosen} />
      </div>
      <div className="mt-10">
        <h3 className="text-center text-3xl text-teal-400 font-bold">
          Karya Mahasiswa
        </h3>
        <p className="text-center text-teal-400 capitalize">
          Berikut Merupakan hasil karya dari mahasiswa teknologi pendidikan FKIP
          ULM
        </p>
        <div className="w-full h-full px-7">
          <KaryaMahasiswaView />
        </div>
      </div>
      <div className="pt-10 m-6">
        <h3 className="text-3xl font-bold text-center text-teal-400">
          Berita Dan Pengumuman
        </h3>
        <p className="capitalize text-center text-teal-400 text-lg">
          Update berita dan pengumuman terkini{" "}
        </p>
        <ProductView products={dataProduct} />
      </div>
    </div>
  );
}
