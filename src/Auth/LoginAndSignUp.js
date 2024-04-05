import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

function LoginForm({ switchForm }) {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/login", { email, password });
      localStorage.setItem('uid', response.data.uid);
      localStorage.setItem('email', response.data.email);
      history.push('/dashboard');
      } catch (error) {
      console.error("Login failed:", error);
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
            <button type="submit" className="btn btn-primary btn-block">Login</button>
          </div>
          <div className="text-center">
            <p className="mb-0">Don't have an account? <button type="button" className="btn btn-link" onClick={() => switchForm('signupForm')}>Sign up</button></p>
          </div>
        </form>
      </div>
    </div>
  );
}

function SignUpForm({ switchForm }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/signup", { email, password });
      console.log(response.data);
    } catch (error) {
      console.error("Signup failed:", error);
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
            <button type="submit" className="btn btn-primary btn-block">Sign Up</button>
          </div>
          <div className="text-center">
            <p className="mb-0">Already have an account? <button type="button" className="btn btn-link" onClick={() => switchForm('loginForm')}>Login</button></p>
          </div>
        </form>
      </div>
    </div>
  );
}

function LoginAndSignup() {
  const [activeForm, setActiveForm] = useState('loginForm');

  const switchForm = (formId) => {
    setActiveForm(formId);
  };

  return (
    <div className="center">
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            {activeForm === 'loginForm' && <LoginForm switchForm={switchForm} />}
            {activeForm === 'signupForm' && <SignUpForm switchForm={switchForm} />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginAndSignup;
