// App.jsx

import { createContext, useState, useEffect } from 'react';
import { Routes, Route, useNavigate} from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import SignupForm from './components/SignUpForm/SignUpForm';
import Landing from './components/Landing/Landing';
import Dashboard from './components/Dashboard/Dashboard';
import SigninForm from './components/SignInForm/SignInForm';
import DealList from './components/DealList/DealList';
import DealDetails from './components/DealDetails/DealDetails';
import DealForm from './components/DealForm/DealForm';
import * as authService from '../src/services/authService'
import * as dealService from '../src/services/dealService'
import './App.css'

export const AuthedUserContext = createContext(null); 

const App = () => {
  const [user, setUser] = useState(authService.getUser());
  const [deals, setDeals] = useState([])

  const navigate = useNavigate()

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

  const handleAddDeal = async (dealFormData) => {
    const newDeal = await dealService.create(dealFormData)
    setDeals([newDeal, ...deals])
    navigate('/deals')
  }

  const handleDeleteDeal = async (dealId) => {
    try {
      const deletedDeal = await dealService.deleteDeal(dealId)
      setDeals(deals.filter((deal) => deal.id !== deletedDeal))
      navigate('/deals')
    } catch (error) {
      console.error(error)
    }
  }

  const handleUpdateDeal = async (dealId, dealFormData) => {
    try {
      const updatedDeal = await dealService.updateDeal(dealId, dealFormData)
      setDeals(deals.map((deal) => (dealId === deal.id ? updatedDeal : deal )))
      navigate(`/deals/${dealId}`)
    } catch (error) {
      console.error(error)
    }
  }
  

  return (
    <AuthedUserContext.Provider value={user}>
      <NavBar handleSignout={handleSignout} />
      <Routes>
        {user ? (
          <>
          <Route path="/" element={<Dashboard />} />
          <Route path="/deals" element={<DealList deals={deals} />} />
          <Route path="/deals/:dealId" element={<DealDetails handleDeleteDeal={handleDeleteDeal} />} />
          <Route path='/deals/new' element={<DealForm handleAddDeal={handleAddDeal} />}/>
          <Route path='/deals/:dealId/edit' element={<DealForm handleUpdateDeal={handleUpdateDeal}/>}/>

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
