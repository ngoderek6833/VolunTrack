import { useEffect, useState } from "react";
import { db } from "../../../Firebase/firebaseconfig";
import { getDoc, doc } from "@firebase/firestore";
import "./modulestyle.css";

function Footer() {
  const [footerText, setFooterText] = useState("");
  useEffect(() => {
    const fetchUserData = async () => {
      const userId = localStorage.getItem("loggedInUserId");
      if (!userId) return;

      try {
        const docRef = doc(db, "users", userId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const userData = docSnap.data();
          const firstName = userData.firstName || "User";
          const role = userData.role ? userData.role.charAt(0).toUpperCase() + userData.role.slice(1) : "Unknown Role";
          const date = new Date();
          const year = date.getFullYear();
          const month = date.getMonth() + 1;
          const day = date.getDate();
          const dow = date.getDay();
          const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
          const dowName = weekdays[dow];
          setFooterText(`Hello ${firstName}, today is ${dowName} ${month}-${day}-${year}. Role: ${role}`);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
     fetchUserData();
  }, []);

  return (
    <div id="Footer">
      <span style={{ display: "block", marginTop: "50px" }} id="FooterSpan">
        {footerText}
      </span>
    </div>
  );
}

export default Footer;
