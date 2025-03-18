import AppRoutes from './components/Routes';
import UserContext from './UserContext';
import './App.css';
import { useState, useEffect } from 'react';
import JoblyApi from './services/api';
import {jwtDecode} from "jwt-decode";
import { useNavigate } from "react-router-dom";
import useLocalStorage from "./hooks/useLocalStorage";

function App() {
  const [token, setToken] = useLocalStorage("token");
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate(); 

  // Store user if logged in or signed up. 
  useEffect(() => {
    async function getCurrentUser() {
      if (token) {
        JoblyApi.token = token;
        try {
          let {username} = jwtDecode(token);
          let user = await JoblyApi.getCurrentUser(username);
          setCurrentUser(user);
        } catch (err) {
          console.error("Error loading user:", err);
          setCurrentUser(null);
        }
      }
    }
    getCurrentUser();
  }, [token]);
  
  async function login(loginData) {
    try {
      let token = await JoblyApi.login(loginData);
      setToken(token);
      localStorage.setItem("token", token);
      
      // Decode token to get username
      let { username } = jwtDecode(token);
      let user = await JoblyApi.getCurrentUser(username);
      setCurrentUser(user);
  
      // Redirect to homepage
      navigate("/");
  
    } catch (err) {
      console.error("Login failed:", err);
    }
  }
  
  async function signup(signupData) {
    try {
      let token = await JoblyApi.signup(signupData);
      setToken(token);
      localStorage.setItem("token", token);

      // Decode token to get username
      let {username} = jwtDecode(token);
      let user = await JoblyApi.getCurrentUser(username);
      setCurrentUser(user);

      // Redirect to homepage
      navigate("/");
    } catch (err) {
      console.error("Signup failed:", err);
    }
  }

  function logout() {
    navigate("/", { state: { message: `Goodbye, ${currentUser.username}!` } });
    setToken(null);
    setCurrentUser(null);
    localStorage.removeItem("token");
  }

  async function applyToJob(id) {
    if (!currentUser.applications.includes(id)) {
      await JoblyApi.applyToJob(currentUser.username, id);
      setCurrentUser(user => ({
        ...user,
        applications: [...user.applications, id]
      }));
    }
  }

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser }}>
      <AppRoutes 
        login={login} 
        signup={signup} 
        logout={logout} 
        currentUser={currentUser} 
        applyToJob={applyToJob}
      />
    </UserContext.Provider>
  )
}

export default App
