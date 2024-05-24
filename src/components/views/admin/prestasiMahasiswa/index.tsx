import Accordion from "@/components/fragment/accordion";
import AdminLayout from "@/components/layout/adminLayout";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import { Prestasi } from "@/types/prestasi.type";
import { useState } from "react";

type PropsTypes = {
  prestasi: Prestasi[];
};
export default function PrestasiMahasiswaAdminView(props: PropsTypes) {
  const { prestasi } = props;
  const [prestasiData, setPrestasiData] = useState<Prestasi[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  return (
    <AdminLayout>
      <>
        <div>
          <h1>Prestasi Mahasiswa</h1>
        </div>
        <div>
          <Accordion title="Tambah Prestasi Mahasiswa">
            <form onSubmit={() => {}}>
              <div className="flex flex-col gap-8 px-4">
                <Input
                  type="text"
                  label="Nama"
                  name="name"
                  placeholder="Enter name"
                />
                <Input
                  type="text"
                  label="Nama Lomba"
                  name="title"
                  placeholder="Enter name"
                />
                <Input
                  type="text"
                  label="Tingkat"
                  name="level"
                  placeholder="Enter name"
                />
                <Input
                  type="text"
                  label="Link Sertifikat"
                  name="link"
                  placeholder="Enter link"
                />

                {/* <Select
                name="label"
                label="Status"
                options={[
                  { label: "Tampilkan", value: "tampilkan" },
                  { label: "Simpan", value: "simpan" },
                ]}
              /> */}
                <Button
                  type="submit"
                  className=" w-1/4 p-3 mt-3 bg-sky-500 rounded-md text-white transition hover:bg-sky-600 ease-in-out"
                >
                  Tambahkan
                </Button>
              </div>
            </form>
          </Accordion>
        </div>
        <div>
          <table className="table">
            <thead>
              <tr className="border border-slate-600">
                <th>No</th>
                <th>Nama</th>
                <th>Link</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {prestasi.map((item, index) => {
                return (
                  <tr key={item.id} className="border border-slate-600">
                    <td>{index + 1}</td>
                    <td>{item.name}</td>
                    <td>{item.link}</td>
                    <td></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </>
    </AdminLayout>
  );
}
