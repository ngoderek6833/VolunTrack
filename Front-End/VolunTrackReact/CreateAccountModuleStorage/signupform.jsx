import './modulestyle.css';
import { GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../Back-End/Firebase/firebaseconfig";
function SignUpForm() {
    const handleSubmit = async (event) => {
        const email = event.target.email.value;
        const password = event.target.password.value;
        const retypePassword = event.target.retypePassword.value;
        if (password !== retypePassword) {
            alert("Passwords do not match.");
            return;
        }
        try {
            const userCredential = createUserWithEmailAndPassword(auth, email, password);
            alert("Account created successfully! Please Log In With Credentials");
        } catch (error) {
            alert("Error creating account");
        }
    };
    return (
        <div>
            <form id="Form" onSubmit={handleSubmit}>
                <h1>Sign Up</h1>
                <hr />
                <div>
                    <label htmlFor="type">Pick a Type</label>
                    <select id="type" name="type">
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input type="text" id="email" name="email" required />
                </div>
                <div>
                    <label htmlFor="username">Username</label>
                    <input type="text" id="username" name="username" required />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" name="password" required minLength="6" />
                </div>
                <div>
                    <label htmlFor="retypePassword">Retype Password</label>
                    <input type="password" id="retypePassword" name="retypePassword" required minLength="6" />
                </div>
                <div>
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    );
}

export default SignUpForm;
