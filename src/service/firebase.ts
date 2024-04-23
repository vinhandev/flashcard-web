// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAC7J09fSB0BQnTH0_EluXcPtuaCiljOnA',
  authDomain: 'flashcard-49c5b.firebaseapp.com',
  projectId: 'flashcard-49c5b',
  storageBucket: 'flashcard-49c5b.appspot.com',
  messagingSenderId: '822744568403',
  appId: '1:822744568403:web:62f1f37ab1be1cfd68aca6',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
