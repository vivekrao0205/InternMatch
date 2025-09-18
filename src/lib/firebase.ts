import { initializeApp, getApps, getApp, type FirebaseOptions } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig: FirebaseOptions = {
  "projectId": "studio-144960523-e2f7c",
  "appId": "1:39316924196:web:cac0e7b8576c85115575b1",
  "storageBucket": "studio-144960523-e2f7c.firebasestorage.app",
  "apiKey": "AIzaSyA9DeQhCtALGZQYMrosloWcUTgm3gKun7c",
  "authDomain": "studio-144960523-e2f7c.firebaseapp.com",
  "measurementId": "",
  "messagingSenderId": "39316924196"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);

export { app, auth };
