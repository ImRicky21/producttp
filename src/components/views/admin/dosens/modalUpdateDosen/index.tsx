import Loader from "@/components/fragment/loader";
import InputFile from "@/components/ui/InputFile";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import { Modal } from "@/components/ui/modals";
import Select from "@/components/ui/select";
import { uploadFile } from "@/lib/firebase/service";
import dosenService from "@/services/dosen";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { FormEvent, useState } from "react";
import Swal from "sweetalert2";

const ModalUpdateDosen = (props: any) => {
  const { updatedDosen, setUpdatedDosen, setDosensData } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const session: any = useSession();
  const uploadImage = (id: string, form: any) => {
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
            const data = {
              image: newImageUrl,
            };
            const result = await dosenService.updateDosen(
              id,
              data,
              session.data?.accessToken
            );
            if (result.status === 200) {
              console.log(result);
              setIsLoading(false);
              setUploadedImage(null);
              form.reset();
              setUpdatedDosen({});
              const { data } = await dosenService.getAllDosens();
              console.log(data.data);
              setDosensData(data.data);
              Swal.fire({
                icon: "success",
                title: "Success",
                text: "Dosen telah diupdate",
              });
            } else {
              Swal.fire({
                icon: "error",
                title: "Failed",
                text: "Dosen tidak bisa diupdate",
              });
            }
          }
        }
      );
    }
  };

  const updateDosen = async (
    form: any,
    newImageUrl: string = updatedDosen.image
  ) => {
    const data = {
      name: form.fullname.value,
      nip: form.nip.value,
      scholar: form.scholar.value,
      phone: form.phone.value,
      image: newImageUrl,
      position: form.position.value,
    };
    const result = await dosenService.updateDosen(
      updatedDosen.id,
      data,
      session.data?.accessToken
    );

    if (result.status === 200) {
      console.log(result);
      setIsLoading(false);
      setUploadedImage(null);
      form.reset();
      setUpdatedDosen({});
      const { data } = await dosenService.getAllDosens();
      console.log(data.data);
      setDosensData(data.data);
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Dosen telah diupdate",
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: "Dosen tidak bisa diupdate",
      });
    }
  };
  const hanldeUpdateDosen = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const file = form.image.files[0];
    if (file) {
      const newName = "image-" + file.name.split(".")[1];
      uploadFile(
        updatedDosen.id,
        file,
        newName,
        "dosens",
        async (status: boolean, newImageUrl: string) => {
          if (status) {
            updateDosen(form, newImageUrl);
          } else {
            setIsLoading(false);
            Swal.fire({
              icon: "error",
              title: "Failed",
              text: "Dosen tidak bisa diupdate",
            });
          }
        }
      );
    } else {
      updateDosen(form);
    }
  };
  return (
    <Modal
      onClose={() => setUpdatedDosen({})}
      className="w-screen h-screen flex justify-center align-middle z-50 fixed top-0 backdrop-blur-md"
    >
      <div className="w-full p-4 bg-tertiary rounded-md">
        <h1 className="text-2xl text-center p-3 m-4">Tambah Dosen </h1>
        <form onSubmit={hanldeUpdateDosen} className="grid grid-cols-2">
          <div className="grid grid-cols-1 gap-5 p-3">
            <div className="grid grid-cols-1 gap-8 ">
              <Input
                id="fullname"
                label="Nama"
                defaultValue={updatedDosen.name}
                type="text"
                name="fullname"
                placeholder="Nama"
              />
              <Input
                id="nip"
                label="NIP"
                type="text"
                name="nip"
                defaultValue={updatedDosen.nip}
                placeholder="NIP"
              />
            </div>

            <div className="grid grid-cols-1 gap-8 py-5">
              <Input
                id="scholar"
                defaultValue={updatedDosen.scholar}
                label="scholar"
                type="text"
                name="scholar"
                placeholder="scholar"
              />
              <Input
                id="phone"
                label="Nomor Telepon"
                type="text"
                defaultValue={updatedDosen.phone}
                name="phone"
                placeholder="Nomor Telepon"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 w-full">
            <div>
              <div className="w-72 border border-solid border-slate-100 align-middle items-center text-center grid grid-cols-1 ">
                {!isLoading ? (
                  <Image
                    alt="image"
                    src={
                      uploadedImage
                        ? URL.createObjectURL(uploadedImage)
                        : updatedDosen.image
                    }
                    width={400}
                    height={200}
                  />
                ) : (
                  <Loader loaderColor="#23453" />
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
                defaultValue={updatedDosen.position}
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
          <Button type="submit" className={`mt-3 p-2 rounded-md bg-cyan-500`}>
            {isLoading ? "Loading..." : "Submit"}
          </Button>
        </form>
      </div>
    </Modal>
  );
};
export default ModalUpdateDosen;
