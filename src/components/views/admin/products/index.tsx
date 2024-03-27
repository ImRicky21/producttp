import AdminLayout from "@/components/layout/adminLayout";
import Button from "@/components/ui/button";
import { Products } from "@/types/products.type";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaEdit, FaPlus, FaTrashAlt } from "react-icons/fa";
import ModalAddProduct from "./modalAddProduct";
import ModalDeleteProduct from "./modalDeleteProduct";

type PropsTypes = {
  products: Products[];
};
export default function AdminProductView(props: PropsTypes) {
  const { products } = props;
  const [productsData, setProductsData] = useState<Products[]>([]);
  const [modalAddProduct, setModalAddProduct] = useState(false);
  const [deletedProduct, setDeletedProduct] = useState<any>({});

  useEffect(() => {
    setProductsData(products);
  }, [products]);
  return (
    <>
      <AdminLayout>
        <div className="p-5">
          <div className="grid grid-cols-1 gap-5 w-full p-4 px-6">
            <h2 className="text-xl text-center font-bold">Admin User Page</h2>
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
                <th className="border border-slate-950">Foto</th>
                <th className="border border-slate-950">Judul</th>
                <th className="border border-slate-950">Deskripsi</th>
                <th className="border border-slate-950">Tanggal</th>
                <th className="border border-slate-950">Penulis</th>
                <th className="border border-slate-950">Status</th>
                <th className="border border-slate-950">action</th>
              </tr>
            </thead>
            <tbody>
              {productsData.map((product: any, index: number) => (
                <tr
                  className="odd:bg-slate-50 even:bg-slate-300"
                  key={product.id}
                >
                  <td className=" border border-slate-600">{index + 1}</td>
                  <td className=" border border-slate-600 text-left pl-2">
                    <Image
                      src={product.image}
                      width={300}
                      height={300}
                      alt={product.title}
                    />
                  </td>
                  <td className=" border border-slate-600">{product.title}</td>
                  <td className=" border border-slate-600 text-left line-clamp-6 w-72">
                    {product.description}
                  </td>
                  <td className=" border border-slate-600">{product.date}</td>
                  <td className=" border border-slate-600">
                    {product.createdBy}
                  </td>
                  <td className=" border border-slate-600">
                    {product.status ? "Publish" : "Draft"}
                  </td>
                  <td className="border border-slate-600 ">
                    <div className="grid grid-cols-2 gap-4 m-3 text-center justify-items-center">
                      <Button className="" type="button" onClick={() => {}}>
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
              ))}
            </tbody>
          </table>
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
    </>
  );
}
