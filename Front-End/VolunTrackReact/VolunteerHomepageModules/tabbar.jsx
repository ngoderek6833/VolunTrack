import { useState, useEffect } from "react";
import "./modulestyle.css";
import { db } from "../../../Firebase/firebaseconfig";
import { collection, getDocs, doc, updateDoc, arrayUnion, getDoc } from "@firebase/firestore";

function TabBar() {
  const [activeTab, setActiveTab] = useState("events");
  const [events, setEvents] = useState([]);
  const [requestedEvents, setRequestedEvents] = useState([]);
  const [activeEvent, setActiveEvent] = useState(null);
  const userID = localStorage.getItem("loggedInUserId");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "events"));
        const eventsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setEvents(eventsData);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    const fetchRequestedEvents = async () => {
      if (!userID) return;
      try {
        const userRef = doc(db, "users", userID);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          const userData = userSnap.data();
          setRequestedEvents(userData.requestedEvents || []);
        }
      } catch (error) {
        console.error("Error fetching requested events:", error);
      }
    };

    fetchEvents();
    fetchRequestedEvents();
  }, []);

  const handleEventClick = (event) => {
    setActiveEvent(event);
  };

  const handleClosePopup = () => {
    setActiveEvent(null);
  };

  const handleRequest = async () => {
    if (!userID) {
      alert("Error: User not logged in.");
      return;
    }
    if (!activeEvent) return;

    try {
      const userRef = doc(db, "users", userID);
      const userSnap = await getDoc(userRef);
      
      if (!userSnap.exists()) {
        alert("Error: User not found.");
        return;
      }

      const userData = userSnap.data();
      const userAge = userData.age; 

      if (userAge < activeEvent.age) {
        alert(`You must be at least ${activeEvent.age} years old to request this event.`);
        return;
      }

      if (activeEvent.requests?.includes(userID)) {
        alert("You have already requested to join this event.");
        return;
      }

      const eventRef = doc(db, "events", activeEvent.id);
      await updateDoc(eventRef, {
        requests: arrayUnion(userID)
      });

      await updateDoc(userRef, {
        requestedEvents: arrayUnion(activeEvent.id)
      });

      setRequestedEvents([...requestedEvents, activeEvent.id]);

      alert("Request sent successfully!");
    } catch (error) {
      console.error("Error sending request:", error);
      alert("Failed to send request.");
    }
  };

  return (
    <>
      <div className="tab-bar">
        <button className={`tab-button ${activeTab === "events" ? "active" : ""}`} onClick={() => setActiveTab("events")}>
          Find Events
        </button>
        <button className={`tab-button ${activeTab === "requested" ? "active" : ""}`} onClick={() => setActiveTab("requested")}>
          Events Requested
        </button>
        <button className={`tab-button ${activeTab === "upcoming" ? "active" : ""}`} onClick={() => setActiveTab("upcoming")}>
          Upcoming Events
        </button>
        <button className={`tab-button ${activeTab === "hours" ? "active" : ""}`} onClick={() => setActiveTab("hours")}>
          Hours
        </button>
      </div>
      <div className="tab-content">
        {activeTab === "events" && (
          <div className="event-container">
            <div className="event-list">
              {events.length > 0 ? (
                events.map((event) => (
                  <div className="event-card" key={event.id} onClick={() => handleEventClick(event)}>
                    <h3>{event.name}</h3>
                    <p>Max People: {event.limit}</p>
                    <p>Time: {event.timeRange}</p>
                    <p>Age Limit: {event.age}</p>
                  </div>
                ))
              ) : (
                <p>No events available.</p>
              )}
            </div>

            {activeEvent && (
              <div className="popup-overlay" onClick={handleClosePopup}>
                <div className="popup-content" onClick={(e) => e.stopPropagation()}>
                  <h2>{activeEvent.name}</h2>
                  <p><strong>Location:</strong> {activeEvent.location}</p>
                  <p><strong>Time Range:</strong> {activeEvent.timeRange}</p>
                  <p><strong>Date:</strong> {activeEvent.date}</p>
                  <p><strong>Description:</strong> {activeEvent.description}</p>
                  <p><strong>Admin Email:</strong> {activeEvent.adminEmail}</p>
                  <p><strong>Max People:</strong> {activeEvent.limit}</p>
                  <p><strong>Age Limit:</strong> {activeEvent.age}</p>
                  <button onClick={handleRequest}>Request</button>
                  <button onClick={handleClosePopup}>Close</button>
                </div>
              </div>
            )}
          </div>
        )}
        {activeTab === "requested" && (
          <div className="event-container">
            <div className="event-list">
              {requestedEvents.length > 0 ? (
                requestedEvents.map((eventId) => {
                  const event = events.find(e => e.id === eventId);
                  return event ? (
                    <div className="event-card" key={event.id} onClick={() => handleEventClick(event)}>
                      <h3>{event.name}</h3>
                      <p>Max People: {event.limit}</p>
                      <p>Time: {event.timeRange}</p>
                      <p>Age Limit: {event.age}</p>
                    </div>
                  ) : null;
                })
              ) : (
                <p>No requested events.</p>
              )}
            </div>
          </div>
        )}
        {activeTab === "upcoming" && <div>Upcoming events will be displayed here.</div>}
        {activeTab === "hours" && <div>Check your hours here.</div>}
      </div>
    </>
  );
}

export default TabBar;
