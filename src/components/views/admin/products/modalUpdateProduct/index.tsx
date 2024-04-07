import InputFile from "@/components/ui/InputFile";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import { Modal } from "@/components/ui/modals";
import Select from "@/components/ui/select";
import TextArea from "@/components/ui/textarea";
import { uploadFile } from "@/lib/firebase/service";
import productService from "@/services/product";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { FormEvent, useState } from "react";
import Swal from "sweetalert2";

const ModalUpdateProduct = (props: any) => {
  const { updatedProduct, setUpdatedProduct, setProductsData } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const session: any = useSession();

  const uploadImage = (id: string, form: any) => {
    const file = form.image.files[0];
    const newName = "image-" + file.name.split(".")[1];
    console.log(file.name);
    if (file) {
      uploadFile(
        id,
        file,
        newName,
        "news",
        async (status: boolean, newImageUrl: string) => {
          if (status) {
            const data = {
              image: newImageUrl,
            };
            const result = await productService.updateProduct(
              id,
              data,
              session.data?.accessToken
            );
            if (result.status === 200) {
              console.log(result);
              setIsLoading(false);
              setUploadedImage(null);
              form.reset();
              setUpdatedProduct({});
              const { data } = await productService.getAllProduct();
              console.log(data.data);
              setProductsData(data.data);
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

  const updateProduct = async (
    form: any,
    newImageUrl: string = updatedProduct.image
  ) => {
    const data = {
      title: form.title.value,
      tag: form.tag.value,
      description: form.description.value,
      createdBy: form.createdBy.value,
      date: form.date.value,
      image: newImageUrl,
      status: form.status.value,
    };
    const result = await productService.updateProduct(
      updatedProduct.id,
      data,
      session.data?.accessToken
    );
    if (result.status === 200) {
      console.log(result);
      setIsLoading(false);
      setUploadedImage(null);
      form.reset();
      setUpdatedProduct({});
      const { data } = await productService.getAllProduct();
      console.log(data.data);
      setProductsData(data.data);
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
  const hanldeUpdateProduct = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form: any = event.target as HTMLFormElement;
    const file = form.image.files[0];
    if (file) {
      const newName = "image-" + file.name.split(".")[1];
      uploadFile(
        updatedProduct.id,
        file,
        newName,
        "news",
        async (status: boolean, newImageUrl: string) => {
          if (status) {
            updateProduct(form, newImageUrl);
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
      updateProduct(form);
    }
  };
  return (
    <Modal
      onClose={() => setUpdatedProduct({})}
      className="w-screen h-screen flex justify-center align-middle z-50 fixed top-0 backdrop-blur-md md:backdrop-blur-md"
    >
      <div
        className={`w-full bg-tertiary rounded-md${
          isLoading ? " opacity-50" : " opacity-100"
        }`}
      >
        <h1 className="text-2xl p-3 text-center">Update Berita</h1>
        <form onSubmit={hanldeUpdateProduct} className="grid grid-cols-2">
          <div className="grid grid-cols-1 gap-5 p-3">
            <div className="flex p-5 max-h-96 max-w-96">
              <Image
                alt="image"
                src={
                  uploadedImage
                    ? URL.createObjectURL(uploadedImage)
                    : updatedProduct?.image
                }
                width={400}
                height={200}
              />
            </div>
            <InputFile
              title="Sunting Gambar"
              className="grid grid-cols-1 gap-1 bg-slate-100 text-center align-middle rounded-md"
              type="file"
              label="Gambar"
              name="image"
              id="image"
              defaultValue={updatedProduct?.image}
              setUploadedImage={setUploadedImage}
              uploadedImage={uploadedImage}
            />
          </div>

          <div className="grid grid-cols-1 gap-5 m-4 p-5">
            <TextArea
              label="Deskripsi"
              type="text"
              name="description"
              defaultValue={updatedProduct?.description}
              placeholder="Deskripsi"
            />
            <div className="grid grid-cols-1 gap-9">
              <Input
                id="createdBy"
                label="Ditulis Oleh"
                type="text"
                name="createdBy"
                defaultValue={updatedProduct?.createdBy}
                placeholder="Ditulis Oleh"
              />
              <Input
                id="date"
                label="Tempat dan Tanggal"
                type="text"
                name="date"
                defaultValue={updatedProduct?.date}
                placeholder="E.X : Banjarmasin, XX Maret 2023"
              />
            </div>
          </div>

          <div className="flex flex-row m-1 p-3 ">
            <Input
              id="title"
              label="Judul"
              type="text"
              name="title"
              defaultValue={updatedProduct?.title}
              placeholder="Judul"
            />
            <Select
              label="Tag"
              name="tag"
              className="w-40"
              defaultValue="tag"
              options={[
                { label: "Berita", value: "berita" },
                { label: "Pengumuman", value: "pengumuman" },
              ]}
            />
          </div>

          <div className="p-4 m3">
            <Select
              label="Status"
              name="status"
              options={[
                { label: "Rilis", value: "rilis" },
                { label: "Draft", value: "draft" },
              ]}
            />
            <Button
              type="submit"
              className={`mt-3 p-2 rounded-md bg-cyan-500 w-full `}
            >
              {isLoading ? "Loading..." : "Submit"}
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};
export default ModalUpdateProduct;
