import app from "firebase/app"
import firebase from "firebase"

const firebaseConfig = {
    apiKey: "AIzaSyCZjPrIDZNyRIDK2O_UYgPAg1G_rZssXnY",
    authDomain: "proyecto-prog-3.firebaseapp.com",
    projectId: "proyecto-prog-3",
    storageBucket: "proyecto-prog-3.appspot.com",
    messagingSenderId: "639895630787",
    appId: "1:639895630787:web:ac7c897481ba4fb707c376"
};

app.initializeApp(firebaseConfig)

export const auth = firebase.auth()
export const storage = app.storage()
export const db = app.firestore()

