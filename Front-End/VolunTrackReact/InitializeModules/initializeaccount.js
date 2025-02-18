import { db } from "../../../Firebase/firebaseconfig";
import { getDoc, doc } from "@firebase/firestore";

async function initializeAccount() {
  const userId = localStorage.getItem("loggedInUserId");
  console.log("Account logged in:", userId);
  if (!userId) {
    console.error("No user ID found in localStorage.");
    return;
  }
  const docRef = doc(db, "users", userId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const userData = docSnap.data();
    if (!userData.initialized) {
      window.location.href = "../InitializeModules/initializeaccountpage.html";
      return;
    }
    switch (userData.role) {
      case "volunteer":
        window.location.href = "../VolunteerHomepageModules/homepage.html";
        break;
      case "admin":
        window.location.href = "../AdminHomepageModules/homepage.html";
        break;
    }
  } else {
    console.error("User document not found in Firestore.");
  }
}

export { initializeAccount };
