import { useContext } from 'react';
import { AuthedUserContext } from '../../App';
import { Link } from 'react-router-dom';
import './NavBar.css'

const NavBar = ({ handleSignout}) => {
    const user = useContext(AuthedUserContext);
  return (
    <main>
      { user ? (
        <nav className='nav-bar'>
            <div className='nav-home'><Link to="/">Home</Link></div>
            <div className='nav-all-deals'><Link to="/deals">All Deals</Link></div>
            <div><Link to='/deals/new'>Create A Deal</Link></div>
            <div className='nav-signout'><Link to="" onClick={handleSignout}>Sign Out</Link></div>
        </nav>
      ) : (
        <nav>
            <div><Link to="/signin">Sign In</Link></div>
            <div><Link to="/signup">Sign Up</Link></div>
        </nav>
      )}
    </main>
  )
}

export default NavBar;
