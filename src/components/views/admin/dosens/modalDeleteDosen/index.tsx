import Button from "@/components/ui/button";
import { Modal } from "@/components/ui/modals";
import { deleteFile } from "@/lib/firebase/service";
import dosenService from "@/services/dosen";
import { useSession } from "next-auth/react";
import { useState } from "react";
import Swal from "sweetalert2";

function ModalDeleteDosen(props: any) {
  const { deletedDosen, setDeletedDosen, setDosensData } = props;
  const [isLoading, setIsLoading] = useState(false);
  const session: any = useSession();
  const handleDelete = async () => {
    Swal.fire({
      icon: "warning",
      title: "Anda yakin?",
      text: ` ${deletedDosen.name} akan dihapus`,
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Hapus",
    }).then((result) => {
      console.log(result);
      if (result.isConfirmed) {
        dosenService
          .deleteDosen(deletedDosen.id, session.data?.accessToken)
          .then(async (result) => {
            console.log(result);
            if (result.status === 200) {
              setIsLoading(false);
              deleteFile(
                `/images/dosens/${deletedDosen.id}/${
                  deletedDosen.image.split("%2F")[3].split("?")[0]
                }`,
                async (status: boolean) => {
                  console.log(status);
                  if (status) {
                    Swal.fire({
                      timer: 5000,
                      icon: "success",
                      text: `Dosen ${deletedDosen.name} telah di hapus`,
                    });
                    const { data } = await dosenService.getAllDosens();
                    setDosensData(data.data);
                  }
                }
              );
            }
          });
        setIsLoading(true);
        setDeletedDosen({});
      } else {
        setIsLoading(false);
        setDeletedDosen({});
      }
    });
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
