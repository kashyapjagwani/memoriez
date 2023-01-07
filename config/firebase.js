import firebase from "firebase/app";
import "firebase/storage";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAhtUc9WrDMj9PsB2SyPeFv9JLlj5NbJ4U",
  authDomain: "memoriez-cd1de.firebaseapp.com",
  databaseURL: "https://memoriez-cd1de-default-rtdb.firebaseio.com",
  projectId: "memoriez-cd1de",
  storageBucket: "memoriez-cd1de.appspot.com",
  messagingSenderId: "323628039327",
  appId: "1:323628039327:web:62063e85313d50e6e6b6aa",
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const projectStorage = firebase.storage();
const projectFirestore = firebase.firestore();
const auth = firebase.auth();
const timeStamp = firebase.firestore.FieldValue.serverTimestamp;

export { projectStorage, projectFirestore, auth, timeStamp };
