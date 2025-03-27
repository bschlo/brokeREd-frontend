import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as authService from '../../services/authService';
import './SignInForm.css';

const SigninForm = (props) => {
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const updateMessage = (msg) => {
    setMessage(msg);
  };

  const handleChange = (e) => {
    updateMessage('');
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await authService.signin(formData);
      props.setUser(user);
      navigate('/');
    } catch (err) {
      updateMessage(err.message);
    }
  };

  return (
    <main className="signin-main">
      <h1 className="signin-title">Log In</h1>
      {message && <p className="signin-message">{message}</p>}
      <form className="signin-form" autoComplete="off" onSubmit={handleSubmit}>
        <div className="signin-input-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            autoComplete="off"
            id="username"
            value={formData.username}
            name="username"
            className="signin-input"
            onChange={handleChange}
          />
        </div>
        <div className="signin-input-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            autoComplete="off"
            id="password"
            value={formData.password}
            name="password"
            className="signin-input"
            onChange={handleChange}
          />
        </div>
        <div className="signin-button-group">
          <button type="submit" className="signin-button">Log In</button>
          <Link to="/" className="signin-cancel-link">
            <button type="button" className="signin-cancel-button">Cancel</button>
          </Link>
        </div>
      </form>
    </main>
  );
};

export default SigninForm;
