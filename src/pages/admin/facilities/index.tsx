import FacilitiesAdnimView from "@/components/views/admin/facilities";
import facilityServices from "@/services/facility";
import { Facilities } from "@/types/facility.type";
import { useEffect, useState } from "react";

export default function FacilitiesPage() {
  const [facilities, setFacilities] = useState<Facilities[]>([]);
  useEffect(() => {
    const getAllFacilities = async () => {
      const { data } = await facilityServices.getAllFacilities();
      setFacilities(data.data);
    };
    getAllFacilities();
  }, []);

  return (
    <>
      <FacilitiesAdnimView facilities={facilities} />
    </>
  );
}
