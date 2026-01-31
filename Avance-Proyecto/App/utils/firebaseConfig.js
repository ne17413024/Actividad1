import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

// ⚠️ Tus credenciales (estas están bien)
const firebaseConfig = {
  apiKey: "AIzaSyDVrjAVX1T7s0fm_XQv6881XF1iWqv_zTM",
  authDomain: "invitadosbautizo-11e92.firebaseapp.com",
  databaseURL: "https://invitadosbautizo-11e92-default-rtdb.firebaseio.com",
  projectId: "invitadosbautizo-11e92",
  storageBucket: "invitadosbautizo-11e92.firebasestorage.app",
  messagingSenderId: "831409881422",
  appId: "1:831409881422:web:b4545f6bdbf74c8f115e1f",
};

// 🔥 Inicializa Firebase
const app = initializeApp(firebaseConfig);

// 🔐 Authentication
export const auth = getAuth(app);

// 📦 Realtime Database
export const db = getDatabase(app);
