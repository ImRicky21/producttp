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
      createdBy: form.createdBy.value,
      date: form.date.value,
      image: "",
    };
    const result = await productService.addProduct(
      data,
      session.data?.accessToken
    );
    if (result.status === 200) {
      uploadImage(result.data.id, form);
    }
  };

  return (
    <Modal
      onClose={() => setModalAddProduct(false)}
      className="w-screen h-screen flex justify-center align-middle z-50 fixed top-0 backdrop-blur-md"
    >
      <div className="w-full p-4 bg-tertiary rounded-md">
        <form onSubmit={handleSubmit}>
          <Input
            id="title"
            label="Judul"
            type="text"
            name="title"
            placeholder="Judul"
          />
          <TextArea
            label="Deskripsi"
            type="text"
            name="description"
            placeholder="Deskripsi"
          />
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
          <InputFile
            type="file"
            label="Gambar"
            name="image"
            setUploadedImage={setUploadedImage}
            uploadedImage={uploadedImage}
          />
          <Select
            label="Status"
            name="status"
            options={[
              { label: "Rilis", value: "rilis" },
              { label: "Draft", value: "draft" },
            ]}
          />
          <Button type="submit" className={`mt-3 p-2 rounded-md bg-cyan-500 `}>
            {isLoading ? "Loading..." : "Submit"}
          </Button>
        </form>
      </div>
    </Modal>
  );
}
