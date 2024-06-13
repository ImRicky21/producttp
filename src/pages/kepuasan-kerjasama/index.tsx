import Button from "@/components/ui/button";
import SurveiKerjasamaFormView from "@/components/views/survei/surveiKerjasama/formSurvei";
import SurveiKerjasamaPdfView from "@/components/views/survei/surveiKerjasama/isiSurvei";
import Head from "next/head";
import { useState } from "react";

export default function KepuasanKerjasamaPage() {
  const [isView, setIsView] = useState(false);
  return (
    <>
      <Head>
        <title>Kepuasan Kerjasama</title>
      </Head>
      <main>
        <div className="container flex flex-wrap flex-col ">
          <div>
            <h1 className="text-3xl font-bold text-center mb-4 text-teal-400">
              Survei Kepuasan Kerjasama
            </h1>
          </div>
          <div className="flex justify-center">
            <Button
              type="button"
              onClick={() => setIsView(!isView)}
              className="active:bg-teal-400 bg-sky-400 m-2 p-3 rounded-lg text-white"
            >
              {isView ? "Form" : "Laporan"}
            </Button>
          </div>

          <div className="flex justify-center container">
            {isView ? <SurveiKerjasamaFormView /> : <SurveiKerjasamaPdfView />}
          </div>
        </div>
      </main>
    </>
  );
}
