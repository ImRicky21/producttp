import Button from "@/components/ui/button";
import SurveiAlumniFormView from "@/components/views/survei/surveiAlumni/formSurvei";
import LaporanSurveiAlumniPDfView from "@/components/views/survei/surveiAlumni/isiSurvei";
import Head from "next/head";
import { useState } from "react";

export default function LaporanSurveiAlumniPage() {
  const [isView, setIsView] = useState(false);

  return (
    <>
      <Head>
        <title>Laporan Pemahaman Survei Kepuasan Alumni</title>
      </Head>
      <main className="flexflex-wrap">
        <div className="p-10 m-10 flex gap-10 justify-center text-white">
          <h1 className="text-3xl text-teal-400 font-bold text-center">
            Survei Kepuasan Alumni
          </h1>
        </div>
        <div className="px-10 mx-10 flex gap-10 justify-center text-white">
          <Button
            type="button"
            onClick={() => setIsView(false)}
            className="active:bg-teal-400 bg-sky-400 m-2 p-3 rounded-lg"
          >
            Laporan
          </Button>
          <Button
            type="button"
            onClick={() => setIsView(true)}
            className="active:bg-teal-400 bg-sky-400 m-2 p-3 rounded-lg"
          >
            Form
          </Button>
        </div>
        <div className="flex justify-center w-auto">
          {!isView ? <LaporanSurveiAlumniPDfView /> : <SurveiAlumniFormView />}
        </div>
      </main>
    </>
  );
}
