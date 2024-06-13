import Button from "@/components/ui/button";
import SurveiMahsiswaPdfView from "@/components/views/survei/surveiMahasiswa/LaporanSurvei";
import SurveiMahsiswaFormView from "@/components/views/survei/surveiMahasiswa/formSurvei";
import { useState } from "react";

export default function SurveiMahsiswaPage() {
  const [switchView, setSwitchView] = useState(false);
  return (
    <>
      <div>
        <div></div>
        <div className="flex justify-center flex-wrap">
          <Button
            type="button"
            className="active:bg-teal-400 bg-sky-400 m-2 p-3 rounded-lg text-white "
            onClick={() => setSwitchView(false)}
          >
            Form
          </Button>
          <Button
            type="button"
            className="active:bg-teal-400 bg-sky-400 m-2 p-3 rounded-lg text-white"
            onClick={() => setSwitchView(true)}
          >
            Laporan
          </Button>
        </div>
        <div>
          {switchView ? <SurveiMahsiswaPdfView /> : <SurveiMahsiswaFormView />}
        </div>
      </div>
    </>
  );
}
