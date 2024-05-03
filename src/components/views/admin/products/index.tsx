import AdminLayout from "@/components/layout/adminLayout";
import Button from "@/components/ui/button";
import { Products } from "@/types/products.type";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaEdit, FaPlus, FaTrashAlt } from "react-icons/fa";
import ModalAddProduct from "./modalAddProduct";
import ModalDeleteProduct from "./modalDeleteProduct";
import ModalUpdateProduct from "./modalUpdateProduct";

type PropsTypes = {
  products: Products[];
};
export default function AdminProductView(props: PropsTypes) {
  const { products } = props;
  const [productsData, setProductsData] = useState<Products[]>([]);
  const [modalAddProduct, setModalAddProduct] = useState(false);
  const [deletedProduct, setDeletedProduct] = useState<any>({});
  const [updatedProduct, setUpdatedProduct] = useState<any>({});
  const [isLoading, setIsLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(5);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = productsData.slice(indexOfFirstPost, indexOfLastPost);

  const paginateTable = (pageNumber: number) => setCurrentPage(pageNumber);

  useEffect(() => {
    setProductsData(products);
  }, [products]);
  return (
    <>
      <AdminLayout>
        <div className="p-5">
          <div className="grid grid-cols-1 gap-5 w-full p-4 px-6">
            <h2 className="text-xl text-center font-bold">Halaman Berita</h2>
          </div>
          <div className="m-3">
            <Button
              type="button"
              onClick={() => setModalAddProduct(true)}
              className="flex border border-solid border-sky-600 px-2 rounded-md group hover:bg-teal-300 transition-all"
            >
              <FaPlus className="text-sky-600 text-2xl group-hover:text-white " />
              <h2 className="text-xl font-medium group-hover:text-white">
                Tambah Berita
              </h2>
            </Button>
          </div>

          <table className="table-auto p-5 w-full text-center">
            <thead>
              <tr className="border border-slate-600">
                <th className="border border-slate-950">#</th>
                <th className="border border-slate-950 ">Foto</th>
                <th className="border border-slate-950">Judul</th>
                <th className="border border-slate-950 ">Tag</th>
                <th className="border border-slate-950 w-48">Deskripsi</th>
                <th className="border border-slate-950">Tanggal</th>
                <th className="border border-slate-950">Penulis</th>
                <th className="border border-slate-950">Status</th>
                <th className="border border-slate-950">action</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                // Tampilkan skeleton loader jika data sedang dimuat
                <tr>
                  <td colSpan={8} className="text-center py-4 animate-pulse">
                    <div className="animate-pulse flex space-x-4">
                      <div className="flex-1 space-y-4 py-1">
                        <div className="h-4 bg-gray-200 rounded w-3/4">
                          Loading
                        </div>
                        <div className="space-y-2">
                          <div className="h-4 bg-gray-200 rounded"></div>
                          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              ) : currentPosts.length > 0 ? (
                currentPosts.map((product: any, index: number) => {
                  return (
                    <tr
                      className="odd:bg-slate-50 even:bg-slate-300 border border-solid border-slate-500"
                      key={product.id}
                    >
                      <td className=" border-x-slate-500 border ">
                        {index + 1}
                      </td>
                      <td className=" align-middle flex justify-center items-center mt-4 border-x-slate-500 border">
                        <Image
                          src={product.image}
                          alt={product.title}
                          width={100}
                          height={100}
                        />
                      </td>
                      <td className=" border-x-slate-500 border w-36">
                        {product.title}
                      </td>
                      <td className="border-x-slate-500 border w-36">
                        {product.tag}
                      </td>
                      <td className=" border border-y-0 text-left line-clamp-6 w-72 h-32">
                        <p>{product.description}</p>
                      </td>
                      <td className="border-x-slate-500 border ">
                        {product.date
                          ? product.date
                          : product.createdAt &&
                            new Date(
                              parseInt(product.createdAt)
                            ).toLocaleDateString("id-ID", {
                              weekday: "long",
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                      </td>
                      <td className=" border-x-slate-500 border">
                        {product.createdBy}
                      </td>
                      <td
                        className={`border-x-slate-500 border border-y-0 uppercase ${
                          product.status !== "rilis"
                            ? "text-red-600 bg-rose-300"
                            : "text-green-600 bg-teal-300"
                        }`}
                      >
                        {product.status}
                      </td>
                      <td className="border border-slate-600 ">
                        <div className="grid grid-cols-2 gap-4 m-3 text-center justify-items-center">
                          <Button
                            className=""
                            type="button"
                            onClick={() => setUpdatedProduct(product)}
                          >
                            <FaEdit className="text-sky-600 text-3xl" />
                          </Button>
                          <Button
                            className=""
                            type="button"
                            onClick={() => setDeletedProduct(product)}
                          >
                            <FaTrashAlt className="text-red-700 text-3xl" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={8} className="text-center py-4 text-gray-600">
                    Berita belum tersedia
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          <div className="flex justify-center mt-4">
            {productsData.length > postsPerPage && (
              <ul className="flex">
                {Array.from({
                  length: Math.ceil(productsData.length / postsPerPage),
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
      {modalAddProduct && (
        <ModalAddProduct
          setModalAddProduct={setModalAddProduct}
          setProductsData={setProductsData}
        />
      )}
      {Object.keys(deletedProduct).length && (
        <ModalDeleteProduct
          deletedProduct={deletedProduct}
          setDeletedProduct={setDeletedProduct}
          setProductsData={setProductsData}
        />
      )}
      {Object.keys(updatedProduct).length && (
        <ModalUpdateProduct
          updatedProduct={updatedProduct}
          setUpdatedProduct={setUpdatedProduct}
          setProductsData={setProductsData}
        />
      )}
    </>
  );
}
