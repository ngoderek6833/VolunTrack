import './modulestyle.css';
import './signupbutton.jsx';
import SignUpButton from './signupbutton.jsx';
import SignInButton from './signinbutton.jsx';
import Favicon from '../Miscellaneous/Images/turtlefavicon.png';

function TopBar() {
  return (
    <div id="TopBar">
      <a href="../index.html" id = "FaviconLink">
        <img src={Favicon} id="Favicon" alt="Turtle Favicon" />
      </a>
      <SignUpButton />
      <SignInButton />
    </div>
  );
}

export default TopBar;
