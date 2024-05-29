import { Prestasi } from "@/types/prestasi.type";
import Link from "next/link";
import { useEffect, useState } from "react";

type PropsTypes = {
  prestasi: Prestasi[];
};
export default function PrestasiMahasiswaView(props: PropsTypes) {
  const { prestasi } = props;
  const [prestasiData, setPrestasiData] = useState<Prestasi[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setPrestasiData(prestasi);
    setIsLoading(false);
  }, [prestasi]);

  return (
    <div>
      <div className="p-8">
        <table className="table w-full">
          <thead className="bg-teal-100">
            <tr className="border border-slate-600">
              <th>No</th>
              <th>Nama</th>
              <th>Lomba</th>
              <th>Tingkat</th>
              <th>Link</th>
            </tr>
          </thead>
          <tbody>
            {prestasiData.map((data: any, index: number) => (
              <tr
                className="odd:bg-slate-50 even:bg-sky-200 border m-4 p-3 text-center gap-7"
                key={index}
              >
                <td>{index + 1}</td>
                <td>{data.name}</td>
                <td>{data.title}</td>
                <td>{data.level}</td>
                <td className="text-ellipsis py-3">
                  <Link
                    href={data.link}
                    target="_blank"
                    className="text-red-600"
                  >
                    klik Disini
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
