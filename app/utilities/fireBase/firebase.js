
import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage'

const {FIREBASE_API, FIREBASE_AUTHDOMAIN, FIREBASE_projectId, FIREBASE_storageBucket, FIREBASE_messagingSenderId, FIREBASE_appId, FIREBASE_measurementId} = process.env

const firebaseConfig = {
  apiKey: FIREBASE_API,
  authDomain: "nelvex-cd0ae.firebaseapp.com",
  projectId: "nelvex-cd0ae",
  storageBucket: "nelvex-cd0ae.appspot.com",
  messagingSenderId: "173025243497",
  appId: "1:173025243497:web:408e95e3cad07da5068df8",
  measurementId: "G-8B1DN59Y26"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)