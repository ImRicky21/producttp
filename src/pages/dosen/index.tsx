import DosenView from "@/components/views/dosen";
import dosenService from "@/services/dosen";
import { Dosens } from "@/types/dosen.type";
import Head from "next/head";
import { useEffect, useState } from "react";

export default function DosenPage() {
  const [dosens, setDosens] = useState([]);
  useEffect(() => {
    const getAlldosens = async () => {
      const { data } = await dosenService.getAllDosens();
      setDosens(data.data);
      console.log(data.data);
    };
    getAlldosens();
  }, []);
  return (
    <>
      <Head>
        <title>Dosen</title>
      </Head>
      <DosenView dosens={dosens} />
    </>
  );
}
