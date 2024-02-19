import instace from "@/lib/axios/instance";

const newsService = {
  getAllNews: () => instace.get("/api/new"),
};

export default newsService;
