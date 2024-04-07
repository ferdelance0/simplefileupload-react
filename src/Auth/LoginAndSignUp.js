import React, { useState } from 'react';
import LoginForm from './Components/LoginForm';
import SignUpForm from './Components/SignUpForm';
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
