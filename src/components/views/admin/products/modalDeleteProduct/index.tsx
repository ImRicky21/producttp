import Button from "@/components/ui/button";
import { Modal } from "@/components/ui/modals";
import { deleteFile } from "@/lib/firebase/service";
import productService from "@/services/product";
import userService from "@/services/user";
import { useSession } from "next-auth/react";
import { useState } from "react";
import Swal from "sweetalert2";

function ModalDeleteProduct(props: any) {
  const { deletedProduct, setDeletedProduct, setProductsData } = props;
  const [isLoading, setIsLoading] = useState(false);
  const session: any = useSession();

  const handleDelete = async () => {
    const result = await productService.deleteProduct(
      deletedProduct.id,
      session.data?.accessToken
    );

    if (result.status === 200) {
      setIsLoading(false);
      deleteFile(
        `/images/news/${deletedProduct.id}/${
          deletedProduct.image.split("%2F")[3].split("?")[0]
        }`,
        async (status: boolean) => {
          if (status) {
            Swal.fire({
              icon: "success",
              text: `Dosen ${deletedProduct.title} telah di hapus`,
            });
            const { data } = await productService.getAllProduct();
            setProductsData(data.data);
          }
        }
      );
    }
  };
  return (
    <Modal
      onClose={() => setDeletedProduct({})}
      className="w-screen h-screen flex justify-center align-middle z-50 fixed top-0 backdrop-blur-md"
    >
      <div className="grid grid-cols-1 gap-5 w-full p-4">
        <h1 className="text-center text-2xl font-bold">Delete???</h1>
        <Button
          className="w-full bg-teal-400 rounded-md font-bold text-white"
          type="button"
          onClick={() => {
            handleDelete();
          }}
        >
          {isLoading ? "Loading" : "Delete"}
        </Button>
      </div>
    </Modal>
  );
}

export default ModalDeleteProduct;
