import React from "react";
import "./Landing.css";
import { Link } from "react-router";

const Landing = () => {
  return (
    <div className="landing-main">
      <div className="landing-box">
      <div className="landing-message"> Welcome to brokeREd!</div>
      <div className="landing-options">
        <div>
          <div>Already have an account?  <Link to="/signin">Sign In</Link> here.</div>
        </div>
        <div> 
          <div>Don't have an account? <Link to="/signup">Sign Up</Link>  here.</div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Landing;
