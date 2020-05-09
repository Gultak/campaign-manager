import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
};

export default class Firebase {
  constructor() {
    app.initializeApp(config);
    this.auth = app.auth()
    this.store = app.firestore()
  }

  // *** Auth API ***

  doCreateUser = (email, password) => this.auth.createUserWithEmailAndPassword(email, password);
  doLoginUser = (email, password) => this.auth.signInWithEmailAndPassword(email, password);
  doSignOut = () => this.auth.signOut();
  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);
  doPasswordUpdate = password => this.auth.currentUser.updatePassword(password);


  user = uid => this.users().doc(uid);
  users = () => this.store.collection('users');


  timestamp = () => app.firestore.FieldValue.serverTimestamp();
}
