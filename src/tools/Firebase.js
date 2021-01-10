import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import * as firebaseui from 'firebaseui';

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
  uiConfig = () => {
    return {
      // signInFlow: 'popup',
      signInSuccessUrl: '/',
      credentialHelper: firebaseui.auth.CredentialHelper.NONE,
      signInOptions: [
        app.auth.EmailAuthProvider.PROVIDER_ID,
        app.auth.GoogleAuthProvider.PROVIDER_ID,
        app.auth.FacebookAuthProvider.PROVIDER_ID,
      ]
    };
  }

  doCreateUser = (email, password) => this.auth.createUserWithEmailAndPassword(email, password);
  doLoginUser = (email, password) => this.auth.signInWithEmailAndPassword(email, password);
  doSignOut = () => this.auth.signOut();
  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);
  doPasswordUpdate = password => this.auth.currentUser.updatePassword(password);

  store = () => this.store;

  users = () => this.store.collection('users');
  characters = () => this.store.collection('characters');
  campaigns = () => this.store.collection('campaigns');

  user = uid => this.users().doc(uid);
  character = uid => this.characters().doc(uid);
  campaign = uid => this.campaigns().doc(uid);

  timestamp = () => app.firestore.FieldValue.serverTimestamp();
}
