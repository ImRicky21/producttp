import PrestasiMahasiswaAdminView from "@/components/views/admin/prestasiMahasiswa";
import prestasiMahasiswaService from "@/services/prestasimahasiswa";
import { Prestasi } from "@/types/prestasi.type";
import Head from "next/head";
import { useEffect, useState } from "react";

export default function PrestasiMahasiswaAdminPage() {
  const [prestasi, setPrestasi] = useState<Prestasi[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getAllPrestasi = async () => {
      const { data } = await prestasiMahasiswaService.getAllPrestasi();
      setPrestasi(data.data);
      setIsLoading(false);
    };
    getAllPrestasi();
  }, []);
  console.log(prestasi);
  return (
    <>
      <Head>
        <title>Prestasi Mahasiswa</title>
      </Head>
      <div>
        <PrestasiMahasiswaAdminView prestasi={prestasi} />
      </div>
    </>
  );
}
