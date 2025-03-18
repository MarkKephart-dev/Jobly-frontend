import React, { useContext, useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import UserContext from "../UserContext";

const ProtectedRoute = ({ children }) => {
  const {currentUser} = useContext(UserContext);
  const [message, setMessage] = useState("");
  const [redirecting, setRedirecting] = useState(false);

  // Check if the token exists (i.e., the user is logged in)
  useEffect(() => {
    // Only set the message if the user is not logged in
    if (!currentUser) {
      setMessage(`You must be logged in to access this page!`);
      
      // Redirect after displaying the message for 3 seconds
      const timer = setTimeout(() => {
        setMessage(""); // Clear the message
        setRedirecting(true);
      }, 3000);

      return () => clearTimeout(timer); // Cleanup the timer if the component is unmounted
    }
  }, [currentUser]);

  // If user is not logged in and the message is displayed, redirect after 3 seconds
  if (!currentUser && redirecting) {
    return <Navigate to="/login" replace />;
  }

  // Show the message if they are not logged in
  if (!currentUser) {
    return (
      <div>
        <p>{message}<br />You will be redirected shortly...</p>
      </div>
    );
  }

  return children;  // Render the protected component if user is logged in
};

export default ProtectedRoute;