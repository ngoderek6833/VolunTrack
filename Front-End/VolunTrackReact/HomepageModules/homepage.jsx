import React from 'react';
import ReactDOM from 'react-dom/client';
import TopBar from "./topbar";
import MiddleSection from "./middlesection.jsx";
import Footer from "./footer.jsx";

ReactDOM.createRoot(document.getElementById('Homepage')).render(
    <React.StrictMode>
        <TopBar/>
        <MiddleSection/>
        <Footer/>
    </React.StrictMode>
);
