import firebase from 'firebase/app';
import "firebase/auth";
import "firebase/firestore";

const config = {
    apiKey: "AIzaSyB_DeO6rU4Uox91BvkOry8nC1HQ6dFhdwg",
    authDomain: "crwn-db-b65d3.firebaseapp.com",
    projectId: "crwn-db-b65d3",
    storageBucket: "crwn-db-b65d3.appspot.com",
    messagingSenderId: "864328597569",
    appId: "1:864328597569:web:9d7f2446715717cae306c0",
    measurementId: "G-NMHEG2V7KH"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if(!snapShot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date()

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        } catch (err) {
            console.log('error creating user', err);
        }
    }

    return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;