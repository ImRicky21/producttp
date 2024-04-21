import Link from "next/link";

export default function Footer() {
  return (
    <>
      <div className=" grid sm:grid-cols-3 justify-between gap-9 bottom-0 w-full bg-teal-200 p-6">
        <div>
          <h3>Program Studi Teknologi Pendidikan</h3>

          <Link
            href={
              "https://www.google.com/maps/place/Prodi+Teknologi+Pendidikan+FKIP+ULM/@-3.2995525,114.5859366,15z/data=!4m2!3m1!1s0x0:0x414e05913953224c?sa=X&ved=1t:2428&ictx=111"
            }
            target="_blank"
          >
            Jl. Brigjen H. Hasan Basri No. 87, Pangeran, Kec. Banjarmasin Utara,
            Kota Banjarmasin, Kalimantan Selatan 70123
          </Link>
        </div>

        <div>
          <h1></h1>

          <Link href="https://www.fkip.unluk.ac.id/" target="_blank">
            Fakultas Keguruan dan Ilmu Pendidikan
          </Link>
        </div>

        <div className="m-3 p-3">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15932.817054290443!2d114.5859366!3d-3.2995525!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2de423970d8e6f13%3A0x414e05913953224c!2sProdi%20Teknologi%20Pendidikan%20FKIP%20ULM!5e0!3m2!1sid!2sid!4v1713411481724!5m2!1sid!2sid"
            width="300"
            height="300"
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </>
  );
}
