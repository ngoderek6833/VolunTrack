import './modulestyle.css';

import Favicon from '../Miscellaneous/Images/turtlefavicon.png';
import SettingsButton from "./settingsbutton.jsx";
import LogoutButton from "./logoutbutton.jsx";

function TopBar() {
    return (
        <div id="TopBar">
            <img src={Favicon} id="Favicon" alt="Turtle Favicon" />
            <LogoutButton></LogoutButton>
            <SettingsButton></SettingsButton>
        </div>
    );
}

export default TopBar;
