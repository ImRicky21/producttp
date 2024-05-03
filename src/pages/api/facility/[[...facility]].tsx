import {
  addData,
  deleteData,
  retrieveData,
  updateData,
} from "@/lib/firebase/service";
import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import { useSession } from "next-auth/react";
import { error } from "console";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const data = await retrieveData("facilities");
    res.status(200).json({ message: "success", statusCode: 200, data: data });
  } else if (req.method === "POST") {
    const token = req.headers.authorization?.split(" ")[1] || "";
    console.log(token);
    jwt.verify(
      token,
      process.env.NEXTAUTH_SECRET || "",
      async (error: any, decoded: any) => {
        if (decoded && decoded.role === "admin") {
          let data = req.body;
          data.createdAt = new Date().getTime();
          data.updatedAt = new Date().getTime();
          console.log(data);
          await addData("facilities", data, (status: boolean, id: string) => {
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
        } else {
          res.status(401).json({
            status: false,
            message: "failed",
            statusCode: 401,
            data: "",
          });
        }
      }
    );
  } else if (req.method === "PUT") {
    const { facility }: any = req.query;
    const { data } = req.body;
    console.log(facility);

    const token = req.headers.authorization?.split(" ")[1] || "";
    jwt.verify(
      token,
      process.env.NEXTAUTH_SECRET || "",
      async (error: any, decoded: any) => {
        if (decoded && decoded.role === "admin") {
          await updateData(
            "facilities",
            facility[0],
            data,
            (status: boolean) => {
              if (status) {
                res
                  .status(200)
                  .json({ status: true, message: "success", statusCode: 200 });
              } else {
                res
                  .status(402)
                  .json({ status: false, message: "failed", statusCode: 402 });
              }
            }
          );
        } else {
          res.status(401).json({
            status: false,
            message: "failed",
            statusCode: 401,
            data: "",
          });
        }
      }
    );
  } else if (req.method === "DELETE") {
    const { facility }: any = req.query;
    console.log(facility);
    const token = req.headers.authorization?.split(" ")[1] || "";
    jwt.verify(
      token,
      process.env.NEXTAUTH_SECRET || "",
      async (error: any, decoded: any) => {
        if (decoded && decoded.role === "admin") {
          await deleteData("facilities", facility[0], (status: boolean) => {
            if (status) {
              res
                .status(200)
                .json({ status: true, message: "success", statusCode: 200 });
            } else {
              res
                .status(402)
                .json({ status: false, message: "failed", statusCode: 402 });
            }
          });
        } else {
          res.status(401).json({
            status: false,
            message: "failed",
            statusCode: 401,
            data: "",
          });
        }
      }
    );
  }
}
