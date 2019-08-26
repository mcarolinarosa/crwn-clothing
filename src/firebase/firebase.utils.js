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

// function that allows us to take the user Auth object that we got back from our
// authentication library and store it inside our database
export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return; //if userAuth == null -> return

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({ displayName, email, createdAt, ...additionalData });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }
  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider(); //access to google auth provider class from the authentication library
provider.setCustomParameters({ prompt: "select_account" }); //we want to always trigger the google pop up whenever we use this google auth provider for authentication and sign in

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
