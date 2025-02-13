import { useContext } from 'react';
import { AuthedUserContext } from '../../App';
import { Link } from 'react-router-dom';

const NavBar = ({ handleSignout}) => {
    const user = useContext(AuthedUserContext);
  return (
    <>
      { user ? (
        <nav>
            <div><Link to="/">Home</Link></div>
            <div><Link to="" onClick={handleSignout}>Sign Out</Link></div>
        </nav>
      ) : (
        <nav>
            <div><Link to="/signin">Sign In</Link></div>
            <div><Link to="/signup">Sign Up</Link></div>
        </nav>
      )}
    </>
  )
}

export default NavBar;
