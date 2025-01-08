import './modulestyle.css';

function SignUpForm() {
    return (
        <form>
            <div>
                <label htmlFor="type">Pick a Type</label>
                <select id="type" name="type">
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                </select>
            </div>
            <div>
                <label htmlFor="username">Username</label>
                <input type="text" id="username" name="username" required />
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password" required />
            </div>
            <div>
                <label htmlFor="retypePassword">Retype Password</label>
                <input type="password" id="retypePassword" name="retypePassword" required />
            </div>
            <button type="submit">Submit</button>
        </form>
    );
}

export default SignUpForm;
