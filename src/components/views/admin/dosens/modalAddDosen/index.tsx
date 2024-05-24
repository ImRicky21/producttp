import InputFile from "@/components/ui/InputFile";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import { Modal } from "@/components/ui/modals";
import Select from "@/components/ui/select";
import { uploadFile } from "@/lib/firebase/service";
import dosenService from "@/services/dosen";
import { Dosens } from "@/types/dosen.type";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { Dispatch, SetStateAction, useRef, useState } from "react";
import Swal from "sweetalert2";

type PropsTypes = {
  setModalAddDosen: Dispatch<SetStateAction<boolean>>;
  setDosensData: Dispatch<SetStateAction<Dosens[]>>;
};

function ModalAddDosen(props: PropsTypes) {
  const { setModalAddDosen, setDosensData } = props;
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const session: any = useSession();

  const uploadImage = async (id: string, form: any) => {
    const file = form.image.files[0];
    const newName = "image-" + file.name.split(".")[1];
    if (file) {
      uploadFile(
        id,
        file,
        newName,
        "dosens",
        async (status: boolean, newImageUrl: string) => {
          if (status) {
            const data = { image: newImageUrl };
            const result = await dosenService.updateDosen(
              id,
              data,
              session.data?.accessToken
            );
            if (result.status === 200) {
              setIsLoading(true);
              setUploadedImage(null);
              form.reset();
              setModalAddDosen(false);
              const { data } = await dosenService.getAllDosens();
              setDosensData(data.data);
              Swal.fire({
                icon: "success",
                title: "Success",
                text: "Dosen telah ditambahkan",
              });
            }
          }
        }
      );
    }
  };
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const form: any = event.target as HTMLFormElement;

    if (
      form.fullname.value === "" ||
      form.nip.value === "" ||
      form.scholar.value === "" ||
      form.phone.value === "" ||
      form.position.value === "" ||
      form.image.files.length === 0
    ) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Harap lengkapi semua field dalam formulir.",
      });
      return;
    }

    let data = {
      name: form.fullname.value,
      nip: form.nip.value,
      scholar: form.scholar.value,
      phone: form.phone.value,
      image: "",
      position: form.position.value,
    };

    const result = await dosenService.addDosen(data, session.data?.accessToken);
    if (result.status === 200) {
      uploadImage(result.data.data.id, form);
    }
  };
  return (
    <Modal
      onClose={() => setModalAddDosen(false)}
      className="w-screen h-screen flex justify-center align-middle z-50 fixed top-0 backdrop-blur-md"
    >
      <div className="w-full p-4 bg-tertiary rounded-md">
        <h1 className="text-2xl text-center p-3 m-4">Tambah Dosen </h1>
        <form onSubmit={handleSubmit} className="grid grid-cols-2">
          <div className="grid grid-cols-1 gap-5 p-3">
            <div className="grid grid-cols-1 gap-8 ">
              <Input
                id="fullname"
                label="Nama"
                type="text"
                name="fullname"
                placeholder="Nama"
              />
              <Input
                id="nip"
                label="NIP"
                type="number"
                name="nip"
                placeholder="NIP"
              />
            </div>

            <div className="grid grid-cols-1 gap-8 py-5">
              <Input
                id="scholar"
                label="scholar"
                type="text"
                name="scholar"
                placeholder="scholar"
              />
              <Input
                id="phone"
                label="Nomor Telepon"
                type="text"
                name="phone"
                placeholder="Nomor Telepon"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 w-full">
            <div>
              <div className="w-72 bg-slate-100 align-middle items-center text-center grid grid-cols-1 ">
                {uploadedImage && (
                  <Image
                    alt="image"
                    src={URL.createObjectURL(uploadedImage)}
                    width={400}
                    height={200}
                  />
                )}
              </div>
              <InputFile
                title="Upload Foto"
                id="image"
                type="file"
                className="bg-slate-100 text-center align-middle rounded-md"
                label="Gambar"
                name="image"
                setUploadedImage={setUploadedImage}
                uploadedImage={uploadedImage}
              />

              <Select
                label="Jabatan"
                name="position"
                options={[
                  {
                    label: "Koordinator Program Studi",
                    value: "Koordinator program studi",
                  },
                  { label: "Sekretaris Prodi", value: "sekretaris prodi" },
                  {
                    label: "Pengelola Keuangan Prodi",
                    value: "Pengelola Keuangan Prodi",
                  },
                  { label: "Dosen", value: "dosen" },
                  {
                    label: "Tenaga Kependidikan",
                    value: "tenaga kependidikan",
                  },
                  { label: "Guru Besar", value: "guru besar" },
                  { label: "Tenaga Laboran", value: "tenaga laboran" },
                ]}
              />
            </div>
          </div>
          <Button
            type="submit"
            className={`mt-3 p-2 rounded-md  ${
              isLoading ? "disabled: bg-cyan-200" : "bg-cyan-500"
            }`}
          >
            {isLoading ? "Loading..." : "Submit"}
          </Button>
        </form>
      </div>
    </Modal>
  );
}

export default ModalAddDosen;
