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
    const data = await retrieveData("news");
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

          await addData("news", data, (status: boolean, id: string) => {
            if (status) {
              res.status(200).json({
                status: true,
                message: "success",
                statusCode: 200,
                data: { id: id },
              });
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
    const { product }: any = req.query;
    const { data } = req.body;
    console.log(product);

    const token = req.headers.authorization?.split(" ")[1] || "";
    jwt.verify(
      token,
      process.env.NEXTAUTH_SECRET || "",
      async (error: any, decoded: any) => {
        if (decoded && decoded.role === "admin") {
          await updateData("news", product[0], data, (status: boolean) => {
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
    const { product }: any = req.query;
    const token = req.headers.authorization?.split(" ")[1] || "";
    jwt.verify(
      token,
      process.env.NEXTAUTH_SECRET || "",
      async (error: any, decoded: any) => {
        if (decoded && decoded.role === "admin") {
          await deleteData("news", product[0], (status: boolean) => {
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
