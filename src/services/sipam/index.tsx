import instace from "@/lib/axios/instance";

const sipamService = {
  getAllSipam: () => instace.get("/api/sipam"),

  addSipam: (data: any, token: string) =>
    instace.post("/api/sipam", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),

  updateSipam: (id: string, data: any, token: string) =>
    instace.put(`/api/sipam/${id}`, data, {
      headers: { Authorization: `Bearer ${token}` },
    }),

  deleteSipam: (id: string, token: string) =>
    instace.delete(`/api/sipam/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    }),
};

export default sipamService;
