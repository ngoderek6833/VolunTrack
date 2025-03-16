import { useState, useEffect } from "react";
import "./modulestyle.css";
import { db } from "../../../Firebase/firebaseconfig";
import { setDoc, doc, getDoc, collection, getDocs, updateDoc } from "@firebase/firestore";

function TabBar() {
  const [activeTab, setActiveTab] = useState("create");
  const [eventData, setEventData] = useState({
    name: "",
    location: "",
    timeRange: "",
    date: "",
    limit: "",
    age: "",
    description: "",
    totalHours: ""
  });
  const [adminEmail, setAdminEmail] = useState("");
  const [eventRequests, setEventRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  const ID = localStorage.getItem("loggedInUserId");

  useEffect(() => {
    const fetchAdminEmail = async () => {
      if (ID) {
        const userDoc = await getDoc(doc(db, "users", ID));
        if (userDoc.exists()) {
          setAdminEmail(userDoc.data().email);
        }
      }
    };
    fetchAdminEmail();
  }, [ID]);

  useEffect(() => {
    const fetchEventRequests = async () => {
      if (ID) {
        const eventsQuery = collection(db, "events");
        const querySnapshot = await getDocs(eventsQuery);
        const events = [];
        querySnapshot.forEach((doc) => {
          events.push(doc.data());
        });
        setEventRequests(events);
      }
    };
    fetchEventRequests();
  }, [ID]);

  const handleChange = (e) => {
    setEventData({ ...eventData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!ID) {
      alert("Error: Admin ID not found.");
      return;
    }

    const eventID = `${ID} ${eventData.name}`;
    const timestamp = Date.now();
    const eventWithAdmin = { 
      ...eventData, 
      adminID: ID, 
      adminEmail, 
      createdAt: timestamp,
      requests: [],
      participants: []
    };

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
        description: "",
        totalHours: ""
      });
    } catch (error) {
      console.error("Error creating event: ", error);
      alert("Failed to create event.");
    }
  };

  const openPopup = (event, request) => {
    setSelectedRequest({ event, request });
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
    setSelectedRequest(null);
  };

  const handleRequestAction = async (action) => {
    const { event, request } = selectedRequest;
    const eventRef = doc(db, "events", event.eventID);
    let updatedRequests = event.requests.map(req =>
      req.email === request.email ? { ...req, status: action } : req
    );
    
    try {
      await updateDoc(eventRef, { requests: updatedRequests });
      alert(`${action} request successfully!`);
      closePopup();
    } catch (error) {
      console.error("Error updating request status: ", error);
      alert("Failed to update request status.");
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
              <input type="number" name="totalHours" placeholder="Total Hours" value={eventData.totalHours} onChange={handleChange} required />
              <textarea name="description" placeholder="Event Description" value={eventData.description} onChange={handleChange} required></textarea>
              <button type="submit" id="SubmitButton">Create Event</button>
            </form>
          </div>
        )}
        {activeTab === "requests" && (
          <div>
            {eventRequests.length > 0 ? (
              eventRequests.map((event, index) => (
                <div key={index}>
                  <h3>{event.name}</h3>
                  <div>
                    {event.requests.map((request, i) => (
                      <button
                        key={i}
                        onClick={() => openPopup(event, request)}
                        className="event-card"
                      >
                        {request.name}
                      </button>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <p>No event requests available.</p>
            )}
          </div>
        )}
        {activeTab === "finished" && <div><p>Check completed events and gather feedback.</p></div>}
        {activeTab === "past" && <div><p>Review past events and track historical event data.</p></div>}
      </div>

      {showPopup && selectedRequest && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h2>{selectedRequest.request.name}</h2>
            <p><strong>Email:</strong> {selectedRequest.request.email || "None"}</p>
            <p><strong>Phone Number:</strong> {selectedRequest.request.phoneNumber || "None"}</p>
            <p><strong>Age:</strong> {selectedRequest.request.age || "None"}</p>
            <p><strong>School:</strong> {selectedRequest.request.school || "None"}</p>
            <p><strong>Grade:</strong> {selectedRequest.request.grade || "None"}</p>
            <div>
              <button onClick={() => handleRequestAction('approved')}>Approve</button>
              <button onClick={() => handleRequestAction('denied')}>Deny</button>
              <button onClick={closePopup}>Close</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default TabBar;
