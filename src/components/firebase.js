import Firebase from 'firebase';

const firebaseApp = Firebase.initializeApp({
  apiKey: 'AIzaSyC5MK9ZxI3K2CrAfMbvvI7MuogAWWxnOC0',
  authDomain: 'personal-budget-ba404.firebaseapp.com',
  //databaseURL: 'https://personal-budget-ba404.firebaseio.com',
  projectId: 'personal-budget-ba404',
  //storageBucket: '',
  //messagingSenderId: '62589260768'
});

firebaseApp.auth().signInWithEmailAndPassword(process.env.VUE_APP_FIREBASE_EMAIL, process.env.VUE_APP_FIREBASE_PASSWORD);
const db = firebaseApp.firestore();
export { db };
