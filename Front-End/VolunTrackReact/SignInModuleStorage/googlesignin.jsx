import './modulestyle.css';
import { GoogleAuthProvider, signInWithPopup, browserPopupRedirectResolver } from "@firebase/auth";
import { auth, db } from "../../../Firebase/firebaseconfig";
import { setDoc, doc, getDoc } from "@firebase/firestore";
import { initializeAccount } from "../InitializeModules/initializeaccount";

function GoogleSignIn() {
    const handleGoogle = async () => {
        const provider = new GoogleAuthProvider();
        event.preventDefault();
        signInWithPopup(auth, provider)
            .then((userCredential) => {
                console.log("Log-in is successful");
                const user = userCredential.user;
                const docRef = doc(db, "users", user.uid);
                getDoc(docRef)
                    .then((docSnap) => {
                        if (!docSnap.exists()) {
                            const userData = {
                                firstName: user.displayName?.split(" ")[0] || "",
                                lastName: user.displayName?.split(" ")[1] || "",
                                email: user.email,
                                initialized: false
                            };

                            setDoc(docRef, userData)
                                .then(() => console.log("New Google user added to Firestore"))
                                .catch((error) => console.error("Error adding user to Firestore:", error));
                        } else {
                            console.log("User already exists in Firestore");
                        }
                    })
                    .catch((error) => console.error("Error fetching user document:", error));
                localStorage.setItem("loggedInUserId", user.uid);
                initializeAccount(user.uid);
            })
            .catch((error) => {
                console.log("Error signing in with Google:", error);
            })
    };

    return (
        <button id="GoogleSignIn" onClick={handleGoogle}>
            Sign In With Google
        </button>
    );
}

export default GoogleSignIn;
