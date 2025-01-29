import "./modulestyle.css";
import {GoogleAuthProvider, signInWithEmailAndPassword } from "@firebase/auth";
import { auth } from "../../../Back-End/Firebase/firebaseconfig";
import { initializeAccount } from "../../../Back-End/InitializeAccount/initializeaccount";

function SignInForm() {
    const handleSubmit = async (event) => {
        event.preventDefault()
        const email = event.target.email.value;
        const password = event.target.password.value;
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                initializeAccount(user);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message; 
                console.log(errorCode,"second", errorMessage);
            });
    };

    return (
        <form id="Form" onSubmit={handleSubmit}>
            <div>
                <label htmlFor="email">Email</label>
                <input type="text" id="email" name="email" required />
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password" required />
            </div>
            <div>
                <button type="submit">Submit</button>
            </div>
        </form>
    );
}

export default SignInForm;
