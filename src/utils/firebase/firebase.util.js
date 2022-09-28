import { initializeApp } from "firebase/app";
import {
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider
} from "firebase/auth";

import {
    getFirestore,
    doc,
    getDoc,
    setDoc
} from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAtjv0kh0eCR0Fvu5I1lg9v_31r2rKrZ94",
    authDomain: "crwn-clothing-elchino-db.firebaseapp.com",
    projectId: "crwn-clothing-elchino-db",
    storageBucket: "crwn-clothing-elchino-db.appspot.com",
    messagingSenderId: "595883278922",
    appId: "1:595883278922:web:89ab1e87333c2b17939cb3"
};

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth(); //singleton
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore(); //singleton
export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, "users", userAuth.uid);
    const userSnapShot = await getDoc(userDocRef);

    if (!userSnapShot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();
        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt
            });
        } catch (error) {
            console.log("error creating the user", error.message);
        }
    }

    return userDocRef;
}