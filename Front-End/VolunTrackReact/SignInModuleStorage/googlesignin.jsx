import './modulestyle.css';
import { GoogleAuthProvider, signInWithPopup, browserPopupRedirectResolver } from "@firebase/auth";
import { auth } from "../../../Back-End/Firebase/firebaseconfig"; 
import { initializeAccount } from '../../../Back-End/InitializeAccount/initializeaccount';

function GoogleSignIn() {
    const handleGoogle = async () => {
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider, browserPopupRedirectResolver);
            const user = result.user; 
            initializeAccount(user);
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
