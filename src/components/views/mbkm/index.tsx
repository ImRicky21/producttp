import Link from "next/link";
import KMLogo from "@/../../public/mbkm/logo skripsi/kampus mengajar.png";
import MSIBLogo from "@/../../public/mbkm/logo skripsi/MSIB.png";
import PMMLogo from "@/../../public/mbkm/logo skripsi/PMM.png";
import WMLogo from "@/../../public/mbkm/logo skripsi/wirausaha merdeka.png";
import PMLogo from "@/../../public/mbkm/logo skripsi/praktisi mengajar.png";
import ICEILogo from "@/../../public/mbkm/logo skripsi/ICEI.png";
import BangkitLogo from "@/../../public/mbkm/logo skripsi/Bangkit.png";
import IISMALogo from "@/../../public/mbkm/logo skripsi/Iisma.png";
import Image from "next/image";

export default function MbkmView() {
  const data = [
    {
      title: "Kampus Mengajar",
      link: "https://kampusmerdeka.kemdikbud.go.id/program/mengajar",
      imageUrl: KMLogo,
    },
    {
      title: "Magang MSIB",
      link: "https://kampusmerdeka.kemdikbud.go.id/program/magang/detail",
      imageUrl: MSIBLogo,
    },
    {
      title: "Studi Independen",
      link: "https://kampusmerdeka.kemdikbud.go.id/program/studi-independen/detail",
      imageUrl: MSIBLogo,
    },
    {
      title: "Pertukaran Mahasiswa Merdeka",
      link: "https://pmm.kampusmerdeka.kemdikbud.go.id/pages/info/program/pmm_4/",
      imageUrl: PMMLogo,
    },
    {
      title: "Wirausaha Merdeka",
      link: "https://wirausahamerdeka.kampusmerdeka.kemdikbud.go.id/info/",
      imageUrl: WMLogo,
    },
    {
      title: "Indonesian International Student Mobility Awards ",
      link: "https://iisma.kemdikbud.go.id/",
      imageUrl: IISMALogo,
    },
    {
      title: "Praktisi Mengajar",
      link: "https://praktisimengajar.kampusmerdeka.kemdikbud.go.id/",
      imageUrl: PMLogo,
    },
    {
      title: "Bangkit By Google, GOTO, and Traveloka",
      link: "https://grow.google/intl/id_id/bangkit/?tab=machine-learning",
      imageUrl: BangkitLogo,
    },
    {
      title: "Indonesia Cyber Education Institute",
      link: "https://icei.ac.id/",
      imageUrl: ICEILogo,
    },
  ];
  return (
    <div className="grid md:grid-cols-3 align-middle justify-center justify-items-center ">
      {data.map((item) => (
        <div key={item.title} className=" m-2 rounded-sm">
          <Link
            href={item.link}
            className="items-center text-center text-sky-400 p-5 flex flex-col hover:[relative top:-5px] hover:shadow-2xl hover:scale-105"
          >
            <Image
              src={item.imageUrl}
              alt={item.title}
              width={200}
              height={200}
            />
            {item.title}
          </Link>
        </div>
      ))}
    </div>
  );
}
