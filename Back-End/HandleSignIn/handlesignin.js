import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../Firebase/firebaseconfig";

function handleSignIn(email, password) {
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log("User Information:", user);
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
        });;
}


function handleSignInGoogle(user) {
    console.log("Google User Information:", user);
}

function inializeAccoount() {

}

export { handleSignIn, handleSignInGoogle };
