import SignupForm from "../components/SignupForm";

const Signup = ({signup}) => {
    async function handleSignup(formData) {
        try {
          await signup(formData);
          // Redirect or show success message
        } catch (err) {
          console.error("Signup failed", err);
          alert(err[0]);
        }
      }
    return (
        <div>
            <h2>Sign up for Jobly!</h2>
            <SignupForm isEditing={false} onSubmit={handleSignup} />;
        </div>
    )
    
};
  
export default Signup;