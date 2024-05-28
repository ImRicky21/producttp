import InputFile from "@/components/ui/InputFile";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input/";
import { Modal } from "@/components/ui/modals";
import Select from "@/components/ui/select";
import TextArea from "@/components/ui/textarea";
import { uploadFile } from "@/lib/firebase/service";
import facilityServices from "@/services/facility";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { FormEvent, useState } from "react";
import Swal from "sweetalert2";

const ModalUpdateFacility = (props: any) => {
  const { updatedFacility, setUpdatedFacility, setFacilitiesData } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const session: any = useSession();

  const updateFacility = async (
    form: any,
    newImageUrl: string = updatedFacility.image
  ) => {
    let data = {
      title: form.title.value,
      description: form.description.value,
      imageUrl: newImageUrl,
      label: form.label.value,
    };
    const result = await facilityServices.updateFacility(
      updatedFacility.id,
      data,
      session.data?.accessToken
    );

    if (result.status === 200) {
      console.log(result);
      setIsLoading(false);
      setUploadedImage(null);
      form.reset();
      setUpdatedFacility({});
      const { data } = await facilityServices.getAllFacilities();
      console.log(data.data);
      setFacilitiesData(data.data);
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "fasilitas telah diupdate",
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: "fasilitas tidak bisa diupdate",
      });
    }
  };
  const hanldeUpdateFacility = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const file = form.image.files[0];
    if (file) {
      const newName = "image-" + file.name.split(".")[1];
      uploadFile(
        updatedFacility.id,
        file,
        newName,
        "facilities",
        async (status: boolean, newImageUrl: string) => {
          if (status) {
            updateFacility(form, newImageUrl);
          } else {
            setIsLoading(false);
            Swal.fire({
              icon: "error",
              title: "Failed",
              text: "facilities tidak bisa diupdate",
            });
          }
        }
      );
    } else {
      updateFacility(form);
    }
  };
  return (
    <Modal
      onClose={() => setUpdatedFacility({})}
      className="w-screen h-screen flex flex-wrap justify-center align-middle z-50 fixed top-0 backdrop-blur-md"
    >
      <div className="w-full p-4 bg-tertiary rounded-md">
        <h1 className="text-2xl text-center p-3 m-4">Update Fasilitas </h1>
        <form
          onSubmit={hanldeUpdateFacility}
          className="w-full p-2 grid grid-cols-2 gap-3"
        >
          <div className=" flex flex-wrap flex-col  gap-9">
            <Input
              type="text"
              label="Nama"
              name="title"
              placeholder="Enter name"
              defaultValue={updatedFacility.title}
            />
            <TextArea
              type="text"
              label="Deskripsi"
              name="description"
              placeholder="Enter description"
              defaultValue={updatedFacility.description}
            />
          </div>
          <div>
            {" "}
            <div className="flex flex-col justify-center items-center gap-2 ">
              {uploadedImage && (
                <Image
                  src={
                    uploadedImage
                      ? URL.createObjectURL(uploadedImage)
                      : updatedFacility.image
                  }
                  alt="image"
                  width={250}
                  height={250}
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
              <Select
                name="label"
                label="Status"
                options={[
                  { label: "Tampilkan", value: "tampilkan" },
                  { label: "Simpan", value: "simpan" },
                ]}
                defaultValue={updatedFacility.label}
              />
            </div>
          </div>
          <Button
            type="submit"
            className={` p-3 mt-3 bg-sky-500 rounded-md text-white transition hover:bg-sky-600 ease-in-out ${
              isLoading
                ? "cursor-not-allowed disabled: bg-sky-300 hover:bg-sky-300"
                : ""
            }`}
          >
            {isLoading ? "Loading..." : "Simpan"}
          </Button>
        </form>
      </div>
    </Modal>
  );
};
export default ModalUpdateFacility;
