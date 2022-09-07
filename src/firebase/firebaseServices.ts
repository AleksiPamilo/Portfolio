import { FirebaseApp, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyBHncTcMeumscU8F8jA7THqIOUWsiptKmg",
    authDomain: "portfoliov2-ec4e0.firebaseapp.com",
    projectId: "portfoliov2-ec4e0",
    storageBucket: "portfoliov2-ec4e0.appspot.com",
    messagingSenderId: "420874037621",
    appId: "1:420874037621:web:720970bcf6b72a03030b3c",
    measurementId: "G-8ZRY3610JD"
};

let FirebaseInstance: FirebaseApp;

const InitializeApp = () => {
    if (!FirebaseInstance) {
        FirebaseInstance = initializeApp(firebaseConfig);
    }

    return FirebaseInstance;
};

const GetAuthInstance = () => {
    const firebaseInstance = InitializeApp();

    return getAuth(firebaseInstance);
};

const GetFirestoreInstance = () => {
    const firestoreInstance = InitializeApp();

    return getFirestore(firestoreInstance);
};

const GetAnalytics = () => {
    const firestoreInstance = InitializeApp();

    return getAnalytics(firestoreInstance);
};

const FirebaseServices = {
    getAuthInstance: GetAuthInstance,
    getFirestoreInstance: GetFirestoreInstance,
    getAnalytics: GetAnalytics,
};

export default FirebaseServices;