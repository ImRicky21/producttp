import { addData, retrieveDataByFeild } from "@/lib/firebase/service";
import bcrypt from "bcrypt";

export async function signUp(
  userData: {
    email: string;
    username: string;
    password: string;
    phoneNumber: string;
    role?: string;
    createdAt?: Date;
    updatedAt?: Date;
  },
  callBack: Function
) {
  const data = await retrieveDataByFeild("users", "email", userData.email);
  if (data.length > 0) {
    callBack(false);
  } else {
    if (!userData.role) {
      userData.role = "member";
    }
    userData.password = await bcrypt.hash(userData.password, 10);
    userData.createdAt = new Date();
    userData.updatedAt = new Date();
    addData("users", userData, (result: boolean) => {
      callBack(result);
    });
  }
}

export async function signIn(email: string) {
  const data = await retrieveDataByFeild("users", "email", email);

  if (data) {
    return data[0];
  } else {
    return null;
  }
}

export async function loginGoogel(
  data: { email: string; role?: string },
  callback: Function
) {
  const user = await retrieveDataByFeild("users", "email", data.email);

  if (user.length > 0) {
    callback(user[0]);
  } else {
    data.role = "member";
    addData("users", data, (result: boolean) => {
      if (result) {
        callback(data);
      }
    });
  }
}
