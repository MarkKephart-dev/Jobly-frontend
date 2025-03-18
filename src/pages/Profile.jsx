import { useContext } from "react";
import SignupForm from "../components/SignupForm";
import JoblyApi from "../services/api";
import UserContext from "../UserContext";

const Profile = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext);

  async function updateUser(formData) {
    try {
      let updatedUser = await JoblyApi.updateUser(currentUser.username, formData);
      setCurrentUser(user => ({
        ...updatedUser,
        applications: updatedUser.applications || user.applications // Keep the applications intact
      })); // Update the user state globally
      alert("Profile updated successfully!");
    } catch (err) {
      console.error("Failed to update profile", err);
      alert(err[0]); // Display error to user
    }
  }

  return (
    <div>
      {currentUser && <h2>Edit Your Profile</h2> }
      {!currentUser && <h2>Signup for Jobly!</h2>}
      <SignupForm
        initialData={currentUser || {}}
        onSubmit={updateUser}
        isEditing={true}
      />
    </div>
  );
};

export default Profile;