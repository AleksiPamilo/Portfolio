import { FirebaseApp, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyCzeXeyQhsTaJ-r1IIAJ22AREujnfng_1o",
    authDomain: "portfolio-e3888.firebaseapp.com",
    projectId: "portfolio-e3888",
    storageBucket: "portfolio-e3888.appspot.com",
    messagingSenderId: "575122960867",
    appId: "1:575122960867:web:c533a9f7eb15c41480f0d6",
    measurementId: "G-XZREKM2146"
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
