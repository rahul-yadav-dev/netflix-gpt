// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC1BxgYSBdtKXWatzLYnesliJL5SKLnul0",
  authDomain: "netflix-gpt-44914.firebaseapp.com",
  projectId: "netflix-gpt-44914",
  storageBucket: "netflix-gpt-44914.appspot.com",
  messagingSenderId: "515413123736",
  appId: "1:515413123736:web:b01a54727113c3b24426ed",
  measurementId: "G-4W8J1ZN8N3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth();
