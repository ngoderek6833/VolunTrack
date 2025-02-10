import './modulestyle.css';
import { createUserWithEmailAndPassword } from "@firebase/auth";
import { auth, db } from "../../../Firebase/firebaseconfig";
import { setDoc, doc } from "@firebase/firestore";

function SignUpForm() {
    const handleSubmit = async (event) => {
        event.preventDefault();
        const email = event.target.email.value;
        const password = event.target.password.value;
        const retypePassword = event.target.retypePassword.value;
        const firstName = event.target.firstname.value;
        const lastName = event.target.lastname.value;

        if (password !== retypePassword) {
            alert("Passwords do not match.");
            return;
        }

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                const userData = {
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    initialized: false
                };
                alert("Account created successfully, please log-in");
                const docRef = doc(db, "users", user.uid);
                setDoc(docRef, userData)
                    .then(() => {
                        console.log("Data stored correctly");
                    })
                    .catch((error) => {
                        console.log("Error writing document", error);
                    });
            })
            .catch((error) => {
                const errorCode = error.code;
                if (errorCode == "auth/email-already-in-use") {
                    alert("Email address already exists");
                }
                else {
                    alert("Unable to create user");
                }
            })
    };

    return (
        <div>
            <form id="Form" onSubmit={handleSubmit}>
                <h1>Sign Up</h1>
                <hr />
                <div>
                    <label htmlFor="firstname">First Name</label>
                    <input type="text" id="firstname" name="firstname"/>
                </div>
                <div>
                    <label htmlFor="lastname">Last Name</label>
                    <input type="text" id="lastname" name="lastname"/>
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input type="text" id="email" name="email" required />
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
