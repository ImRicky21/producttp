import InputFile from "@/components/ui/InputFile";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import { Modal } from "@/components/ui/modals";
import Select from "@/components/ui/select";
import TextArea from "@/components/ui/textarea";
import { uploadFile } from "@/lib/firebase/service";
import productService from "@/services/product";
import { Products } from "@/types/products.type";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { Dispatch, FormEvent, SetStateAction, useState } from "react";

type PropsType = {
  setModalAddProduct: Dispatch<SetStateAction<boolean>>;
  setProductsData: Dispatch<SetStateAction<Products[]>>;
};
export default function ModalAddProduct(props: PropsType) {
  const { setModalAddProduct, setProductsData } = props;
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const session: any = useSession();

  const uploadImage = (id: string, form: any) => {
    const file = form.image.files[0];
    const newName = "image-" + file.name.split(".")[1];
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
              setIsLoading(false);
              setUploadedImage(null);
              form.reset();
              setModalAddProduct(false);
              const { data } = await productService.getAllProduct();
              setProductsData(data.data);
            }
          } else {
            setIsLoading(false);
          }
        }
      );
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    const form: any = event.target as HTMLFormElement;
    const data = {
      title: form.title.value,
      description: form.description.value,
      tag: form.tag.value,
      createdBy: form.createdBy.value,
      date: form.date.value,
      status: form.status.value,
      image: "",
    };
    const result = await productService.addProduct(
      data,
      session.data?.accessToken
    );
    console.log(result);
    if (result.status === 200) {
      uploadImage(result.data.data.id, form);
    }
  };

  return (
    <Modal
      onClose={() => setModalAddProduct(false)}
      className="w-screen h-screen flex justify-center align-middle z-50 fixed top-0 backdrop-blur-md md:backdrop-blur-md"
    >
      <div
        className={`w-full bg-tertiary rounded-md${
          isLoading ? " disabled:form" : " opacity-100"
        }`}
      >
        <h1 className="text-2xl p-3 text-center">Tambahkan Berita</h1>
        <form onSubmit={handleSubmit} className="grid grid-cols-2">
          <div className="grid grid-cols-1 gap-5 p-3">
            <div className="flex p-5 max-h-96 max-w-96">
              {uploadedImage && (
                <Image
                  src={URL.createObjectURL(uploadedImage)}
                  alt="image"
                  width={400}
                  height={200}
                />
              )}
            </div>
            <InputFile
              title="Sunting Gambar"
              className="grid grid-cols-1 gap-1 bg-slate-100 text-center align-middle rounded-md"
              type="file"
              label="Gambar"
              name="image"
              id="image"
              setUploadedImage={setUploadedImage}
              uploadedImage={uploadedImage}
            />
          </div>

          <div className="grid grid-cols-1 gap-5 m-4 p-5">
            <TextArea
              label="Deskripsi"
              type="text"
              name="description"
              placeholder="Deskripsi"
            />
            <div className="grid grid-cols-1 gap-9">
              <Input
                id="createdBy"
                label="Ditulis Oleh"
                type="text"
                name="createdBy"
                placeholder="Ditulis Oleh"
              />
              <Input
                id="date"
                label="Tempat dan Tanggal"
                type="text"
                name="date"
                placeholder="E.X : Banjarmasin, XX Maret 2023"
              />
            </div>
          </div>

          <div className="flex flex-row m-1 p-3 gap-3 ">
            <Input
              id="title"
              label="Judul"
              type="text"
              name="title"
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
              className={`mt-3 p-2 rounded-md bg-cyan-500 w-full ${
                isLoading ? "disabled:" : "opacity-100"
              }`}
            >
              {isLoading ? "Loading..." : "Submit"}
            </Button>
          </div>
        </form>
      </div>
    </Modal>
    // <Modal
    //   onClose={() => setModalAddProduct(false)}
    //   className="w-screen h-screen flex justify-center align-middle z-50 fixed top-0 backdrop-blur-md"
    // >
    //   <div className="w-full p-4 bg-tertiary rounded-md ">
    //     <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-5">
    //       <div className="grid grid-cols-1 gap-5 p-3">
    //         {uploadedImage && (
    //           <Image
    //             src={URL.createObjectURL(uploadedImage)}
    //             alt="image"
    //             width={200}
    //             height={200}
    //           />
    //         )}
    //         <InputFile
    //           title="upload image"
    //           type="file"
    //           label="Gambar"
    //           name="image"
    //           setUploadedImage={setUploadedImage}
    //           uploadedImage={uploadedImage}
    //         />
    //       </div>

    //       <div className="grid grid-cols-1 gap-5 m-4 p-5">
    //         <TextArea
    //           label="Deskripsi"
    //           type="text"
    //           name="description"
    //           placeholder="Deskripsi"
    //         />
    //         <Input
    //           id="createdBy"
    //           label="Ditulis Oleh"
    //           type="text"
    //           name="createdBy"
    //           placeholder="Ditulis Oleh"
    //         />
    //         <Input
    //           id="date"
    //           label="Tempat dan Tanggal"
    //           type="text"
    //           name="date"
    //           placeholder="E.X : Banjarmasin, XX Maret 2023"
    //         />
    //       </div>
    //       <div className="flex flex-row m-1 p-3 ">
    //         <Input
    //           id="title"
    //           label="Judul"
    //           type="text"
    //           name="title"
    //           className="px-3"
    //           placeholder="Judul"
    //         />
    //         <Select
    //           label="Tag"
    //           name="tag"
    //           defaultValue="tag"
    //           options={[
    //             { label: "Berita", value: "berita" },
    //             { label: "Pengumuman", value: "pengumuman" },
    //           ]}
    //         />
    //       </div>
    //       <div>
    //         <Select
    //           label="Status"
    //           name="status"
    //           defaultValue="rilis"
    //           options={[
    //             { label: "Rilis", value: "rilis" },
    //             { label: "Draft", value: "draft" },
    //           ]}
    //         />
    //         <Button
    //           type="submit"
    //           className={`mt-3 p-2 rounded-md bg-cyan-500 `}
    //         >
    //           {isLoading ? "Loading..." : "Submit"}
    //         </Button>
    //       </div>
    //     </form>
    //   </div>
    // </Modal>
  );
}
