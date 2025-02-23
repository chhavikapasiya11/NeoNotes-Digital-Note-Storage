import React, { useState } from 'react';

const SignUp = (props) => {
  const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" });

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Password confirmation check
    if (credentials.password !== credentials.cpassword) {
     props.showalert("password do not match","danger")
      return;
    }

    try {
      const response = await fetch("http://localhost:4000/api/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: credentials.name,
          email: credentials.email,
          password: credentials.password,
        }),
      });

      const json = await response.json();

      if (response.ok) {
        localStorage.setItem("token", json.token); 
       
        window.location.href = "/home";
        props.showAlert("Signup Successful!","success");
      } else {
        props.showAlert("Signup failed Try again","danger")
      }
    } catch (error) {
      console.error("Error:", error);
      props.showAlert("Something went wrong. Please try again.","danger");
    }
  };

  return (
    <div className='mt-3'>
      <h2>Create Your Account & Start Your Journey with NeoNotes!</h2>
      <form autoComplete="off" onSubmit={handleSubmit}>

        <div className="mb-3">
          <label htmlFor="name" className="form-label">Username</label>
          <input type="text" className="form-control" id="name" name="name" value={credentials.name} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" name="email" value={credentials.email} onChange={handleChange} required />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" name="password" value={credentials.password} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">Confirm Password</label>
          <input type="password" className="form-control" id="cpassword" name="cpassword" value={credentials.cpassword} onChange={handleChange} required />
        </div>
        <button type="submit" className="btn btn-primary">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;
