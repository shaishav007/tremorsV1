// Import the functions you need from the SDKs you need

import { FirebaseError, initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration - THIS NAME IS IMPORTANT
const firebaseConfig = {
  apiKey: "AIzaSyAfrCK0j1q6g3B7Gd0CQJztZ4lZbFhoKeg",
  authDomain: "tremorsv1.firebaseapp.com",
  projectId: "tremorsv1",
  storageBucket: "tremorsv1.appspot.com",
  messagingSenderId: "239997265957",
  appId: "1:239997265957:web:e036d3ef83e51654d237cc"
};


// Initialize Firebase

const Firebase = initializeApp(firebaseConfig);

export default Firebase;