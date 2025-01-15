import './modulestyle.css';


function GoogleSignIn() {
    
    return (
        <button id="GoogleSignIn">
            Sign In With Google
        </button>
    );
}

export default GoogleSignIn;



/*

import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../../Back-End/Firebase/Firebase";

const handleGoogle = async (e) => {
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            console.log("User signed in:", result.user); 
        } catch (error) {
            console.error("Error signing in with Google:", error); 
        }
    }; 
     
 onClick={handleGoogle}   
    
*/