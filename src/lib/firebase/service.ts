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
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";

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

export async function addData(
  collcetionName: string,
  data: any,
  callBack: Function
) {
  try {
    const docRef = await addDoc(collection(firestore, collcetionName), data);
    callBack(true, { id: docRef.id, ...data });
    console.log(data);
  } catch (error) {
    callBack(false);
    console.error(error);
  }
}

// export async function addData(
//   collcetionName: string,
//   data: any,
//   callBack: Function
// ) {
//   await addDoc(collection(firestore, collcetionName), data)
//     .then((response) => {
//       console.log(data);
//       callBack(true, response);
//     })
//     .catch((error) => {
//       callBack(false);
//       console.log(error);
//     });
// }

// export async function addData(
//   collcetionName: string,
//   data: any,
//   callBack: Function
// ) {
//   await addDoc(collection(firestore, collcetionName), data)
//     .then(() => {
//       console.log(data);
//       callBack(true);
//     })
//     .catch((error) => {
//       callBack(false);
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
      callBack(true);
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
