import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import { Modal } from "@/components/ui/modals";
import prestasiMahasiswaService from "@/services/prestasimahasiswa";
import { useSession } from "next-auth/react";
import { useState } from "react";
import Swal from "sweetalert2";

export default function ModalUpdatePrestasi(props: any) {
  const { updatedPrestasi, setUpdatedPrestasi, setPrestasiData } = props;
  const [isLoading, setIsLoading] = useState(false);
  const session: any = useSession();

  const updatePrestasi = async (form: any) => {
    let data = {
      name: form.name.value,
      nim: form.nim.value,
      title: form.title.value,
      level: form.level.value,
      link: form.link.value,
    };
    const result = await prestasiMahasiswaService.updatePrestasi(
      updatedPrestasi.id,
      data,
      session.data?.accessToken
    );
    if (result.status === 200) {
      const { data } = await prestasiMahasiswaService.getAllPrestasi();
      setPrestasiData(data.data);
      setIsLoading(false);
      form.reset();
      Swal.fire({
        icon: "success",
        title: "Success",
      });
      console.log(data.data);
    }
  };

  return (
    <Modal
      onClose={() => setUpdatedPrestasi({})}
      name="modal-update-prestasi"
      className="w-screen h-screen flex flex-wrap justify-center align-middle z-50 fixed top-0 backdrop-blur-md "
    >
      <form onSubmit={() => {}} className="w-full p-4 bg-tertiary rounded-md">
        <h1 className="text-2xl text-center p-3 font-semibold">
          Update Prestasi
        </h1>
        <div className="flex flex-col gap-8 px-7">
          <Input
            type="text"
            label="Nama"
            name="name"
            placeholder="Masukkan nama"
            defaultValue={updatedPrestasi.name}
          />
          <Input
            type="text"
            label="Nim"
            name="nim"
            placeholder="Masukkan NIM"
            defaultValue={updatedPrestasi.nim}
          />
          <Input
            type="text"
            label="Nama Lomba"
            name="title"
            placeholder="Masukkan nama lomba"
            defaultValue={updatedPrestasi.title}
          />
          <Input
            type="text"
            label="Tingkat"
            name="level"
            placeholder="Tingkat lomba"
            defaultValue={updatedPrestasi.level}
          />
          <Input
            type="text"
            label="Link Sertifikat"
            name="link"
            placeholder="Sertifikat Lomba"
            defaultValue={updatedPrestasi.link}
          />

          <Button
            type="submit"
            className=" p-3 mt-3 bg-sky-500 rounded-md text-white transition hover:bg-sky-600 ease-in-out"
          >
            {isLoading ? "Loading..." : "Update"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
