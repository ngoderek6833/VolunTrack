import "./modulestyle.css";
import { db } from "../../../Firebase/firebaseconfig";
import { setDoc, doc } from "@firebase/firestore";

function InitializeForm() {
    const handleSubmit = async (event) => {
        event.preventDefault();
        const userId = localStorage.getItem("loggedInUserId");
        const phoneNumber = event.target.phoneNumber.value;
        const age = event.target.age.value;
        const grade = event.target.grade.value || null;
        const school = event.target.school.value || null;
        const role = event.target.role.value;
        console.log("Initializing Account with:", { phoneNumber, age, grade, school, role });
        try {
            const userRef = doc(db, "users", userId);
            await setDoc(userRef, { phoneNumber, age, grade, school, role, initialized: true }, { merge: true });
            console.log("Account initialized successfully");
            alert("Account initialized successfully!");
            switch (role) {
                case "volunteer":
                    window.location.href = "../VolunteerHomepageModules/homepage.html";
                    break;
                case "admin":
                    window.location.href = "../AdminHomepageModules/homepage.html";
                    break;
            }
        } catch (error) {
            console.error("Error initializing account:", error);
            alert("Error initializing account. Please try again.");
        }
    };
    return (
        <div>
            <form id="Form" onSubmit={handleSubmit}>
                <h1>Initialize Your Account</h1>
                <hr />
                <div>
                    <label htmlFor="phoneNumber">Phone Number</label>
                    <input type="tel" id="phoneNumber" name="phoneNumber" pattern="[0-9]{9}" maxLength="9" required />
                </div>
                <div>
                    <label htmlFor="age">Age</label>
                    <input type="number" id="age" name="age" required />
                </div>
                <div>
                    <label htmlFor="grade">Grade (if applicable)</label>
                    <input type="text" id="grade" name="grade" placeholder="Optional" />
                </div>
                <div>
                    <label htmlFor="school">School (if applicable)</label>
                    <input type="text" id="school" name="school" placeholder="Optional" />
                </div>
                <div>
                    <label htmlFor="role">Are you signing up as an Admin or Volunteer?</label>
                    <select id="role" name="role" required>
                        <option value="volunteer">Volunteer</option>
                        <option value="admin">Admin</option>
                    </select>
                </div>
                <div>
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    );
}

export default InitializeForm;
