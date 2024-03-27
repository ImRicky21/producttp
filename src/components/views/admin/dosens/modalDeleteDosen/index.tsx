import Button from "@/components/ui/button";
import { Modal } from "@/components/ui/modals";
import dosenService from "@/services/dosen";
import productService from "@/services/product";
import userService from "@/services/user";
import { useSession } from "next-auth/react";
import Swal from "sweetalert2";

function ModalDeleteDosen(props: any) {
  const { deletedDosen, setDeletedDosen, setDosensData } = props;
  const session: any = useSession();

  const handleDelete = async () => {
    dosenService
      .deleteDosen(deletedDosen.id, session.data?.accessToken)
      .then((result) => {
        if (result.status !== 200) {
          Swal.fire({
            icon: "error",
            text: "User tidak dapat dihapus",
          });
        } else {
          Swal.fire({
            icon: "success",
            text: ` sudah di hapus`,
          });
        }
      });
    const { data } = await dosenService.getAllDosens();
    setDosensData(data.data);
  };
  return (
    <Modal
      onClose={() => setDeletedDosen({})}
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
          Delete
        </Button>
      </div>
    </Modal>
  );
}

export default ModalDeleteDosen;
