// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
const firebaseConfig = {
  apiKey: "AIzaSyA-lnkB3BXBlO2wNE2o-A9WN7CCtlIgSPo",
  authDomain: "todosjavv.firebaseapp.com",
  databaseURL: "https://todosjavv-default-rtdb.firebaseio.com",
  projectId: "todosjavv",
  storageBucket: "todosjavv.appspot.com",
  messagingSenderId: "969358434948",
  appId: "1:969358434948:web:abe348d9086972d10058d1"
};

const app = initializeApp(firebaseConfig);
export default app;