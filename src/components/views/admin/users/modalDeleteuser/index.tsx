import Button from "@/components/ui/button";
import { Modal } from "@/components/ui/modals";
import userService from "@/services/user";
import { useSession } from "next-auth/react";
import Swal from "sweetalert2";

function ModalDeleteUser(props: any) {
  const { deletedUser, setDeletedUser, setUsersData } = props;
  const session: any = useSession();

  const handleDelete = async () => {
    Swal.fire({
      icon: "warning",
      title: "Are you sure?",
      text: `User ${deletedUser.fullname} will be deleted`,
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        userService
          .deleteUser(deletedUser.id, session.data?.accessToken)
          .then(async (result) => {
            try {
              if (result.status !== 200) {
                Swal.fire({
                  icon: "error",
                  text: "User tidak dapat dihapus",
                });
              } else {
                Swal.fire({
                  icon: "success",
                  text: `User ${deletedUser.fullname} sudah di hapus`,
                });
                const { data } = await userService.getAllUser();
                setUsersData(data.data);
              }
            } catch {
              Swal.fire({
                icon: "error",
                text: "User tidak dapat dihapus",
              });
            }
          });
      }
    });
  };
  return (
    <Modal
      onClose={() => setDeletedUser({})}
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

export default ModalDeleteUser;
