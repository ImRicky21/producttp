import instace from "@/lib/axios/instance";

const prestasiMahasiswaService = {
  getAllPrestasi: () => instace.get("/api/prestasimahasiswa"),
  addPrestasi: (data: any, token: string) =>
    instace.post("/api/prestasimahasiswa", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  updatePrestasi: (id: string, data: any, token: string) =>
    instace.put(
      `/api/prestasimahasiswa/${id}`,
      { data },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    ),
  deletePrestasi: (id: string, token: string) =>
    instace.delete(`/api/prestasimahasiswa/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
};

export default prestasiMahasiswaService;
