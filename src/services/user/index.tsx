import instace from "@/lib/axios/instance";

const userService = {
  getAllUser: () => instace.get("/api/user"),
  updateUser: (id: string, data: any) => instace.put("/api/user", { id, data }),
  deleteUser: (id: string) => instace.delete(`/api/user/${id}`),
};

export default userService;
