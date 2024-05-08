import Link from "next/link";
import LogoULm from "../../../../public/icon/logo-ULM.png";
import LogoTP from "../../../../public/icon/logo-Teknologi-Pendidikan-FKIP-ULM.png";
import Image from "next/image";
import { FaInstagram, FaWeebly, FaYoutube } from "react-icons/fa6";
import { title } from "process";
import { link } from "fs";

export default function Footer() {
  const pranalas = [
    { id: 1, title: "Kemendikbud", link: "https://kemdikbud.go.id/main" },
    {
      id: 2,
      title: "Kampus Merdeka",
      link: "https://kampusmerdeka.kemdikbud.go.id/",
    },
    {
      id: 3,
      title: "Universitas Lambung Mangkurat",
      link: "http://ulm.ulm.ac.id/",
    },
    {
      id: 4,
      title: "Penerimaan Mahasiswa Baru",
      link: "https://pmb.ulm.ac.id/",
    },
    {
      id: 5,
      title: "Fakultas Keguruan dan Ilmu Pendidikan",
      link: "https://fkip.ulm.ac.id/",
    },
  ];
  return (
    <div>
      <div className="grid md:grid-cols-3 gap-9 bottom-0 bg-teal-200 p-6 uppercase ">
        <div className="">
          <div className="flex gap-2 mb-10 -mt-4">
            <Image src={LogoTP} alt="logo TP" width={60} height={300} />
            <Image src={LogoULm} alt="logo TP" width={60} height={300} />
          </div>

          <div className="">
            <h3 className="font-bold">Program Studi Teknologi Pendidikan</h3>
            <Link
              href={
                "https://www.google.com/maps/place/Prodi+Teknologi+Pendidikan+FKIP+ULM/@-3.2995525,114.5859366,15z/data=!4m2!3m1!1s0x0:0x414e05913953224c?sa=X&ved=1t:2428&ictx=111"
              }
              target="_blank"
            >
              Jl. Brigjen H. Hasan Basri No. 87, Pangeran, Kec. Banjarmasin
              Utara, Kota Banjarmasin, Kalimantan Selatan 70123
            </Link>
          </div>
          <div className="flex gap-4">
            <Link href={"https://www.instagram.com/tekpenulm/"} target="_blank">
              <FaInstagram className="text-5xl text-fuchsia-600" />
            </Link>
            <Link
              href={"https://www.youtube.com/@teknologipendidikanulm6008"}
              target="_blank"
            >
              <FaYoutube className="text-5xl text-red-600" />
            </Link>
          </div>
        </div>

        <div>
          <h1 className="font-bold text-xl pb-6">Akses Terkait</h1>
          <div className="flex flex-col gap-5">
            {pranalas.map((pranala) => (
              <Link
                key={pranala.id}
                href={pranala.link}
                className=""
                target="_blank"
              >
                {pranala.title}
              </Link>
            ))}
          </div>
        </div>

        <div className="">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15932.817054290443!2d114.5859366!3d-3.2995525!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2de423970d8e6f13%3A0x414e05913953224c!2sProdi%20Teknologi%20Pendidikan%20FKIP%20ULM!5e0!3m2!1sid!2sid!4v1713411481724!5m2!1sid!2sid"
            loading="lazy"
            className="md:[height:300px] md:[width:300px] bg-sky-400 rounded-lg"
          ></iframe>
        </div>
      </div>
      <div className="w-full bg-teal-300">
        <h1 className="text-center p-1">
          Copyright Teknologi Pendidikan FKIP © {new Date().getFullYear()}.
        </h1>
      </div>
    </div>
  );
}
