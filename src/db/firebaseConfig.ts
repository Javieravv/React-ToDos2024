// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
const firebaseConfig = {
  apiKey              : import.meta.env.VITE_REACT_APP_APIKEY,
  authDomain          : import.meta.env.VITE_REACT_APP_AUTHDOMAIN,
  databaseURL         : import.meta.env.VITE_REACT_APP_DATABASEURL,
  projectId           : import.meta.env.VITE_REACT_APP_PROJECTID,
  storageBucket       : import.meta.env.VITE_REACT_APP_STORAGEBUCKET,
  messagingSenderId   : import.meta.env.VITE_REACT_APP_MESSAGINGSENDERID,
  appId               : import.meta.env.VITE_REACT_APP_APPID
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
export default db;