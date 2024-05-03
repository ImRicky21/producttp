import Accordion from "@/components/fragment/accordion";
import InputFile from "@/components/ui/InputFile";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import Select from "@/components/ui/select";
import TextArea from "@/components/ui/textarea";
import { uploadFile } from "@/lib/firebase/service";
import facilityServices from "@/services/facility";
import { Facilities } from "@/types/facility.type";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { Dispatch, SetStateAction, useState } from "react";
import Swal from "sweetalert2";

type PropsTypes = {
  setAddFacilities: Dispatch<SetStateAction<boolean>>;
  setFacilitiesData: Dispatch<SetStateAction<Facilities[]>>;
};
export default function AccordionAddFacility(props: PropsTypes) {
  const { setAddFacilities, setFacilitiesData } = props;
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
        "facilities",
        async (status: boolean, newImageUrl: string) => {
          if (status) {
            const data = { imageUrl: newImageUrl };
            const result = await facilityServices.updateFacility(
              id,
              data,
              session.data?.accessToken
            );
            if (result.status === 200) {
              setIsLoading(true);
              setUploadedImage(null);
              form.reset();
              const { data } = await facilityServices.getAllFacilities();
              setFacilitiesData(data.data);
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
      form.title.value === "" ||
      form.description.value === "" ||
      form.label.value === ""
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
      description: form.description.value,
      imageUrl: "",
      label: form.label.value,
    };

    const result = await facilityServices.addFacility(
      data,
      session.data?.accessToken
    );
    if (result.status === 200) {
      uploadImage(result.data.data.id, form);
      const { data } = await facilityServices.getAllFacilities();
      setFacilitiesData(data.data);
    }
  };

  return (
    <Accordion title="Tambah Fasilitas">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-7 px-4">
          <Input
            type="text"
            label="Nama"
            name="title"
            placeholder="Enter name"
          />
          <TextArea
            type="text"
            label="Deskripsi"
            name="description"
            placeholder="Enter description"
          />
          <div className="flex flex-col justify-center items-center gap-2 ">
            {uploadedImage && (
              <Image
                src={URL.createObjectURL(uploadedImage)}
                alt="image"
                width={350}
                height={450}
              />
            )}
            <InputFile
              className="bg-teal-300 rounded-md p-1"
              type="file"
              title="Upload Image"
              label="Gambar"
              name="image"
              setUploadedImage={setUploadedImage}
              uploadedImage={uploadedImage}
            />
          </div>
          <Select
            name="label"
            label="Status"
            options={[
              { label: "Tampilkan", value: "tampilkan" },
              { label: "Simpan", value: "simpan" },
            ]}
          />
          <Button
            type="submit"
            className=" w-1/4 p-3 mt-3 bg-sky-500 rounded-md text-white transition hover:bg-sky-600 ease-in-out"
          >
            Simpan
          </Button>
        </div>
      </form>
    </Accordion>
  );
}
