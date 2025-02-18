import './modulestyle.css';

function LogoutButton () {
  const handleClick = () => {
    localStorage.removeItem("loggedInUserId"); 
    window.location.href = "../index.html"; 
  };
  return (
    <button id="LogoutButton" className="Button" onClick={handleClick}>
      Log Out
    </button>
  );
}

export default LogoutButton;
