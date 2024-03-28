import {
  addData,
  addDataId,
  deleteData,
  retrieveData,
  updateData,
} from "@/lib/firebase/service";
import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const data = await retrieveData("dosens");
    res.status(200).json({ message: "success", statusCode: 200, data: data });
  } else if (req.method === "POST") {
    const token = req.headers.authorization?.split(" ")[1] || "";
    jwt.verify(
      token,
      process.env.NEXTAUTH_SECRET || "",
      async (error: any, decoded: any) => {
        if (decoded && decoded.role === "admin") {
          let data = req.body;
          data.createdAt = new Date().getTime();
          data.updatedAt = new Date().getTime();
          console.log(data);
          await addData("dosens", data, (status: boolean, id: string) => {
            if (status) {
              console.log(id);
              res.status(200).json({
                status: true,
                message: "success",
                statusCode: 200,
                data: { id: id },
              });
              console.log(data);
            } else {
              res.status(402).json({
                status: false,
                message: "failed",
                statusCode: 402,
                data: {},
              });
            }
          });
        }
      }
    );
    // res.status(200).json({ message: "POST handler", statusCode: 200 });
  } else if (req.method === "PUT") {
    const { dosen }: any = req.query;
    const { data } = req.body;
    console.log(dosen);

    const token = req.headers.authorization?.split(" ")[1] || "";
    jwt.verify(
      token,
      process.env.NEXTAUTH_SECRET || "",
      async (error: any, decoded: any) => {
        if (decoded && decoded.role === "admin") {
          await updateData("dosens", dosen[0], data, (status: boolean) => {
            if (status) {
              res
                .status(200)
                .json({ status: true, message: "success", statusCode: 200 });
            } else {
              res
                .status(400)
                .json({ status: false, message: "failed", statusCode: 400 });
            }
          });
        } else {
          res
            .status(400)
            .json({ status: false, message: "access denied", statusCode: 400 });
        }
      }
    );
    res.status(200).json({ message: "PUT handler", statusCode: 200 });
  } else if (req.method === "DELETE") {
    const { dosen }: any = req.query;
    console.log(dosen);
    const token = req.headers.authorization?.split(" ")[1] || "";
    jwt.verify(
      token,
      process.env.NEXTAUTH_SECRET || "",
      async (error: any, decoded: any) => {
        if (decoded && decoded.role === "admin") {
          await deleteData("dosens", dosen[0], (status: boolean) => {
            if (status) {
              res.status(200).json({ message: "success", statusCode: 200 });
            } else {
              res.status(400).json({ message: "failed", statusCode: 400 });
            }
          });
        }
      }
    );
    res.status(200).json({ message: "DELETE handler", statusCode: 200 });
  }
}
