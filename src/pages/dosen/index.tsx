import DosenView from "@/components/views/dosen";
import dosenService from "@/services/dosen";
import Head from "next/head";
import { useEffect, useState } from "react";

export default function DosenPage() {
  const [dosens, setDosens] = useState([]);
  useEffect(() => {
    const getAlldosens = async () => {
      const { data } = await dosenService.getAllDosens();
      setDosens(data.data);
    };
    getAlldosens();
  }, []);
  return (
    <>
      <Head>
        <title>Dosen dan Staf</title>
      </Head>

      <div className="flex flex-col mt-5">
        <h1 className="text-5xl uppercase text-center font-semibold">
          dosen dan staf
        </h1>
        <DosenView dosens={dosens} />
      </div>
    </>
  );
}
