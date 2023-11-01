// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCo5iKIWzf2gLem3ZPJB0rD6_jVqJbGBYM",
  authDomain: "netflix-gpt-16c5b.firebaseapp.com",
  projectId: "netflix-gpt-16c5b",
  storageBucket: "netflix-gpt-16c5b.appspot.com",
  messagingSenderId: "510688925166",
  appId: "1:510688925166:web:d54be3096e33941fa36aff",
  measurementId: "G-DV6X0N4GKL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth();
