import Button from "@/components/ui/button";
import SurveiVisiMisiFormView from "@/components/views/survei/surveiVisimisi/formSurvei";
import SurveiVisiMisiPdfView from "@/components/views/survei/surveiVisimisi/isiSurvei";

import Head from "next/head";
import { useState } from "react";

export default function SurveiVisiMisiPdfPage() {
  const [isView, setIsView] = useState(false);
  return (
    <>
      <Head>
        <title>Laporan Pemahaman Visi Keilmuan dan Tujuan</title>
      </Head>
      <main className="">
        <div className="p-10 m-10 flex gap-10 justify-center text-white">
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
        <div className="flex justify-center text-center ">
          {!isView ? (
            <h1 className="text-3xl text-teal-400 font-bold">
              Laporan Pemahaman Visi Keilmuan dan Tujuan
            </h1>
          ) : (
            <h1 className="text-3xl text-teal-400 font-bold">
              Form Pemahaman Visi Keilmuan dan Tujuan
            </h1>
          )}
        </div>
        <div className=" container flex justify-center my-8">
          {isView ? <SurveiVisiMisiFormView /> : <SurveiVisiMisiPdfView />}
        </div>
      </main>
    </>
  );
}
