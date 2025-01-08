import React from 'react';
import ReactDOM from 'react-dom/client';
import TopBar from './AuthenticationModuleStorage/topbar.jsx'; 
import Footer from './AuthenticationModuleStorage/footer.jsx'; 

ReactDOM.createRoot(document.getElementById('AuthenticationPage')).render(
    <React.StrictMode>
        <TopBar/>
        <Footer/>
    </React.StrictMode>
);
