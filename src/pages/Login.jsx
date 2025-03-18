import LoginForm from "../components/LoginForm";

const Login = ({login}) => {
    return (
        <div>
            <h2>Log in</h2>
            <LoginForm login={login} />;
        </div>
    ) 
};
  
export default Login;