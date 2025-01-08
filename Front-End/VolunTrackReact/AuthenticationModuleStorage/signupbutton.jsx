import './modulestyle.css';

function SignUpButton() {
  const handleClick = () => {
    window.location.href = "../CreateAccountModuleStorage/createaccount.html";
  };
  return (
    <button id="SignUpButton" className="Button" onClick={handleClick}>
      Sign Up
    </button>
  );
}

export default SignUpButton;
