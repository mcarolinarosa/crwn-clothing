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

  const userRef = firestore.doc(`users/22hr4h54htr24899`);

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

export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  const collectionRef = firestore.collection(collectionKey);

  const batch = firestore.batch();
  objectsToAdd.forEach(obj => {
    const newDocRef = collectionRef.doc();
    batch.set(newDocRef, obj);
  });

  return await batch.commit();
};

export const convertCollectionsSnapshotToMap = collections => {
  const transformedCollection = collections.docs.map(doc => {
    const { title, items } = doc.data();

    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items
    };
  });

  //we pass in the initial object ({}), that goes into the first new collection
  //it sets the first value equal to the title , but in lowercase
  return transformedCollection.reduce((accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection;
    return accumulator;
  }, {});
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider(); //access to google auth provider class from the authentication library
provider.setCustomParameters({ prompt: "select_account" }); //we want to always trigger the google pop up whenever we use this google auth provider for authentication and sign in

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
