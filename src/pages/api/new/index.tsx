import { deleteData, retrieveData, updateData } from "@/lib/firebase/service";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const data = await retrieveData("news");
    console.log(data);
    res
      .status(201)
      .json({ status: true, statusCode: 201, message: "succes", data });
  }
}
