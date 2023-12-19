import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyDXQcOxunBlwdiB-U72WQ1rhy5c8pTTLOY',
  authDomain: 'adverise-66a17.firebaseapp.com',
  projectId: 'adverise-66a17',
  storageBucket: 'adverise-66a17.appspot.com',
  messagingSenderId: '886293815424',
  appId: '1:886293815424:web:e54c9439718de082bf0665',
  measurementId: 'G-YY4P7KTY2V',
};

const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth(app);

