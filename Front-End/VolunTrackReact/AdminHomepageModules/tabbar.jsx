import { useState } from "react";
import "./modulestyle.css";
import { db } from "../../../Firebase/firebaseconfig";
import { setDoc, doc } from "@firebase/firestore";

function TabBar() {
  const [activeTab, setActiveTab] = useState("create");
  const [eventData, setEventData] = useState({
    name: "",
    location: "",
    timeRange: "",
    date: "",
    limit: "",
    age: "",
    description: ""
  });

  const ID = localStorage.getItem("loggedInUserId"); 

  const handleChange = (e) => {
    setEventData({ ...eventData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!ID) {
      alert("Error: Admin ID not found.");
      return;
    }

    const eventID = `${eventData.name}_${eventData.date}`;
    const eventWithAdmin = { ...eventData, adminID: ID }; 

    try {
      await setDoc(doc(db, "events", eventID), eventWithAdmin);
      alert("Event created successfully!");
      setEventData({
        name: "",
        location: "",
        timeRange: "",
        date: "",
        limit: "",
        age: "",
        description: ""
      });
    } catch (error) {
      console.error("Error creating event: ", error);
      alert("Failed to create event.");
    }
  };

  return (
    <>
      <div className="tab-bar">
        <button className={`tab-button ${activeTab === "create" ? "active" : ""}`} onClick={() => setActiveTab("create")}>
          Create Events
        </button>
        <button className={`tab-button ${activeTab === "requests" ? "active" : ""}`} onClick={() => setActiveTab("requests")}>
          Events Requests
        </button>
        <button className={`tab-button ${activeTab === "finished" ? "active" : ""}`} onClick={() => setActiveTab("finished")}>
          Finished Events
        </button>
        <button className={`tab-button ${activeTab === "past" ? "active" : ""}`} onClick={() => setActiveTab("past")}>
          Past Events
        </button>
      </div>
      <div className="tab-content">
        {activeTab === "create" && (
          <div>
            <form onSubmit={handleSubmit} className="event-form">
              <input type="text" name="name" placeholder="Event Name" value={eventData.name} onChange={handleChange} required />
              <input type="text" name="location" placeholder="Location" value={eventData.location} onChange={handleChange} required />
              <input type="text" name="timeRange" placeholder="Time Range" value={eventData.timeRange} onChange={handleChange} required />
              <input type="date" name="date" value={eventData.date} onChange={handleChange} required />
              <input type="number" name="limit" placeholder="Limit of People" value={eventData.limit} onChange={handleChange} required />
              <input type="number" name="age" placeholder="Minimum Age" value={eventData.age} onChange={handleChange} required />
              <textarea name="description" placeholder="Event Description" value={eventData.description} onChange={handleChange} required></textarea>
              <button type="submit" id="SubmitButton">Create Event</button>
            </form>
          </div>
        )}
        {activeTab === "requests" && <div><p>View and manage requests from users interested in your events.</p></div>}
        {activeTab === "finished" && <div><p>Check completed events and gather feedback.</p></div>}
        {activeTab === "past" && <div><p>Review past events and track historical event data.</p></div>}
      </div>
    </>
  );
}

export default TabBar;
