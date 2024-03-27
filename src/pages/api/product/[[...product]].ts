import {
  addData,
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
      async (err: any, decoded: any) => {
        console.log(decoded);
        if (decoded && decoded.role === "admin") {
          let data = req.body;
          data.createdAt = new Date().toDateString();
          data.updatedAt = new Date().toDateString();
          console.log(data);
          addData("news", data, (status: boolean, result: any) => {
            if (status) {
              res.status(200).json({
                message: "success",
                statusCode: 200,
                status: true,
                data: { id: result.id },
              });
            } else {
              res.status(400).json({
                status: false,
                message: "failed",
                statusCode: 400,
                data: {},
              });
            }
          });
        } else {
          res.status(403).json({ message: "failed", statusCode: 403 });
        }
      }
    );
  } else if (req.method === "PUT") {
    const { product }: any = req.query;
    console.log(product);
    const { data } = req.body;
    console.log(product);
    const token = req.headers.authorization?.split(" ")[1] || "";
    jwt.verify(
      token,
      process.env.NEXTAUTH_SECRET || "",
      async (err: any, decoded: any) => {
        if (decoded && decoded.role === "admin") {
          await updateData("news", product[0], data, (status: boolean) => {
            if (status) {
              res.status(200).json({ message: "success", statusCode: 200 });
            } else {
              res.status(400).json({ message: "failed", statusCode: 400 });
            }
          });
        } else {
          res.status(403).json({ message: "failed", statusCode: 403 });
        }
      }
    );
  } else if (req.method === "DELETE") {
    const { product }: any = req.query;
    console.log({ product });
    deleteData("news", product[0], (status: boolean) => {
      if (status) {
        res.status(209).json({ message: "success", statusCode: 209 });
      } else {
        res.status(409).json({ message: "failed", statusCode: 409 });
      }
    });
  }
}
