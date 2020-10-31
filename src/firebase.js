import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyAfV7kTzY7eOU6ygNF0-L0LSU67cgJXW9s",
    authDomain: "imessage-clone-54dab.firebaseapp.com",
    databaseURL: "https://imessage-clone-54dab.firebaseio.com",
    projectId: "imessage-clone-54dab",
    storageBucket: "imessage-clone-54dab.appspot.com",
    messagingSenderId: "627563022284",
    appId: "1:627563022284:web:1c6f2e60369a2719e77f69",
    measurementId: "G-63CKXKHZBV"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);

  const db = firebase.firestore();
  const auth = firebase.auth();

  const provider = new firebase.auth.GoogleAuthProvider();

  export {auth, provider};
  export default db;