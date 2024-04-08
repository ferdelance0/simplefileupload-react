import React, { useState } from 'react';
import axios from 'axios';

function SignUpForm({ switchForm }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    setLoading(true); 
    e.preventDefault();
    try {
      const response = await axios.post("https://simplefileupload-node.onrender.com/signup", { email, password });
      if (response.data.status === "success") {
        switchForm('loginForm');
      } else {
        setLoading(false); 
        setError(response.data.status);
      }
    } catch (error) {
      console.error("Signup failed:", error);
      setError('Signup failed. Please try again.');
    }finally{
      setLoading(false); 
    }
  };

  return (
    <div className="card mt-3 animate__animated animate__fadeIn">
      <div className="card-header">
        <h2 className="text-center">Sign Up</h2>
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <input type="email" className="form-control" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="form-group mb-3">
            <input type="password" className="form-control" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <div className="form-group mb-3 text-center">
          <button type="submit" className="btn btn-primary btn-block">{loading ?
            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>: 'Signup'}</button>          </div>
          <div className="text-center">
            <p className="mb-0">Already have an account? <button type="button" className="btn btn-link" onClick={() => switchForm('loginForm')}>Login</button></p>
          </div>
        </form>
        {error && <div className="alert alert-danger">{error}</div>}

      </div>
    </div>
  );
}

export default SignUpForm;
