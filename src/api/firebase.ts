import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBkcxvpqSnInPXwWs8oaOweOwHy1TV9f1s',
  authDomain: 'eat-rite-43d83.firebaseapp.com',
  projectId: 'eat-rite-43d83',
  storageBucket: 'eat-rite-43d83.firebasestorage.app',
  messagingSenderId: '997452131327',
  appId: '1:997452131327:web:4e38119689915f5909d5ca',
  measurementId: 'G-3SM96ZW2CR',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const db = getFirestore(app);

export { auth, googleProvider };
export default db;
