import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyAIxysidXf4lAcYIcTxKfeObXhs0lSZh-w",
  authDomain: "urbanic-6faf5.firebaseapp.com",
  projectId: "urbanic-6faf5",
  storageBucket: "urbanic-6faf5.appspot.com",
  messagingSenderId: "558882126260",
  appId: "1:558882126260:web:b911554473417af76c9ae1",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
export { app, db, auth };
