import DosenAdminView from "@/components/views/admin/dosens";
import dosenService from "@/services/dosen";
import { useEffect, useState } from "react";

function AdminDosenPage() {
  const [dosens, setDosens] = useState([]);
  useEffect(() => {
    const getAlldosens = async () => {
      const { data } = await dosenService.getAllDosens();
      setDosens(data.data);
    };
    getAlldosens();
  }, []);
  return (
    <>
      <DosenAdminView dosens={dosens} />
    </>
  );
}

export default AdminDosenPage;
