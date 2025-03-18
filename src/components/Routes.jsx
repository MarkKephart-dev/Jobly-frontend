import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import Companies from '../pages/Companies';
import CompanyDetails from '../pages/CompanyDetails';
import Jobs from '../pages/Jobs';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import Profile from '../pages/Profile';
import NavBar from './NavBar';
import ProtectedRoute from './ProtectedRoute';

const AppRoutes = ({login, signup, logout, currentUser, applyToJob}) => {
  return (
    <>
      <NavBar logout={logout} currentUser={currentUser} />
      <Routes>
        {/* Protected Routes */}
        <Route 
          path="/companies" 
          element={
          <ProtectedRoute>
            <Companies />
          </ProtectedRoute>} 
        />
        <Route 
          path="/companies/:handle" 
          element={
          <ProtectedRoute>
            <CompanyDetails applyToJob={applyToJob} />
          </ProtectedRoute>} 
        />
        <Route 
          path="/jobs" 
          element={
          <ProtectedRoute>
            <Jobs applyToJob={applyToJob} />
          </ProtectedRoute>} 
        />
        <Route 
          path="/profile" 
          element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
          } 
        />

        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login login={login}/>} />
        <Route path="/signup" element={<Signup signup={signup} isEditing={false} />} />
        <Route path='*' element={<Home />} />
      </Routes>
    </>
  );
};

export default AppRoutes;