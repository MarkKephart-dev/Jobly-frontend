import { useContext, useState } from "react";
import './SignupForm.css'
import UserContext from "../UserContext";

const SignupForm = ({ initialData = {}, onSubmit, isEditing = false }) => {
    const {currentUser} = useContext(UserContext);
    const [formData, setFormData] = useState({
        username: initialData.username || "",
        password: "",
        firstName: initialData.firstName || "",
        lastName: initialData.lastName || "",
        email: initialData.email || "",
    });

    function handleChange(evt) {
        const { name, value } = evt.target;
        setFormData(data => ({
            ...data,
            [name]: value
        }));
    }

    async function handleSubmit(evt) {
        evt.preventDefault();

         // Only validate password if it's not empty and user is signing up
        if (!isEditing && formData.password.length < 5) {
            alert("Password must be at least 5 characters.");
            return;
        }
    
        // Construct the form data to send if we're editing
        let formPayload = {
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
        };
    
        // If we're signing up, use all the form data
        if (!isEditing) {
            formPayload = {
                ...formData
            };
        }
    
        await onSubmit(formPayload);
      }

    return (
        <form className="signup-form" onSubmit={handleSubmit}>
            <div className="input-container">
                <label htmlFor="username">Username:</label>
                <input 
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    id="username"
                    placeholder="Username" 
                    disabled={isEditing} // Make username field uneditable when editing
                />
            </div>
            { !isEditing && (
                <div className="input-container">
                    <label htmlFor="password">Password:</label>
                    <input 
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        id="password"
                        placeholder="Password" 
                        disabled={isEditing}
                    />
                </div>
            )}

            <div className="input-container">
                <label htmlFor="firstName">First Name:</label>
                <input 
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    id="firstName"
                    placeholder="First Name" 
                />
            </div>
            
            <div className="input-container">
                <label htmlFor="lastName">Last Name:</label>
                <input 
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    id="lastName"
                    placeholder="Last Name" 
                />
            </div>
            
            <div className="input-container">
                <label htmlFor="email">Email:</label>
                <input 
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    id="email"
                    placeholder="Email" 
                />
            </div>
            
            <button>{isEditing ? "Save Changes" : "Sign Up"}</button>
        </form>
    )
}

export default SignupForm;