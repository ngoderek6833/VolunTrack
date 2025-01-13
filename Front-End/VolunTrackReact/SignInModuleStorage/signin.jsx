import React from 'react';
import ReactDOM from 'react-dom/client';
import TopBar from '../AuthenticationModuleStorage/topbar.jsx'; 
import Footer from '../AuthenticationModuleStorage/footer.jsx'; 
import MiddleSection from './middlesection.jsx';

ReactDOM.createRoot(document.getElementById('SignInPage')).render(
    <React.StrictMode>
        <TopBar/>
        <MiddleSection/>
        <Footer/>
    </React.StrictMode>
);
