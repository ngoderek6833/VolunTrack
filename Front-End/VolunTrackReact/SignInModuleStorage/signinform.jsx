import './modulestyle.css';

function SignInForm() {
    return (
        <form id = "Form">
            <div>
                <label htmlFor="username">Email</label>
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
