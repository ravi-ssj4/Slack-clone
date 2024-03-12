// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAItEbHgIPtHhBCWXN3ODAl5cnKtWTRsSI",
  authDomain: "slack-clone-ravi.firebaseapp.com",
  projectId: "slack-clone-ravi",
  storageBucket: "slack-clone-ravi.appspot.com",
  messagingSenderId: "826026820386",
  appId: "1:826026820386:web:6d3322eeb56aff86d9db7b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const db = getFirestore(app);
const auth = getAuth(app);

// Initialize Google Auth Provider
const provider = new GoogleAuthProvider();

export { db, auth, provider };
