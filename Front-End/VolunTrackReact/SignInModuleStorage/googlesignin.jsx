import './modulestyle.css';
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../../Back-End/Firebase/Firebase";

function GoogleSignIn() {
    const handleGoogle = async (e) => {
        e.preventDefault();
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            console.log('User signed in:', result.user); 
        } catch (error) {
            console.error('Error signing in with Google:', error); 
        }
    };
    return (
        <button id="GoogleSignIn" onClick={handleGoogle}>
            Sign In With Google
        </button>
    );
}

export default GoogleSignIn;
