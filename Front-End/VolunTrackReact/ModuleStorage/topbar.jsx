import './modulestyle.css';
import './signupbutton.jsx';
import SignUpButton from './signupbutton.jsx';
import SignInButton from './signinbutton.jsx';

function TopBar() {
  return (
      <div id = "TopBar">
          <SignUpButton> </SignUpButton>
          <SignInButton> </SignInButton>
      </div>
  );
}

export default TopBar;
