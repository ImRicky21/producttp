import AdminLayout from "@/components/layout/adminLayout";
import Button from "@/components/ui/button";
import { use, useEffect, useState } from "react";
import userService from "@/services/user";
import Image from "next/image";
import { News } from "@/types/news.type";

type PropsTypes = {
  news: News[];
};

function NewsAdminView(props: PropsTypes) {
  const { news } = props;
  const [newsData, setNewsData] = useState<News[]>([]);
  console.log(newsData);
  useEffect(() => {
    setNewsData(news);
  }, [news]);
  return (
    <>
      <AdminLayout>
        <div className="p-5">
          <div className="grid grid-cols-1 gap-5 w-full p-4 px-6">
            <h2 className="text-xl text-center font-bold">Admin News Page</h2>
          </div>
          <table className="table-auto p-5 w-full text-center">
            <thead>
              <tr className="border border-slate-600">
                <th className="border border-slate-950">#</th>
                <th className="border border-slate-950">Image</th>
                <th className="border border-slate-950">Title</th>
                <th className="border border-slate-950 w-96">description</th>
                <th className="border border-slate-950">date</th>
                <th className="border border-slate-950">created</th>
                <th className="border border-slate-950">action</th>
              </tr>
            </thead>
            <tbody>
              {newsData.map((news: any, index: number) => (
                <tr className="" key={news.id}>
                  <td className="border border-slate-600">{index + 1}</td>
                  <td className="border border-slate-600">
                    <Image
                      src={news.image}
                      alt={news.title}
                      width={200}
                      height={200}
                    ></Image>
                  </td>
                  <td className="text-left border border-slate-600">
                    {news.title}
                  </td>
                  <td className="text-left text-ellipsis line-clamp-6 border-b border-slate-600 ">
                    {news.description}
                  </td>
                  <td className="border border-slate-600">{news.date}</td>
                  <td className="border border-slate-600">{news.createdBy}</td>
                  <td className="border border-slate-600">butn</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </AdminLayout>
    </>
  );
}

export default NewsAdminView;
