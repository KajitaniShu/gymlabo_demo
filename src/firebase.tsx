// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { GoogleAuthProvider, getAuth } from "firebase/auth";

//import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyAX-MuGmaFezcqm4BOstYQmvgLYJpo-geg",
  authDomain: "kougaku-editor.firebaseapp.com",
  projectId: "kougaku-editor",
  storageBucket: "kougaku-editor.appspot.com",
  messagingSenderId: "359378489581",
  appId: "1:359378489581:web:64da717b80229f5bc93ce4",
  measurementId: "G-P1RSCPM0WG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
//const analytics = getAnalytics(app);
const db = getFirestore(app);

const auth = getAuth();
const provider = new GoogleAuthProvider();

export {db, storage, provider, auth};