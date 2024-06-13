import { useState } from "react";
import Button from "@/components/ui/button";

export default function SurveiMahasiswaPdfView() {
  const [selectedYear, setSelectedYear] = useState("2020/2021");

  const renderContent = () => {
    switch (selectedYear) {
      case "2020/2021":
        return (
          <>
            <div className="">
              <h1 className="text-sky-400 font-bold"> - Ganjil - </h1>
              <iframe
                src="https://drive.google.com/file/d/17Z5ZSn952RhLmvzBY_2pBhH5FdM5IbnY/preview"
                width="640"
                height="1080"
                allow="autoplay"
                style={{ border: "none" }}
              ></iframe>
            </div>
            <div>
              <h1 className="text-sky-400 font-bold"> - Genap - </h1>
              <iframe
                src="https://drive.google.com/file/d/1zmrcPCpoZVOswGFHKuiXOivFCRIljx_2/preview"
                width="640"
                height="1080"
                allow="autoplay"
                style={{ border: "none" }}
              ></iframe>
            </div>
          </>
        );
      case "2021/2022":
        return (
          <>
            <div>
              <h1 className="text-sky-400 font-bold"> - Ganjil - </h1>
              <iframe
                src="https://drive.google.com/file/d/1Xy_s2LC8ivjX3x4XOZCrbyPUR9PT-Kzq/preview"
                width="640"
                height="1080"
                allow="autoplay"
                style={{ border: "none" }}
              ></iframe>
            </div>
            <div>
              <h1 className="text-sky-400 font-bold"> - Genap - </h1>
              <iframe
                src="https://drive.google.com/file/d/1jCm6bDEX1vYM2l694VLXiQ_4_pIIbj9e/preview"
                width="640"
                height="1080"
                allow="autoplay"
                style={{ border: "none" }}
              ></iframe>
            </div>
          </>
        );
      case "2022/2023":
        return (
          <>
            <div>
              <h1 className="text-sky-400 font-bold"> - Ganjil - </h1>
              <iframe
                src="https://drive.google.com/file/d/1V_IjzHqMQ_aew5XTTUHTxymLoF-NqlTP/preview"
                width="640"
                height="1080"
                allow="autoplay"
                style={{ border: "none" }}
              ></iframe>
            </div>
            <div>
              <h1 className="text-sky-400 font-bold"> - Genap - </h1>
              <iframe
                src="https://drive.google.com/file/d/1fpG_OL-Uw4HclxpwDzn2cpXnckRuIEpz/preview"
                width=" "
                height="1080"
                allow="autoplay"
                style={{ border: "none" }}
              ></iframe>
            </div>
          </>
        );
      default:
        return <div>tidak ada yang ditampilkan</div>;
    }
  };

  return (
    <>
      <div className="mt-10">
        <div>
          <h1 className="text-sky-400 font-bold text-center text-3xl">
            - Laporan Survei -
          </h1>
        </div>
        <div className="flex gap-2 justify-center text-white">
          <Button
            type="button"
            className="active:bg-teal-400 bg-sky-400 m-2 p-3 rounded-lg"
            onClick={() => setSelectedYear("2020/2021")}
          >
            2020/2021
          </Button>
          <Button
            type="button"
            className="active:bg-teal-400 bg-sky-400 m-2 p-3 rounded-lg"
            onClick={() => setSelectedYear("2021/2022")}
          >
            2021/2022
          </Button>
          <Button
            type="button"
            className="active:bg-teal-400 bg-sky-400 m-2 p-3 rounded-lg"
            onClick={() => setSelectedYear("2022/2023")}
          >
            2022/2023
          </Button>
        </div>

        <div className="mt-5 flex justify-center gap-10 flex-wrap text-center text-xl">
          <div>{renderContent()}</div>
        </div>
      </div>
    </>
  );
}
