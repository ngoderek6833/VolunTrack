import './modulestyle.css';
import { GoogleAuthProvider, signInWithPopup, browserPopupRedirectResolver } from "firebase/auth";
import { auth } from "../../../Back-End/Firebase/firebaseconfig"; 

function GoogleSignIn() {
    const handleGoogle = async () => {
        const provider = new GoogleAuthProvider();
        try {
            const result = signInWithPopup(auth, provider, browserPopupRedirectResolver);
            console.log("User signed in:", result.user);
        } catch (error) {
            console.error("Error signing in with Google:", error.message);
        }
    };
    return (
        <button id="GoogleSignIn" onClick={handleGoogle}>
            Sign In With Google
        </button>
    );
}

export default GoogleSignIn;
