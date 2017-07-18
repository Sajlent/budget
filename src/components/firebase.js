import Firebase from 'firebase';

const firebaseApp = Firebase.initializeApp({
  apiKey: 'AIzaSyBaARXpCzOmkPWyyiqBhWaXDsRZa0k9-58',
  authDomain: 'budget-app-62d61.firebaseapp.com',
  databaseURL: 'https://budget-app-62d61.firebaseio.com',
  projectId: 'budget-app-62d61',
  storageBucket: '',
  messagingSenderId: '62589260768'
});

firebaseApp.auth().signInWithEmailAndPassword(process.env.FIREBASE_EMAIL, process.env.FIREBASE_PASSWORD);
const db = firebaseApp.database();
export { db };
