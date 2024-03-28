import InputFile from "@/components/ui/InputFile";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import { Modal } from "@/components/ui/modals";
import Select from "@/components/ui/select";
import { uploadFile } from "@/lib/firebase/service";
import dosenService from "@/services/dosen";
import { useSession } from "next-auth/react";
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
  const hanldeUpdateDosen = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.target as HTMLFormElement;
    const data = {
      name: form.fullname.value,
      nip: form.nip.value,
      scholar: form.scholar.value,
      phone: form.phone.value,
      image: "",
      position: form.position.value,
    };
    const result = await dosenService.updateDosen(
      updatedDosen.id,
      data,
      session.data?.accessToken
    );
    if (result.status === 200) {
      uploadImage(updatedDosen.id, form);
    }
  };
  return (
    <Modal
      onClose={() => setUpdatedDosen({})}
      className="w-screen h-screen flex justify-center align-middle z-50 fixed top-0 backdrop-blur-md"
    >
      <div className="w-full p-4 bg-tertiary rounded-md">
        <form onSubmit={hanldeUpdateDosen}>
          <Input
            id="fullname"
            label="Nama"
            type="text"
            name="fullname"
            placeholder="Nama"
            defaultValue={updatedDosen?.name}
          />
          <Input
            id="nip"
            label="NIP"
            type="text"
            name="nip"
            placeholder="NIP"
            defaultValue={updatedDosen?.nip}
          />
          <Input
            id="scholar"
            label="scholar"
            type="text"
            name="scholar"
            placeholder="scholar"
            defaultValue={updatedDosen?.scholar}
          />
          <Input
            id="phone"
            label="Nomor Telepon"
            type="text"
            name="phone"
            placeholder="Nomor Telepon"
            defaultValue={updatedDosen?.phone}
          />
          <InputFile
            type="file"
            label="Gambar"
            name="image"
            defaultValue={updatedDosen?.image}
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
              { label: "Tenaga Kependidikan", value: "tenaga kependidikan" },
              { label: "Guru Besar", value: "guru besar" },
              { label: "Tenaga Laboran", value: "tenaga laboran" },
            ]}
          />
          <Button type="submit" className={`mt-3 p-2 rounded-md bg-cyan-500`}>
            {isLoading ? "Loading..." : "Edit"}
          </Button>
        </form>
      </div>
    </Modal>
  );
};
export default ModalUpdateDosen;
