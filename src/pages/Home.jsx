import { useLocation } from "react-router-dom";

const Home = ({currentUser}) => {
  const location = useLocation();
  const message = location.state?.message; // ✅ Access message passed from logout

    return (
      <div>
        {message && <p>{message}</p>}
        {currentUser 
          ? <h1>Welcome back, {currentUser.username}!</h1>
          : <h1>Welcome to Jobly!</h1>}
      </div>
    )
  };
  
export default Home;