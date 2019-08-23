import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyBaM6juJpt_D2MiznbudZrfCnh4cUZjhjc",
  authDomain: "crwn-db-2bec2.firebaseapp.com",
  databaseURL: "https://crwn-db-2bec2.firebaseio.com",
  projectId: "crwn-db-2bec2",
  storageBucket: "",
  messagingSenderId: "918421432290",
  appId: "1:918421432290:web:6b8ceace37b886aa"
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider(); //access to google auth provider class from the authentication library
provider.setCustomParameters({ prompt: "select_account" }); //we want to always trigger the google pop up whenever we use this google auth provider for authentication

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
