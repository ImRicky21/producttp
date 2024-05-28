import AdminLayout from "@/components/layout/adminLayout";
import Button from "@/components/ui/button";
import { Facilities } from "@/types/facility.type";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa6";
import AccordionAddFacility from "./modalAddFacility";
import facilityServices from "@/services/facility";
import Swal from "sweetalert2";
import Accordion from "@/components/fragment/accordion";
import Input from "@/components/ui/input";
import TextArea from "@/components/ui/textarea";
import InputFile from "@/components/ui/InputFile";
import Select from "@/components/ui/select";
import { deleteFile, uploadFile } from "@/lib/firebase/service";
import ModalDeleteFacility from "./modalDeleteFacility";
import { FaEdit } from "react-icons/fa";
import ModalUpdateFacility from "./modalUpdateFacility";

type PropsTypes = {
  facilities: Facilities[];
};
export default function FacilitiesAdnimView(props: PropsTypes) {
  const { facilities } = props;
  const [facilitiesData, setFacilitiesData] = useState<Facilities[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [deletedFacility, setDeletedFacility] = useState<any>({});
  const [updatedFacility, setUpdatedFacility] = useState<any>({});

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
              setIsLoading(false);
              const { data } = await facilityServices.getAllFacilities();
              setFacilitiesData(data.data);
              console.log(data.data);
              setUploadedImage(null);
              form.reset();
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
      setIsLoading(true);
      uploadImage(result.data.data.id, form);
      const { data } = await facilityServices.getAllFacilities();
      console.log(data.data);
      setFacilitiesData(data.data);
    }
  };
  useEffect(() => {
    setFacilitiesData(facilities);
  }, [facilities]);
  return (
    <>
      <AdminLayout>
        <div className="p-9 flex flex-col flex-wrap justify-center w-full">
          <div>
            <h1 className="text-3xl text-center font-bold uppercase p-4">
              Fasilitas
            </h1>
          </div>

          <div className="mb-5 rounded-2xl">
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
                    className={` w-1/4 p-3 mt-3 bg-sky-500 rounded-md text-white transition hover:bg-sky-600 ease-in-out ${
                      isLoading
                        ? "cursor-not-allowed disabled: bg-sky-300 hover:bg-sky-300"
                        : ""
                    }`}
                  >
                    {isLoading ? "Loading..." : "Simpan"}
                  </Button>
                </div>
              </form>
            </Accordion>
          </div>
          <div>
            <table className="table table-auto p-5 w-full text-center border-collapse capitalize">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Foto</th>
                  <th>Nama</th>
                  <th>Deskripsi</th>
                  <th>Status</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {facilities.map((facility, index) => (
                  <tr
                    key={facility.id}
                    className="border odd:bg-slate-50 even:bg-slate-300 "
                  >
                    <td>{index + 1}</td>
                    <td className="flex justify-center items-center">
                      {facility.imageUrl && (
                        <Image
                          src={facility.imageUrl}
                          alt="image"
                          width={150}
                          height={150}
                        />
                      )}
                    </td>
                    <td>{facility.title}</td>
                    <td>{facility.description}</td>
                    <td>{`${facility.label}`}</td>
                    <td>
                      <div className="flex justify-around flex-wrap">
                        <Button
                          type="button"
                          onClick={() => setDeletedFacility(facility)}
                        >
                          <FaTrash className="text-red-500 text-3xl" />
                        </Button>
                        <Button
                          type="button"
                          onClick={() => setUpdatedFacility(facility)}
                        >
                          <FaEdit className="text-sky-500 text-3xl" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </AdminLayout>
      {Object.keys(deletedFacility).length > 0 && (
        <ModalDeleteFacility
          setFacilitiesData={setFacilitiesData}
          setDeletedFacility={setDeletedFacility}
          deletedFacility={deletedFacility}
        />
      )}
      {Object.keys(updatedFacility).length > 0 && (
        <ModalUpdateFacility
          setFacilitiesData={setFacilitiesData}
          setUpdatedFacility={setUpdatedFacility}
          updatedFacility={updatedFacility}
        />
      )}
    </>
  );
}
