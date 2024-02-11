import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import app from "./init";

const firestore = getFirestore(app);

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
  await addDoc(collection(firestore, collcetionName), data)
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
