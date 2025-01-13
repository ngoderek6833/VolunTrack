import './modulestyle.css'; 
import SignInForm from './signinform.jsx';
import GoogleSignIn from './googlesignin.jsx';
function MiddleSection() {
  return (
      <div id = "MiddleSection">
        <SignInForm/>   
        <GoogleSignIn/>
      </div>
  );
}
export default MiddleSection;
