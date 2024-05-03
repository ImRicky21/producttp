import instace from "@/lib/axios/instance";

const facilityServices = {
  getAllFacilities: () => instace.get("/api/facility"),
  addFacility: (data: any, token: string) =>
    instace.post("/api/facility", data, {
      headers: { Authorization: `Bearer ${token}` },
    }),
  updateFacility: (id: string, data: any, token: string) =>
    instace.put(
      `/api/facility/${id}`,
      { data },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    ),
  deleteFacility: (id: string, token: string) =>
    instace.delete(`/api/facility/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
};

export default facilityServices;
