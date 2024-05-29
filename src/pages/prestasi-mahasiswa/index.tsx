import PrestasiMahasiswaView from "@/components/views/prestasiMahasiswa";
import prestasiMahasiswaService from "@/services/prestasimahasiswa";
import Head from "next/head";
import { useEffect, useState } from "react";

export default function PrestasiMahasiswaPage() {
  const [prestasi, setPrestasi] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const getAllPrestasi = async () => {
      const { data } = await prestasiMahasiswaService.getAllPrestasi();
      setPrestasi(data.data);
      setIsLoading(false);
    };
    getAllPrestasi();
  }, []);
  return (
    <>
      <Head>
        <title>Prestasi Mahasiswa</title>
      </Head>
      <div>
        <h1 className="text-center text-2xl text-teal-400 font-bold">
          Prestasi Mahasiswa
        </h1>
        <PrestasiMahasiswaView prestasi={prestasi} />
      </div>
    </>
  );
}
