import { initializeApp } from "firebase/app";
import { signInWithPopup,
    GoogleAuthProvider,
    signInWithEmailAndPassword as signInWithEmailAndPasswordFunc,
    createUserWithEmailAndPassword,
    sendPasswordResetEmail as sendPasswordResetEmailFunc,
    signOut,
    getAuth
} from "firebase/auth";
import { getFirestore, collection, addDoc, getDocs, where, query } from "firebase/firestore";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAyCO_sIMhtTxt3HkegksDvg_kLdkJwAWg",
    authDomain: "fir-auth-article-e394d.firebaseapp.com",
    projectId: "fir-auth-article-e394d",
    storageBucket: "fir-auth-article-e394d.appspot.com",
    messagingSenderId: "359229493984",
    appId: "1:359229493984:web:8232024b0af03c5f1a7685",
    measurementId: "G-M6REWMQ5E2"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

window.firebase = { auth: () => auth };

const googleProvider = new GoogleAuthProvider();

const signInWithGoogle = async () => {
    try {
        const res = await signInWithPopup(googleProvider);
        const user = res.user;
        const queryObj =  query(collection(db, "users"),
            where("uid", "==", user.uid));
        const querySnapshot = await getDocs(queryObj);
        if (querySnapshot.length === 0) {
            await addDoc(collection(db, "users"), {
                uid: user.uid,
                name: user.displayName,
                authProvider: "google",
                email: user.email,
            });
        }
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};

const signInWithEmailAndPassword = async (email, password) => {
    try {
        await signInWithEmailAndPasswordFunc(auth, email, password);
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};

const registerWithEmailAndPassword = async (name, email, password) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await addDoc(collection(db, "users"), {
            uid: user.uid,
            name,
            authProvider: "local",
            email,
        });
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};

const sendPasswordResetEmail = async (email) => {
    try {
        await sendPasswordResetEmailFunc(auth, email);
        alert("Password reset link sent!");
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};

const logout = () => {
    signOut(auth);
};

export {
    auth,
    db,
    signInWithGoogle,
    signInWithEmailAndPassword,
    registerWithEmailAndPassword,
    sendPasswordResetEmail,
    logout
};