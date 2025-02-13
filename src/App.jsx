// App.jsx

import { createContext, useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import SignupForm from './components/SignUpForm/SignUpForm';
import Landing from './components/Landing/Landing';
import Dashboard from './components/Dashboard/Dashboard';
import SigninForm from './components/SignInForm/SignInForm';
import DealList from './components/DealList/DealList';
import * as authService from '../src/services/authService'
import * as dealService from '../src/services/dealService'


export const AuthedUserContext = createContext(null); 

const App = () => {
  const [user, setUser] = useState(authService.getUser());
  const [deals, setDeals] = useState([])

  useEffect(() => {
    const fetchAllDeals = async () => {
      const dealData = await dealService.index()

      setDeals(dealData)
    }
    if(user) fetchAllDeals()
  }, [user]) 

  const handleSignout = () => {
    authService.signout()
    setUser(null)
  }
  

  return (
    <AuthedUserContext.Provider value={user}>
      <NavBar handleSignout={handleSignout} />
      <Routes>
        {user ? (
          <>
          <Route path="/" element={<Dashboard />} />
          <Route path="/all-deals" element={<DealList deals={deals}/>} />
        </>
        ) : (
          <>
          <Route path="/" element={<Landing />} />
          <Route path="/signup" element={<SignupForm setUser={setUser} />} />
          <Route path="/signin" element={<SigninForm setUser={setUser} />} />
        </>
        )}
      </Routes>
    </AuthedUserContext.Provider>
  );
};

export default App;
