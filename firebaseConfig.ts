// firebaseConfig.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD9qgw8q3qIV7VdbPg2Ql5Yx7jInhq3a_o",
  authDomain: "todohackathonapp-5d7a0.firebaseapp.com",
  projectId: "todohackathonapp-5d7a0",
  storageBucket: "todohackathonapp-5d7a0.appspot.com",
  messagingSenderId: "1008081066989",
  appId: "1:1008081066989:web:a4413e58abf2057f40a5e4"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
