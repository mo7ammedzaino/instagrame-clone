// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyC689MvfeL3cMFoe7Ncke7H-JrsO5x6tKA",
  authDomain: "instagram-clone-react-488b9.firebaseapp.com",
  projectId: "instagram-clone-react-488b9",
  storageBucket: "instagram-clone-react-488b9.appspot.com",
  messagingSenderId: "214178568240",
  appId: "1:214178568240:web:e28fe1279ecd491e2db5f5",
  measurementId: "G-4ZXSTJYX7H",
};
const firebaseApp = initializeApp(firebaseConfig);
export const firestore = getFirestore(firebaseApp);
export const auth = getAuth(firebaseApp);
export const storage = getStorage(firebaseApp);
export const postsRef = collection(firestore, "posts");
