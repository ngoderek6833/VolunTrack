import { db } from "../../../Firebase/firebaseconfig";
import { getDoc, doc } from "@firebase/firestore";

async function initializeAccount() {
  const userId = localStorage.getItem("loggedInUserId");
  console.log("Account logged in:", userId);
  const docRef = doc(db, "users", userId);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists() && !docSnap.data().initialized) {
    window.location.href = "../InitializeModules/initializeaccountpage.html";
  } else {
    console.log("help");
    window.location.href = "../HomepageModules/homepage.html"; 
  }
}

export { initializeAccount };
