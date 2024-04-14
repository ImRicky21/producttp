import Card from "@/components/fragment/card";
import Loader from "@/components/fragment/loader";
import AdminLayout from "@/components/layout/adminLayout";
import dosenService from "@/services/dosen";
import productService from "@/services/product";
import { Dosens } from "@/types/dosen.type";
import { Products } from "@/types/products.type";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaGraduationCap } from "react-icons/fa";
import { FaNewspaper } from "react-icons/fa6";

type PropsTypes = {
  dosens: Dosens[];
  products: Products[];
  allData: any;
};
function DashboardAdminView(props: PropsTypes) {
  const { dosens, products, allData } = props;
  const [dosenData, setDosenData] = useState<Dosens[]>([]);
  const [resultData, setResultData] = useState([]);
  const [productData, setProductData] = useState<Products[]>([]);
  const [isloading, setIsLoading] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(5);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = resultData.slice(indexOfFirstPost, indexOfLastPost);

  const paginateTable = (pageNumber: number) => setCurrentPage(pageNumber);

  useEffect(() => {
    setDosenData(dosens);
  }, [dosens]);
  useEffect(() => {
    setProductData(products);
  }, [products]);
  useEffect(() => {
    setResultData(allData);
  }, [allData]);
  const result = { resultData };

  return (
    <AdminLayout>
      <div className="align-middle justify-items-center items-center flex flex-col p-2 ">
        <div className="flex flex-col justify-items-center">
          <h1 className="text-3xl font-semibold mb-11 capitalize text-teal-400">
            admin page
          </h1>
          <div className="">
            <h2>Selamat Datang di Dashboard Admin</h2>
          </div>
        </div>
        <div className="flex flex-col gap-3 md:flex-row">
          {products.length > 0 && (
            <Card
              link="/admin/products"
              classname="text-center text-white flex flex-col justify-items-center w-60 hover:shadow-xl"
            >
              <div className="flex flex-row gap-2 justify-center items-center">
                <FaNewspaper className="text-5xl text-center" />
                <h1 className="text-xl"> Berita dan Pengumuman </h1>
              </div>
              <h1 className="text-xl font-bold tracking-widest">{`${products.length}`}</h1>
            </Card>
          )}
          {dosens.length > 0 && (
            <Card
              link="/admin/dosens"
              classname="text-center text-white flex flex-col justify-items-center w-60 hover:shadow-xl"
            >
              <div className="flex flex-row gap-2 justify-center items-center">
                <FaGraduationCap className="text-5xl" />

                <h1 className="text-xl">Dosen dan Staff</h1>
              </div>
              <h1 className="text-xl font-bold">{`${dosens.length}`}</h1>
            </Card>
          )}
        </div>
      </div>

      <div className="">
        <div>
          <h1 className="text-xl font-medium">Riwayat Update</h1>
          <table className="table-row ">
            <thead>
              <tr className="border border-slate-600">
                <th className="border border-slate-950">#</th>
                <th className="border border-slate-950">Image</th>
                <th className="border border-slate-950">Data</th>
                <th className="border border-slate-950">Tanggal</th>
                <th className="border border-slate-950 max-md:hidden">Tipe</th>
              </tr>
            </thead>
            <tbody>
              {currentPosts.map((result: any, index: number) => (
                <tr
                  className="odd:bg-slate-50 even:bg-slate-300"
                  key={result.id}
                >
                  <td className="border border-slate-950">{index + 1}</td>
                  <td className="border border-slate-950">
                    <Image
                      src={result.image}
                      width={100}
                      height={100}
                      alt={result.name || result.title}
                    />
                  </td>
                  <td className="border border-slate-950">
                    {result.title || result.name}
                  </td>
                  <td className="border border-slate-950">
                    {result.createdAt &&
                      new Date(parseInt(result.createdAt)).toLocaleDateString(
                        "id-ID",
                        {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        }
                      )}
                  </td>
                  <td className="border border-slate-950 truncate max-md:hidden">
                    {result?.title ? "Berita/Pengumuman" : "Dosen"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-center mt-4">
          {resultData.length > postsPerPage && (
            <ul className="flex">
              {Array.from({
                length: Math.ceil(resultData.length / postsPerPage),
              }).map((_, index) => (
                <li key={index}>
                  <button
                    className={`mx-1 px-3 py-1 rounded ${
                      currentPage === index + 1
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200"
                    }`}
                    onClick={() => paginateTable(index + 1)}
                  >
                    {index + 1}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}

export default DashboardAdminView;
