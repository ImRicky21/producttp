import instace from "@/lib/axios/instance";

const dosenService = {
  getAllDosens: () => instace.get("/api/dosen"),
  addDosen: (data: any, token: string) =>
    instace.post("/api/dosen", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  updateDosen: (id: string, data: any, token: string) =>
    instace.put(
      `/api/dosen/${id}`,
      { data },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    ),
  deleteDosen: (id: string, token: string) =>
    instace.delete(`/api/dosen/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
};

export default dosenService;
