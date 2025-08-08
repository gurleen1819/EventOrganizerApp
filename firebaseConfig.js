
import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBb1dRF4_tGwMgKNd5bFIpTuWoDNGO--k0",
  authDomain: "eventorganizerapp-b1cca.firebaseapp.com",
  projectId: "eventorganizerapp-b1cca",
  storageBucket: "eventorganizerapp-b1cca.appspot.com", 
  messagingSenderId: "590071211189",
  appId: "1:590071211189:web:6cf72e36d4468781b94afc"
};


const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];


export const auth = getAuth(app);
export const db = getFirestore(app);
