import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCb30RsyQJFjDzhH9fm9Klw1SaZsMJzRhM",
  authDomain: "quiz-2025-8c525.firebaseapp.com",
  databaseURL: "https://quiz-2025-8c525-default-rtdb.firebaseio.com",
  projectId: "quiz-2025-8c525",
  storageBucket: "quiz-2025-8c525.firebasestorage.app",
  messagingSenderId: "651791232882",
  appId: "1:651791232882:web:b18d83b2edee0f677ff7eb",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
export { db, auth};
