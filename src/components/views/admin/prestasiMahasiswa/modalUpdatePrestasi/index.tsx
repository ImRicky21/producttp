import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import { Modal } from "@/components/ui/modals";

export default function ModalUpdatePrestasi(props: any) {
  const {} = props;
  return (
    <Modal onClose={() => {}} name="modal-update-prestasi">
      <form onSubmit={() => {}}>
        <div className="flex flex-col gap-8 px-4">
          <Input
            type="text"
            label="Nama"
            name="name"
            placeholder="Masukkan nama"
          />
          <Input
            type="text"
            label="Nim"
            name="nim"
            placeholder="Masukkan NIM"
          />
          <Input
            type="text"
            label="Nama Lomba"
            name="title"
            placeholder="Masukkan nama lomba"
          />
          <Input
            type="text"
            label="Tingkat"
            name="level"
            placeholder="Tingkat lomba"
          />
          <Input
            type="text"
            label="Link Sertifikat"
            name="link"
            placeholder="Sertifikat Lomba"
          />

          <Button
            type="submit"
            className=" w-1/4 p-3 mt-3 bg-sky-500 rounded-md text-white transition hover:bg-sky-600 ease-in-out"
          >
            Tambahkan
          </Button>
        </div>
      </form>
    </Modal>
  );
}
