import Card from "@/components/fragment/card";
import { Dosens } from "@/types/dosen.type";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaGraduationCap, FaWhatsapp } from "react-icons/fa";

type PropsTypes = {
  dosens: Dosens[];
};
export default function DosenView(props: PropsTypes) {
  const { dosens } = props;
  const [dosensData, setDosensData] = useState<Dosens[]>([]);

  useEffect(() => {
    setDosensData(dosens);
  }, [dosens]);
  console.log(dosens);
  return (
    <>
      <div className="flex flex-col justify-center align-middle items-center">
        <div>
          <h1>ini Dosen page</h1>
        </div>
        <div className="flex flex-wrap items-center justify-center p-4 m-5 w-4/5">
          {dosensData
            .sort(
              (a, b) =>
                new Date(a.createdAt).getTime() -
                new Date(b.createdAt).getTime()
            )
            .map((dosen) => (
              <Card
                key={dosen.id}
                link="#"
                classname="min-h-96 max-h-auto w-64 m-10 text-center justify-center items-center group transition-all ease-in-out relative"
              >
                <div className="items-center justify-center hover:opacity-80 transition ease-in-out">
                  <Image
                    src={dosen.image}
                    width={200}
                    height={200}
                    alt={dosen.name}
                    className="rounded-md"
                  />
                </div>
                <div className="rounded-lg text-white group mt-4 absolute h-full -top-4 left-0 right-0 bottom-0 bg-black bg-opacity-75 opacity-0 hover:opacity-100 transition ease-in-out flex justify-center items-center">
                  <div className="text-center">
                    <h1 className="inline-block">{dosen.name}</h1>
                    <p className="inline-block">{dosen.position}</p>
                    <p className="inline-block">{dosen.nip}</p>
                    <div className="inline-block">
                      <p className="inline-block">{dosen.scholar}</p>
                      <Link
                        className="text-green-400 text-4xl"
                        href={`https://wa.me/${dosen.phone}`}
                        target="_blank"
                      >
                        <FaWhatsapp />
                      </Link>
                      <Link
                        className="text-cyan-500 text-4xl"
                        href={`https://scholar.google.com/citations?hl=en&user=${dosen.scholar}`}
                        target="_blank"
                      >
                        <FaGraduationCap />
                      </Link>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
        </div>
      </div>
    </>
  );
}