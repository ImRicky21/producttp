import AdminLayout from "@/components/layout/adminLayout";
import { Dosens } from "@/types/dosen.type";
import { useEffect, useState } from "react";
import ModalAddDosen from "./modalAddDosen";
import Button from "@/components/ui/button";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import ModalDeleteDosen from "./modalDeleteDosen";
import ModalUpdateDosen from "./modalUpdateDosen";
import Loader from "@/components/fragment/loader";
import Input from "@/components/ui/input";
import { useSearchParams } from "next/navigation";

type PropsTypes = {
  dosens: Dosens[];
};
function DosenAdminView(props: PropsTypes) {
  const { dosens } = props;
  const [dosenData, setDosenData] = useState<Dosens[]>([]);
  const [modalAddDosen, setModalAddDosen] = useState(false);
  const [deletedDosen, setDeletedDosen] = useState<any>({});
  const [updatedDosen, setUpdatedDosen] = useState<any>({});
  const [isLoading, setIsLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(5);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = dosenData.slice(indexOfFirstPost, indexOfLastPost);

  const paginateTable = (pageNumber: number) => setCurrentPage(pageNumber);

  useEffect(() => {
    setDosenData(dosens);
  }, [dosens]);

  return (
    <>
      <AdminLayout>
        {isLoading ? (
          <div>
            <Loader loaderColor="#C08B5C" />
          </div>
        ) : (
          <div className="p-5 justify-center">
            <div className="grid grid-cols-1 gap-5 w-full p-4 px-6">
              <h2 className="text-xl text-center font-bold">
                Halaman Data Dosen
              </h2>
            </div>
            <div>
              <Button
                type="button"
                onClick={() => setModalAddDosen(true)}
                className="mb-2 flex border border-solid border-sky-600 px-2 rounded-md group hover:bg-teal-300 transition-all"
              >
                Tambahkan Dosen
              </Button>
            </div>
            <div className="mb-2"></div>
            <table className="table-auto p-5 w-full text-center">
              <thead>
                <tr className="border border-slate-600">
                  <th className="border border-slate-950">#</th>
                  <th className="border border-slate-950">Image</th>
                  <th className="border border-slate-950">Nama</th>
                  <th className="border border-slate-950">NIP</th>
                  <th className="border border-slate-950">Jabatan</th>
                  <th className="border border-slate-950">Scholar</th>
                  <th className="border border-slate-950">Nomor Telepon</th>
                  <th className="border border-slate-950">action</th>
                </tr>
              </thead>
              <tbody>
                {currentPosts.length > 0 ? (
                  currentPosts
                    .sort(
                      (a, b) =>
                        new Date(a.createdAt).getTime() -
                        new Date(b.createdAt).getTime()
                    )
                    .map((dosen: any, index: number) => (
                      <tr
                        className="odd:bg-slate-50 even:bg-slate-300"
                        key={dosen.id}
                      >
                        <td className=" border border-slate-600">
                          {index + 1}
                        </td>
                        <td className=" align-middle border border-slate-600">
                          <Image
                            src={dosen.image}
                            alt={dosen.name}
                            width={200}
                            height={200}
                            className={`${
                              isLoading ? "animate-pulse filter grayscale" : ""
                            }`}
                          />
                        </td>
                        <td className=" border border-slate-600 text-left pl-2">
                          {dosen.name}
                        </td>
                        <td className=" border border-slate-600">
                          {dosen.nip}
                        </td>
                        <td className=" border border-slate-600">
                          {dosen.position}
                        </td>
                        <td className=" border border-slate-600">
                          <Link
                            href={`https://scholar.google.com/citations?user=${dosen.scholar}`}
                            target="_blank"
                          >
                            {dosen.scholar}
                          </Link>
                        </td>
                        <td className=" border border-slate-600">
                          <Link
                            href={`https://api.whatsapp.com/send/?phone=${dosen.phone}&text&type=phone_number&app_absent=0`}
                            target="_blank"
                          >
                            {dosen.phone}
                          </Link>
                        </td>
                        <td className="border border-slate-600 ">
                          <div className="grid grid-cols-2 gap-4 m-3 text-center justify-items-center">
                            <Button
                              className=""
                              type="button"
                              onClick={() => setUpdatedDosen(dosen)}
                            >
                              <FaEdit className="text-sky-600 text-3xl" />
                            </Button>
                            <Button
                              className=""
                              type="button"
                              onClick={() => setDeletedDosen(dosen)}
                            >
                              <FaTrashAlt className="text-red-700 text-3xl" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))
                ) : (
                  <tr>
                    <td colSpan={8} className="text-center py-4 text-gray-600">
                      Belum ada Data
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            <div className="flex justify-center mt-4">
              {dosenData.length > postsPerPage && (
                <ul className="flex">
                  {Array.from({
                    length: Math.ceil(dosenData.length / postsPerPage),
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
        )}
      </AdminLayout>
      {modalAddDosen && (
        <ModalAddDosen
          setModalAddDosen={setModalAddDosen}
          setDosensData={setDosenData}
        />
      )}
      {Object.keys(deletedDosen).length && (
        <ModalDeleteDosen
          deletedDosen={deletedDosen}
          setDeletedDosen={setDeletedDosen}
          setDosensData={setDosenData}
        />
      )}
      {Object.keys(updatedDosen).length && (
        <ModalUpdateDosen
          updatedDosen={updatedDosen}
          setUpdatedDosen={setUpdatedDosen}
          setDosensData={setDosenData}
        />
      )}
    </>
  );
}
export default DosenAdminView;
