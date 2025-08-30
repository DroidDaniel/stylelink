import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
   apiKey: "AIzaSyAWIZW17HC2rCabzsmXnoN629eWRfUzNW4",
  authDomain: "stylelink-9e5a1.firebaseapp.com",
  projectId: "stylelink-9e5a1",
  storageBucket: "stylelink-9e5a1.firebasestorage.app",
  messagingSenderId: "1038053959040",
  appId: "1:1038053959040:web:ca76650a503e3094f68d65",
  measurementId: "G-6L0NMS9ZFG"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account'
});