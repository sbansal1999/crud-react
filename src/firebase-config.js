import { initializeApp } from "firebase/app";
import { getFirestore } from '@firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyA5Zal4E_jY6mS080QQ8D68gR7eY4Ah83w",
    authDomain: "crud-react-d1ac0.firebaseapp.com",
    projectId: "crud-react-d1ac0",
    storageBucket: "crud-react-d1ac0.appspot.com",
    messagingSenderId: "726005938009",
    appId: "1:726005938009:web:c16d7415eea3648f47fe48",
    measurementId: "G-K1HRN1MLEN"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

