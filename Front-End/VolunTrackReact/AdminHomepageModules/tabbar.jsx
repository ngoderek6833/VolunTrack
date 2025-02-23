import { useState } from "react";
import "./modulestyle.css";

function TabBar() {
  const [activeTab, setActiveTab] = useState("create");

  return (
    <>
      <div className="tab-bar">
        <button
          className={`tab-button ${activeTab === "create" ? "active" : ""}`}
          onClick={() => setActiveTab("create")}
        >
          Create Events
        </button>
        <button
          className={`tab-button ${activeTab === "requests" ? "active" : ""}`}
          onClick={() => setActiveTab("requests")}
        >
          Events Requests
        </button>
        <button
          className={`tab-button ${activeTab === "finished" ? "active" : ""}`}
          onClick={() => setActiveTab("finished")}
        >
          Finished Events
        </button>
        <button
          className={`tab-button ${activeTab === "past" ? "active" : ""}`}
          onClick={() => setActiveTab("past")}
        >
          Past Events
        </button>
      </div>
      <div className="tab-content">
        {activeTab === "create" && (
          <div>
            <p>Use this section to create new events and manage event details.</p>
          </div>
        )}
        {activeTab === "requests" && (
          <div>
            <p>View and manage requests from users interested in your events.</p>
          </div>
        )}
        {activeTab === "finished" && (
          <div>
            <p>Check the events that have already been completed and gather feedback.</p>
          </div>
        )}
        {activeTab === "past" && (
          <div>
            <p>Review past events and track historical event data.</p>
          </div>
        )}
      </div>
    </>
  );
}

export default TabBar;
