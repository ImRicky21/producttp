import Button from "@/components/ui/button";
import Input from "@/components/ui/input/";
import { Modal } from "@/components/ui/modals";
import Select from "@/components/ui/select";
import userService from "@/services/user";
import { useSession } from "next-auth/react";
import { FormEvent, useState } from "react";
import Swal from "sweetalert2";
function ModalUpdateUser(props: any) {
  const { updatedUser, setUpdatedUser, setUsersData } = props;
  const [isLodaing, setIsLoading] = useState(false);
  const session: any = useSession();

  const handleUpdateUser = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    const form: any = event.target as HTMLFormElement;
    try {
      const data = {
        role: form.role.value,
        fullname: form.fullname.value,
      };
      const result = await userService.updateUser(
        updatedUser.id,
        data,
        session.data?.accessToken
      );
      if (result.status !== 200) {
        setIsLoading(false);
        Swal.fire({
          icon: "error",
          text: "User tidak dapat diperbaharui",
          showConfirmButton: true,
        });
      } else {
        setUpdatedUser({});
        const { data } = await userService.getAllUser();
        setUsersData(data.data);

        Swal.fire({
          icon: "success",
          text: "User sudah diperbaharui",
          showConfirmButton: true,
        });
        setIsLoading(false);
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        text: "User has not been updated",
      });
      console.log(error);
    }
  };
  return (
    <Modal
      onClose={() => setUpdatedUser({})}
      className="w-screen h-screen flex justify-center align-middle z-50 fixed top-0 backdrop-blur-md"
    >
      <form
        onSubmit={handleUpdateUser}
        className="bg-teal-500 h-auto rounded-lg m-5 p-10 w-96 flex flex-col gap-10"
      >
        <h1 className="text-center text-2xl">Update</h1>
        <Input
          label="email"
          name="email"
          type="email"
          placeholder="Email"
          defaultValue={updatedUser.email}
        />
        <Input
          label="fullname"
          name="fullname"
          type="fullname"
          placeholder="Fullname"
          defaultValue={updatedUser.fullname}
        />
        <Input
          className="disabled:opacity-50 disabled:cursor-not-allowed"
          label="phone"
          name="phone"
          type="phone"
          placeholder="Phone"
          defaultValue={updatedUser.phone}
          disable
        />
        <Input
          label="password"
          name="password"
          type="password"
          placeholder="Password"
          defaultValue={updatedUser.password}
        />
        <Select
          name="role"
          label="Role"
          defaultValue={updatedUser.role}
          options={[
            { label: "Member", value: "member" },
            { label: "Admin", value: "admin" },
          ]}
        />
        <Button type="submit" className="bg-yellow-200 mt-3 p-2 rounded-md">
          {isLodaing ? "Loading..." : "Update"}
        </Button>
      </form>
    </Modal>
  );
}

export default ModalUpdateUser;
