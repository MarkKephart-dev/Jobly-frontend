import { Link } from 'react-router-dom';
import './NavBar.css';

const NavBar = ({currentUser, logout}) => {
  return (
    <nav>
      <Link to="/" className="navbar-logo">Home</Link>
      <div className="navbar-links">
        <Link to="/companies">Companies</Link>
        <Link to="/jobs">Jobs</Link>
        {currentUser ? (
        <>
          <span>{currentUser.username}</span>
          <Link to="/profile">Profile</Link>
          <button onClick={logout}>Logout</button>
        </>
        ) : (
        <>
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
        </>
        )}
      </div>
    </nav>
  );
};

export default NavBar;