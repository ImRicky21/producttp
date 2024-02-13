import Button from "@/components/ui/button";
import { Modal } from "@/components/ui/modals";
import userService from "@/services/user";
import { useSession } from "next-auth/react";
import Swal from "sweetalert2";

function ModalDeleteUser(props: any) {
  const { deletedUser, setDeletedUser, setUsersData } = props;
  const session: any = useSession();

  const handleDelete = async () => {
    userService
      .deleteUser(deletedUser.id, session.data?.accessToken)
      .then((result) => {
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
          }
        } catch {
          Swal.fire({
            icon: "error",
            text: "User tidak dapat dihapus",
          });
        }
      });
    const { data } = await userService.getAllUser();
    setUsersData(data.data);
  };
  return (
    <Modal
      onClose={() => setDeletedUser({})}
      className="w-screen h-screen flex justify-center align-middle z-50 fixed top-0 backdrop-blur-md"
    >
      <h1 className="text-center bg-teal-300">Delete???</h1>
      <Button
        type="button"
        onClick={() => {
          handleDelete();
        }}
      >
        Delete
      </Button>
    </Modal>
  );
}

export default ModalDeleteUser;
