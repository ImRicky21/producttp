import NewsAdminView from "@/components/views/admin/news";
import newsService from "@/services/new";
import { useEffect, useState } from "react";

function AdminNewsPage() {
  const [news, setNews] = useState([]);
  const getAllnews = async () => {
    const { data } = await newsService.getAllNews();
    setNews(data.data);
    console.log(data.data);
  };
  useEffect(() => {
    getAllnews();
  }, []);
  return (
    <>
      <NewsAdminView news={news} />
    </>
  );
}

export default AdminNewsPage;
