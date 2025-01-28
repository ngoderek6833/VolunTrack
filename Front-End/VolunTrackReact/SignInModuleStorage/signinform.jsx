import "./modulestyle.css"; 
import { handleSignIn } from "../../../Back-End/HandleSignIn/handlesignin";

function SignInForm() {
    const handleSubmit = (event) => {
        event.preventDefault();
        const email = event.target.email.value; 
        const password = event.target.password.value; 
        handleSignIn(email, password); 
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
