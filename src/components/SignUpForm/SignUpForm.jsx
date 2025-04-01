import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as authService from '../../services/authService';
import './SignUpForm.css';

const SignupForm = (props) => {
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    passwordConf: '',
  });

  const updateMessage = (msg) => {
    setMessage(msg);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newUserResponse = await authService.signup(formData);
      props.setUser(newUserResponse.user);
      navigate('/');
    } catch (err) {
      updateMessage(err.message);
    }
  };

  const { username, password, passwordConf } = formData;

  const isPasswordValid = () => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{6,}$/;
    return passwordRegex.test(password);
  };

  const isFormInvalid = () => {
    return !(username && password && password === passwordConf && isPasswordValid());
  };

  return (
    <main className="signup-main">
      <h1 className="signup-title">Sign Up</h1>
      {message && <p className="signup-message">{message}</p>}
      <form className="signup-form" onSubmit={handleSubmit}>
        <div className="signup-input-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            name="username"
            className="signup-input"
            onChange={handleChange}
          />
        </div>
        <div className="signup-input-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            name="password"
            className="signup-input"
            onChange={handleChange}
          />
          {!isPasswordValid() && password && (
            <p style={{ color: 'white' }}>
              Password must be at least 6 characters long, include an uppercase letter, a lowercase letter, and a special character.
            </p>
          )}
        </div>
        <div className="signup-input-group">
          <label htmlFor="confirm">Confirm Password:</label>
          <input
            type="password"
            id="confirm"
            value={passwordConf}
            name="passwordConf"
            className="signup-input"
            onChange={handleChange}
          />
           {passwordConf && password !== passwordConf && (
            <p style={{ color: 'white' }}>Passwords do not match.</p>
          )}
        </div>
        <div className="signup-button-group">
          <button type="submit" className="signup-button" disabled={isFormInvalid()}>
            Sign Up
          </button>
          <Link to="/" className="signup-cancel-link">
            <button type="button" className="signup-cancel-button">Cancel</button>
          </Link>
        </div>
      </form>
    </main>
  );
};

export default SignupForm;
