import "./modulestyle.css";
import {signInWithEmailAndPassword } from "@firebase/auth";
import { auth, db} from "../../../Firebase/firebaseconfig";
import {initializeAccount} from "../InitializeModules/initializeaccount";

function SignInForm() {
    const handleSubmit = async (event) => { 
        event.preventDefault();
        const email = event.target.email.value;
        const password = event.target.password.value;
        signInWithEmailAndPassword(auth, email, password)
            .then(async(userCredential) => {
                console.log("Log-in is succesful");
                const user = userCredential.user;
                localStorage.setItem("loggedInUserId", user.uid);
                alert("Logged in succesfully");
                await initializeAccount(user.uid);
            })
            .catch((error) => {
                const errorCode = error.code;
                if (errorCode=="auth/invalid-credential") {
                    alert("Incorrect email or password");
                } else {
                    alert("Account does not exist");
                }
            });
    };
    return (
        <form id="Form" onSubmit={handleSubmit}>
            <h1>Sign In</h1>
            <hr />
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
