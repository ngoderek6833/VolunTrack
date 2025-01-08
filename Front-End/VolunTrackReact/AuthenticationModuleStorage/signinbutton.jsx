import './modulestyle.css';

function SignInButton() {
    const handleClick = () => {
        window.location.href = "../SignInModuleStorage/signin.html";
    };
    return (
        <button id="SignInButton" className = "Button" onClick={handleClick}>
            Sign In
        </button>
    );
}

export default SignInButton;