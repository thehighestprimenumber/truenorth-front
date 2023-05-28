import {initializeApp} from 'firebase/app';
import * as firebaseAuth from 'firebase/auth';
import {connectAuthEmulator, getAuth} from 'firebase/auth';
import {connectFirestoreEmulator, getFirestore} from 'firebase/firestore';
import {connectFunctionsEmulator, getFunctions} from 'firebase/functions';
import {createUserInDbIfNotExists} from './helpers/functions';
import {FirebaseUserWithData} from "./shared/User";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const configs = <{ [k: string]: string }>import.meta.env;
export const firebaseConfig = {
    apiKey: configs.VITE_API_KEY,
    authDomain: configs.VITE_AUTH_DOMAIN,
    projectId: configs.VITE_PROJECT_ID,
    storageBucket: configs.VITE_STORAGE_BUCKET,
    messagingSenderId: configs.VITE_MESSAGING_SENDER_ID,
    appId: configs.VITE_APP_ID
};


// Configure Firebase.
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore(app);
export const functions = getFunctions(app);

if (configs.MODE === 'development') {
    console.log('connecting to emulators');
    connectFunctionsEmulator(functions, 'localhost', 5001);
    connectFirestoreEmulator(db, 'localhost', 8080);
    connectAuthEmulator(auth, 'http://localhost:9099');
}

// Configure FirebaseUI.
export const uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: 'popup',
    // We will display Google and Facebook as auth providers.
    signInOptions: [
        firebaseAuth.GoogleAuthProvider.PROVIDER_ID,
        firebaseAuth.EmailAuthProvider.EMAIL_PASSWORD_SIGN_IN_METHOD
    ],
    callbacks: {
        signInSuccess: async (user: FirebaseUserWithData) => {
            await createUserInDbIfNotExists(user);
        }
    }
    // @ts-ignore
} as unknown as firebaseui.auth.Config;
