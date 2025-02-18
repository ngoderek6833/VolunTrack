import './modulestyle.css';
import { GoogleAuthProvider, signInWithPopup } from "@firebase/auth";
import { auth, db } from "../../../Firebase/firebaseconfig";
import { setDoc, doc, getDoc } from "@firebase/firestore";
import { initializeAccount } from "../InitializeModules/initializeaccount";

function GoogleSignIn() {
    const handleGoogle = async (event) => {
        const provider = new GoogleAuthProvider();
        event.preventDefault();
        try {
            const userCredential = await signInWithPopup(auth, provider);
            console.log("Log-in is successful");
            const user = userCredential.user;
            const docRef = doc(db, "users", user.uid);
            const docSnap = await getDoc(docRef);
            if (!docSnap.exists()) {
                const userData = {
                    firstName: user.displayName?.split(" ")[0] || "",
                    lastName: user.displayName?.split(" ")[1] || "",
                    email: user.email,
                    initialized: false
                };
                await setDoc(docRef, userData, { merge: true }); 
                console.log("New Google user added to Firestore");
                localStorage.setItem("loggedInUserId", user.uid);
                await initializeAccount();
            } else {
                console.log("User already exists in Firestore");
                localStorage.setItem("loggedInUserId", user.uid);
                await initializeAccount();
            }
        } catch (error) {
            console.error("Error signing in with Google:", error);
        }
    };
    
    return (
        <button id="GoogleSignIn" onClick={handleGoogle}>
            Sign In With Google
        </button>
    );
}

export default GoogleSignIn;
