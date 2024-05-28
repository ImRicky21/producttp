import Button from "@/components/ui/button";
import Input from "@/components/ui/input/";
import { Modal } from "@/components/ui/modals";
import sipamService from "@/services/sipam";
import { useSession } from "next-auth/react";
import { FormEvent, useState } from "react";
import Swal from "sweetalert2";

const ModalUpdateSipam = (props: any) => {
  const { updatedSipam, setUpdatedSipam, setDataSipam } = props;
  const [isLoading, setIsLoading] = useState(false);
  const session: any = useSession();

  console.log(updatedSipam);

  const hanldeUpdateSipam = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form: any = event.target as HTMLFormElement;
    const data = {
      title: form.title.value,
      link: form.link.value,
    };
    const result = await sipamService.updateSipam(
      updatedSipam.id,
      data,
      session.data?.accessToken
    );

    if (result.status === 200) {
      const { data } = await sipamService.getAllSipam();
      setDataSipam(data.data);
      setIsLoading(false);
      form.reset();
      Swal.fire({
        icon: "success",
        title: "Success",
      });
      console.log(data.data);
    }
  };
  return (
    <Modal
      onClose={() => setUpdatedSipam({})}
      className="w-screen h-screen flex justify-center align-middle z-50 fixed top-0 backdrop-blur-md"
    >
      <div className="w-full p-4 bg-tertiary rounded-md">
        <h1 className="text-2xl text-center p-3 m-4">Update Sipam </h1>
        <form
          onSubmit={hanldeUpdateSipam}
          className="flex flex-wrap flex-col gap-10"
        >
          <Input
            type="text"
            label="Nama"
            name="title"
            placeholder="Enter name"
            defaultValue={updatedSipam.title}
          />
          <Input
            type="text"
            label="Link"
            name="link"
            placeholder="Enter link"
            defaultValue={updatedSipam.link}
          />
          <Button type="submit" className={`mt-3 p-2 rounded-md bg-cyan-500`}>
            {isLoading ? "Loading..." : "Submit"}
          </Button>
        </form>
      </div>
    </Modal>
  );
};
export default ModalUpdateSipam;
