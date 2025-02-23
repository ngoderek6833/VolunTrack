import { useState } from "react";
import "./modulestyle.css";

function TabBar() {
    const [activeTab, setActiveTab] = useState("events");

    return (
        <>
            <div className="tab-bar">
                <button
                    className={`tab-button ${activeTab === "events" ? "active" : ""}`}
                    onClick={() => setActiveTab("events")}
                >
                    Find Events
                </button>
                <button
                    className={`tab-button ${activeTab === "requested" ? "active" : ""}`}
                    onClick={() => setActiveTab("requested")}
                >
                    Events Requested
                </button>
                <button
                    className={`tab-button ${activeTab === "upcoming" ? "active" : ""}`}
                    onClick={() => setActiveTab("upcoming")}
                >
                    Upcoming Events
                </button>
                <button
                    className={`tab-button ${activeTab === "hours" ? "active" : ""}`}
                    onClick={() => setActiveTab("hours")}
                >
                    Hours
                </button>
            </div>
            <div className="tab-content">
                {activeTab === "events" && <div>Here you can find events.</div>}
                {activeTab === "requested" && <div>Here are your requested events.</div>}
                {activeTab === "upcoming" && <div>Upcoming events will be displayed here.</div>}
                {activeTab === "hours" && <div>Check your hours here.</div>}
            </div>
        </>
    );
}

export default TabBar;
