import instace from "@/lib/axios/instance";

const authService = {
  registerAccount: (data: any) => instace.post("/api/user/register", data),
};

export default authService;
