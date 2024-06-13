import Button from "@/components/ui/button";
import { useState } from "react";

export default function LaporanSurveiAlumniPDfView() {
  const [selectedYear, setSelectedYear] = useState("2020");
  const renderContent = () => {
    switch (selectedYear) {
      case "2020":
        return (
          <>
            <div>
              <h1 className="text-sky-400 font-bold">-2020-</h1>
            </div>
            <div className="flex justify-center md:w-96">
              <iframe
                src="https://drive.google.com/file/d/1ZhxFUxhffJU6GORvJ74gAtPmFdjz8Uts/preview"
                className="w-full max-w-screen-lg h-96 sm:h-128 md:h-160 lg:h-192"
                allow="autoplay"
              ></iframe>
            </div>
          </>
        );
      case "2021":
        return (
          <>
            <div>
              <h1 className="text-sky-400 font-bold">-2021-</h1>
            </div>
            <div className="flex justify-center">
              <iframe
                src="https://drive.google.com/file/d/1k1smyVodCfuToHXShn1QKQ59tU9oTux_/preview"
                className="w-full max-w-screen-lg h-96 sm:h-128 md:h-160 lg:h-192"
                allow="autoplay"
              ></iframe>
            </div>
          </>
        );
      case "2022":
        return (
          <>
            <div>
              <h1 className="text-sky-400 font-bold">-2022-</h1>
            </div>
            <div className="flex justify-center">
              <iframe
                src="https://drive.google.com/file/d/1t2MRw6WUUpYo157H80YeM3ocHGPnHLpY/preview"
                className="w-full max-w-screen-lg h-96 sm:h-128 md:h-160 lg:h-192"
                allow="autoplay"
              ></iframe>
            </div>
          </>
        );
      case "2023":
        return (
          <>
            <div className="container">
              <h1 className="text-sky-400 font-bold">-2023-</h1>
            </div>
            <div className="flex justify-center">
              <iframe
                src="https://drive.google.com/file/d/1LT1c4dHBkcAvQmZWZK8c_x2EbzcfCzZD/preview"
                className="w-full max-w-screen-lg h-96 sm:h-128 md:h-160 lg:h-192"
                allow="autoplay"
              ></iframe>
            </div>
          </>
        );
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
        <div className="flex gap-2 justify-center text-white flex-wrap">
          <Button
            type="button"
            className="active:bg-teal-400 bg-sky-400 m-2 p-3 rounded-lg"
            onClick={() => setSelectedYear("2020")}
          >
            2020
          </Button>
          <Button
            type="button"
            className="active:bg-teal-400 bg-sky-400 m-2 p-3 rounded-lg"
            onClick={() => setSelectedYear("2021")}
          >
            2021
          </Button>
          <Button
            type="button"
            className="active:bg-teal-400 bg-sky-400 m-2 p-3 rounded-lg"
            onClick={() => setSelectedYear("2022")}
          >
            2022
          </Button>
          <Button
            type="button"
            className="active:bg-teal-400 bg-sky-400 m-2 p-3 rounded-lg"
            onClick={() => setSelectedYear("2023")}
          >
            2023
          </Button>
        </div>

        <div className="mt-5 flex justify-center gap-10 flex-wrap text-center text-xl">
          <div className="p-2">{renderContent()}</div>
        </div>
      </div>
    </>
  );
}
