import { useState } from "react";

function LoginForm({ login }) {
  const [formData, setFormData] = useState({
    username: "",
    password: ""
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
    await login(formData);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        name="username" 
        value={formData.username}
        onChange={handleChange}
        placeholder="Username"
      />
      <input 
        type="password" 
        name="password" 
        value={formData.password}
        onChange={handleChange}
        placeholder="Password"
      />
      <button>Log in</button>
    </form>
  );
}

export default LoginForm;
