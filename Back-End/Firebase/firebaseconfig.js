import { initializeApp } from "@firebase/app";
import { getAnalytics } from "@firebase/analytics";
import { getAuth } from "@firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAwcgZmRlw0fAAPRJG8XqwL3OaI0GficnU",
  authDomain: "voluntrack-31756.firebaseapp.com",
  projectId: "voluntrack-31756",
  storageBucket: "voluntrack-31756.firebasestorage.app",
  messagingSenderId: "345230790147",
  appId: "1:345230790147:web:fa78e3bf4db736e3ca0836",
  measurementId: "G-1CVQN9MFJ6"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
export { auth, analytics};
