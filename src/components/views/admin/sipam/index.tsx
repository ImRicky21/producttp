import Accordion from "@/components/fragment/accordion";
import AdminLayout from "@/components/layout/adminLayout";
import InputFile from "@/components/ui/InputFile";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import Select from "@/components/ui/select";
import TextArea from "@/components/ui/textarea";
import sipamService from "@/services/sipam";
import { Sipam } from "@/types/sipam.type";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa6";
import Swal from "sweetalert2";

type PropsTypes = {
  sipams: Sipam[];
};
export default function SipamView(props: PropsTypes) {
  const { sipams } = props;
  const [Datasipam, setDataSipam] = useState<Sipam[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const session: any = useSession();
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const form: any = event.target as HTMLFormElement;
    if (
      form.title.value === "" ||
      form.link.value === ""
      // form.label.value === ""
    ) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Harap lengkapi semua field dalam formulir.",
      });
      return;
    }
    let data = {
      title: form.title.value,
      link: form.link.value,
      // label: form.label.value,
    };

    const result = await sipamService.addSipam(data, session.data?.accessToken);
    if (result.status === 200) {
      const { data } = await sipamService.getAllSipam();
      setDataSipam(data.data);
      form.reset();
      Swal.fire({
        icon: "success",
        title: "Success",
      });
      console.log(data.data);
    }
  };

  const handleDelete = async (id: string) => {
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
        await sipamService.deleteSipam(id, session.data?.accessToken);
        const { data } = await sipamService.getAllSipam();
        setDataSipam(data.data);
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      } catch (error) {
        console.error("Error deleting SIPAM:", error);
        Swal.fire("Error!", "Failed to delete SIPAM.", "error");
      }
    }
  };

  useEffect(() => {
    setDataSipam(sipams);
    setIsLoading(false);
  }, [sipams]);
  console.log(Datasipam);

  if (isLoading) {
    console.log(Datasipam);
  }
  return (
    <AdminLayout>
      <>
        <div className="text-center p-5 font-bold text-2xl text-teal-400">
          <h1>SISTEM INFORMASI DAN PELAYANAN AKADEMIK MAHASISWA</h1>
        </div>
        <Accordion title="Tambah SISTEM INFORMASI DAN PELAYANAN AKADEMIK MAHASISWA">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-8 px-4">
              <Input
                type="text"
                label="Nama"
                name="title"
                placeholder="Enter name"
              />
              <Input
                type="text"
                label="Link"
                name="link"
                placeholder="Enter link"
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
        <div className="p-9 flex flex-col flex-wrap justify-center w-full">
          <table className="table-auto p-5 w-full text-center">
            <thead>
              <tr className="border border-slate-600">
                <th>No</th>
                <th>Title</th>
                <th>Link</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody className="">
              {Datasipam.map((sipam: any, index: any) => (
                <tr
                  key={sipam.id}
                  className="border odd:bg-slate-50 even:bg-slate-300 "
                >
                  <td className="border border-x-2">{index + 1}</td>
                  <td className="border border-x-2">{sipam.title}</td>
                  <td className="border border-x-2">{sipam.link}</td>
                  <td>
                    <Button
                      type="button"
                      onClick={() => handleDelete(sipam.id)}
                    >
                      <FaTrash className="text-red-500 text-3xl" />
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
