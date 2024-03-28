import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import app from "./init";
import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { v4 as uuidv4 } from "uuid";

const firestore = getFirestore(app);
const storage = getStorage(app);

export async function retrieveData(collcetionName: string) {
  const snapshot = await getDocs(collection(firestore, collcetionName));
  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return data;
}

export async function retrieveDataById(collcetionName: string, id: string) {
  const snapshot = await getDoc(doc(firestore, collcetionName, id));
  const data = snapshot.data();
  return data;
}

export async function retrieveDataByFeild(
  collcetionName: string,
  field: string,
  value: string
) {
  const q = query(
    collection(firestore, collcetionName),
    where(field, "==", value)
  );

  const snapshot = await getDocs(q);
  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return data;
}

// export async function addData(
//   collcetionName: string,
//   data: any,
//   callBack: Function
// ) {
//   try {
//     const randomId = randomUUID();
//     const docRef = await addDoc(collection(firestore, collcetionName), data);
//     callBack(true, { id: docRef.id, ...data });
//     console.log(data);
//   } catch (error) {
//     callBack(false);
//     console.error(error);
//   }
// }

export async function addData(
  collcetionName: string,
  data: any,
  callBack: Function
) {
  await addDoc(collection(firestore, collcetionName), data)
    .then((response) => {
      callBack(true, response.id);
      console.log(response.id);
    })
    .catch((error) => {
      callBack(false);
      console.log(error);
    });
}

// export async function addData(
//   collcetionName: string,
//   data: any,
//   callBack: Function
// ) {
//   const id = uuidv4();
//   await setDoc(doc(firestore, collcetionName, id), data)
//     .then((response) => {
//       callBack(true, response, id);
//     })
//     .catch((error) => {
//       callBack(false, id);
//       console.log(error);
//     });
// }
export async function addDataId(
  collcetionName: string,
  data: any,
  callBack: Function
) {
  await setDoc(doc(firestore, collcetionName, data.id), data)
    .then(() => {
      const id = (data.id = uuidv4());
      callBack(true, id);
      console.log(data.id);
    })
    .catch((error) => {
      callBack(false);
      console.log(error);
    });
}

export async function updateData(
  collcetionName: string,
  id: string,
  data: any,
  callback: Function
) {
  const docRef = doc(firestore, collcetionName, id);
  await updateDoc(docRef, data)
    .then(() => {
      callback(true);
    })
    .catch(() => {
      callback(false);
    });
}

export async function deleteData(
  collcetionName: string,
  id: string,
  callBack: Function
) {
  const docRef = doc(firestore, collcetionName, id);
  await deleteDoc(docRef)
    .then(() => {
      callBack(true);
    })
    .catch(() => {
      callBack(false);
    });
}

export async function uploadFile(
  id: string,
  file: any,
  newName: string,
  collcetionName: string,
  callback: Function
) {
  console.log(file);
  if (file) {
    if (file.type === "image/jpeg" || file.type === "image/png") {
      const storageRef = ref(
        storage,
        `images/${collcetionName}/${id}/${newName}`
      );
      const uploadPass = uploadBytesResumable(storageRef, file);

      uploadPass.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(progress);
        },
        () => {
          console.log("error");
        },
        () => {
          getDownloadURL(uploadPass.snapshot.ref).then((downloadURL: any) => {
            callback(true, downloadURL);
            console.log(downloadURL);
          });
        }
      );
    } else {
      return callback(false);
    }

    return true;
  }
}

export async function deleteFile(url: string, callBack: Function) {
  const storageRef = ref(storage, url);
  await deleteObject(storageRef)
    .then(() => {
      return callBack(true);
    })
    .catch(() => {
      return callBack(false);
    });
}
