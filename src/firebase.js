// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBTNxVgUYnTiSLrs5t1evLKdut0cmBwoO8",
  authDomain: "mock-web.firebaseapp.com",
  projectId: "mock-web",
  storageBucket: "mock-web.appspot.com",
  messagingSenderId: "771148055589",
  appId: "1:771148055589:web:d5d8794a2343f7364c6bcc",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export { app, db };
