import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGIN_ID,
  appId: process.env.REACT_APP_APP_ID,
};

// firebase 초기화
const firebase = initializeApp(firebaseConfig);

// firebase인증 초기화하고 내보냄
export const authService = getAuth(firebase);

// firebase clound store 초기화
export const dbService = getFirestore(firebase);

// storage 초기화
export const storageService = getStorage(firebase);
