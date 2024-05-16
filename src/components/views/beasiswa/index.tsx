import Button from "@/components/ui/button";
import Image from "next/image";
import logoTutWuri from "@/../../public/beasiswa/logo_tutwuri.png";
import logoBaznaz from "@/../../public/beasiswa/Logo_BAZNAS_beasiswa.png";
import logoKSE from "@/../../public/beasiswa/logo_KSE.png";
import logoEtos from "@/../../public/beasiswa/logo_ETOS-ID.png";
import logoBrilian from "@/../../public/beasiswa/logo-ybm-brilian.png";
import Link from "next/link";

export default function BeasiswaView() {
  const Beasiswa = [
    {
      title: "KIP KULIAH",
      url: "https://kip-kuliah.kemdikbud.go.id/",
      icon: logoTutWuri,
    },
    {
      title: "Beasiswa Unggulan",
      url: "https://beasiswaunggulan.kemdikbud.go.id/",
      icon: logoTutWuri,
    },
    {
      title: "KARYA SALEMBA EMPAT",
      url: "https://kse.or.id/home",
      icon: logoKSE,
    },
    {
      title: "BEASISWA YBM BRILiaN",
      url: "https://ybmbrilian.id/",
      icon: logoBrilian,
    },
    {
      title: "BEASISWA AFIRMASI PENDIDIKAN TINGGI (ADIK)",
      url: "https://adik.kemdikbud.go.id/",
      icon: logoTutWuri,
    },
    {
      title: "BEASISWA ETOS ID DOMPET DHUAFA",
      url: "https://www.dompetdhuafa.org/etos-id-dan-bakti-nusa-dua-beasiswa-dompet-dhuafa-untuk-mahasiswa/",
      icon: logoEtos,
    },
    {
      title: "BEASISWA BAZNAS",
      url: "https://beasiswa.baznas.go.id/?gclid=CjwKCAjwupGyBhBBEiwA0UcqaOoUnjZkIyHyyv_QdZXhd59gxBFKuhcYLEiuKszM5cx8XeLmXdj9ExoCyncQAvD_BwE",
      icon: logoBaznaz,
    },
  ];
  return (
    <>
      <div className="flex gap-8 p-3 flex-wrap justify-center ">
        {Beasiswa.map((beasiswa, index) => (
          <Link
            key={index}
            href={beasiswa.url}
            target="_blank"
            className="justify-center text-center bg-teal-400 align-middle rounded-lg flex flex-col p-4 justify-items-center hover:relative hover:scale-75 transition ease-in-out"
          >
            <Button type="button" className=" text-center font-bold text-white">
              {beasiswa.title}
            </Button>
            <Image
              src={beasiswa.icon}
              alt={beasiswa.title}
              width={300}
              height={300}
            />
          </Link>
        ))}
      </div>
    </>
  );
}
