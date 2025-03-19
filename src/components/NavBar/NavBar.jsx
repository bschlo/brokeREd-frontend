import { useContext } from "react";
import { AuthedUserContext } from "../../App";
import { Link } from "react-router-dom";
import "./NavBar.css";

const NavBar = ({ handleSignout }) => {
  const user = useContext(AuthedUserContext);
  return (
    <>
      {user ? (
        <nav className="nav-bar">
          <div className="nav-bar-container">
            <div className="nav-element">
              <Link to="/">Home</Link>
            </div>
            <div className="nav-element">
              <Link to="/deals">All Deals</Link>
            </div>
            <div className="nav-element">
              <Link to="/deals/new">Create A Deal</Link>
            </div>
            <div className="nav-element">
              <Link to="" onClick={handleSignout}>
                Sign Out
              </Link>
            </div>
          </div>
        </nav>
      ) : (
        <nav>
          <div>
            <Link to="/signin">Sign In</Link>
          </div>
          <div>
            <Link to="/signup">Sign Up</Link>
          </div>
        </nav>
      )}
    </>
  );
};

export default NavBar;
