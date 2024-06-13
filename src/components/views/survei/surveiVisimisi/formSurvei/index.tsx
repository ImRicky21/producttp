import { useState } from "react";
import Button from "@/components/ui/button";

export default function SurveiVisiMisiFormView() {
  const [selectedYear, setSelectedYear] = useState("2021");

  const renderForm = () => {
    switch (selectedYear) {
      case "2021":
        return (
          <iframe
            src="https://docs.google.com/forms/d/e/1FAIpQLSc5_NGcMya3CBy372hiN-qLgwQkwrOCq5CMKsNoou3v1i_Uow/viewform?embedded=true"
            width="100%"
            height="1080"
            style={{ border: "none" }}
          ></iframe>
        );
      case "2022":
        return (
          <iframe
            src="https://docs.google.com/forms/d/e/1FAIpQLSfhfxTL9t8VUk3dt2W6n0Kzvi4qFtBcq6L5dz0Dhb7V0H3mcg/viewform?embedded=true"
            width="100%"
            height="1080"
            style={{ border: "none" }}
          ></iframe>
        );
      case "2023":
        return (
          <iframe
            src="https://docs.google.com/forms/d/e/1FAIpQLScsVQKF5nj2k47b_dtpHX9tPJyi03k07PzVGlSIw5VdMK4E3Q/viewform?embedded=true"
            width="100%"
            height="1080"
            style={{ border: "none" }}
          ></iframe>
        );
      default:
        return "tidak ada yang ditampilkan";
    }
  };

  return (
    <>
      <div className="container mx-auto">
        <div className="flex justify-center ">
          <Button
            type="button"
            className="active:bg-teal-400 bg-teal-200 m-2 p-3 rounded-lg"
            onClick={() => setSelectedYear("2021")}
          >
            2021
          </Button>
          <Button
            type="button"
            className="active:bg-teal-400 bg-teal-200 m-2 p-3 rounded-lg"
            onClick={() => setSelectedYear("2022")}
          >
            2022
          </Button>
          <Button
            type="button"
            className="active:bg-teal-400 bg-teal-200 m-2 p-3 rounded-lg"
            onClick={() => setSelectedYear("2023")}
          >
            2023
          </Button>
        </div>
        <div className="">{renderForm()}</div>
      </div>
    </>
  );
}
