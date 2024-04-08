import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function LoginForm({ switchForm }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true); 
      const response = await axios.post("https://simplefileupload-node.onrender.com/login", { email, password });
      if (response.data.status === "success") {
        localStorage.setItem('uid', response.data.uid);
        localStorage.setItem('email', response.data.email);
        console.log(localStorage.getItem('uid'));
        navigate('/dashboard');
      } else {
        setError(response.data.status);
      }
    } catch (error) {
      console.error("Login failed:", error);
      setError('Login failed. Please try again.');
    }finally{
      setLoading(false);
    }
  };

  return (
    <div className="card animate__animated animate__fadeIn">
      <div className="card-header">
        <h2 className="text-center">Login</h2>
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
            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>: 'Login'}</button>
          </div>
          <div className="text-center">
            <p className="mb-0">Don't have an account? <button type="button" className="btn btn-link" onClick={() => switchForm('signupForm')}>Sign up</button></p>
          </div>
        </form>
        {error && <div className="alert alert-danger">{error}</div>}
      </div>
    </div>
  );
}

export default LoginForm;
