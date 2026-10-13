// js/firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import { 
    getAuth, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    sendPasswordResetEmail 
} from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";
import { 
    getDatabase, 
    ref, 
    set, 
    get, 
    child, 
    onValue 
} from "https://www.gstatic.com/firebasejs/11.6.1/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyAxyqI4AFpIjDTN3gt5YreN8J5-UrJIcfA",
    authDomain: "walletcrocs.firebaseapp.com",
    databaseURL: "https://walletcrocs-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "walletcrocs",
    storageBucket: "walletcrocs.firebasestorage.app",
    messagingSenderId: "516866578623",
    appId: "1:516866578623:web:60d3b71d31c9789a708e0a",
    measurementId: "G-HS5EGT87F6"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);

export { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    sendPasswordResetEmail,
    ref, set, get, child, onValue 
};