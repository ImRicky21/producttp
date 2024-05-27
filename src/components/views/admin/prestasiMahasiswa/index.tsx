import Accordion from "@/components/fragment/accordion";
import AdminLayout from "@/components/layout/adminLayout";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import prestasiMahasiswaService from "@/services/prestasimahasiswa";
import { Prestasi } from "@/types/prestasi.type";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa6";
import Swal from "sweetalert2";

type PropsTypes = {
  prestasi: Prestasi[];
};
export default function PrestasiMahasiswaAdminView(props: PropsTypes) {
  const { prestasi } = props;
  const [prestasiData, setPrestasiData] = useState<Prestasi[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const session: any = useSession();

  const onSubmit = async (event: any) => {
    event.preventDefault();
    const form: any = event.target as HTMLFormElement;
    let data = {
      name: form.name.value,
      nim: form.nim.value,
      title: form.title.value,
      level: form.level.value,
      link: form.link.value,
    };

    const result = await prestasiMahasiswaService.addPrestasi(
      data,
      session.data?.accessToken
    );
    if (result.status === 200) {
      const { data } = await prestasiMahasiswaService.getAllPrestasi();
      setPrestasiData(data.data);
      form.reset();
      Swal.fire({
        icon: "success",
        title: "Success",
      });
      console.log(data.data);
    }
  };

  const deleteData = async (id: string) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await prestasiMahasiswaService.deletePrestasi(
          id,
          session.data?.accessToken
        );
        const { data } = await prestasiMahasiswaService.getAllPrestasi();
        setPrestasiData(data.data);
        Swal.fire("Deleted!", "Data sudah terhapus.", "success");
      } catch (error) {
        console.error("Error delete data:", error);
        Swal.fire("Error!", "Failed to delete data.", "error");
      }
    }
  };

  useEffect(() => {
    setPrestasiData(prestasi);
    setIsLoading(false);
  }, [prestasi]);

  return (
    <AdminLayout>
      <>
        <div>
          <h1 className="text-center text-2xl">Prestasi Mahasiswa</h1>
        </div>
        <div>
          <Accordion title="Tambah Prestasi Mahasiswa">
            <form onSubmit={onSubmit}>
              <div className="flex flex-col gap-8 px-4">
                <Input
                  type="text"
                  label="Nama"
                  name="name"
                  placeholder="Masukkan nama"
                />
                <Input
                  type="text"
                  label="Nim"
                  name="nim"
                  placeholder="Masukkan NIM"
                />
                <Input
                  type="text"
                  label="Nama Lomba"
                  name="title"
                  placeholder="Masukkan nama lomba"
                />
                <Input
                  type="text"
                  label="Tingkat"
                  name="level"
                  placeholder="Tingkat lomba"
                />
                <Input
                  type="text"
                  label="Link Sertifikat"
                  name="link"
                  placeholder="Sertifikat Lomba"
                />

                {/* <Select
                name="label"
                label="Status"
                options={[
                  { label: "Tampilkan", value: "tampilkan" },
                  { label: "Simpan", value: "simpan" },
                ]}
              /> */}
                <Button
                  type="submit"
                  className=" w-1/4 p-3 mt-3 bg-sky-500 rounded-md text-white transition hover:bg-sky-600 ease-in-out"
                >
                  Tambahkan
                </Button>
              </div>
            </form>
          </Accordion>
        </div>
        <div className="p-4">
          <table className="table w-full">
            <thead>
              <tr className="border border-slate-600">
                <th>No</th>
                <th>Nama</th>
                <th>Lomba</th>
                <th>Tingkat</th>
                <th>Link</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {prestasiData.map((data: any, index: number) => (
                <tr
                  className="odd:bg-slate-50 even:bg-slate-300 border m-4 p-3 text-center gap-7"
                  key={index}
                >
                  <td>{index + 1}</td>
                  <td>{data.name}</td>
                  <td>{data.title}</td>
                  <td>{data.level}</td>
                  <td className="text-ellipsis">{data.link}</td>
                  <td className="flex gap-3">
                    <Button
                      type="button"
                      onClick={() => deleteData(data.id)}
                      className="text-center p-3 bg-red-500 rounded-md text-white transition hover:bg-red-600 ease-in-out"
                    >
                      <FaTrash />
                    </Button>
                    <Button
                      type="button"
                      onClick={() => {}}
                      className="text-center p-3 bg-sky-500 rounded-md text-white transition hover:bg-sky-600 ease-in-out"
                    >
                      <FaEdit />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </>
    </AdminLayout>
  );
}
