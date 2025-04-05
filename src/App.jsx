import { createContext, useState, useEffect } from 'react';
import { Routes, Route, useNavigate, Navigate} from 'react-router-dom';
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
import { LoadScript } from '@react-google-maps/api';
import DealFilters from './components/DealList/DealFilters/DealFilters';
import Footer from './components/Footer/Footer';

export const AuthedUserContext = createContext(null); 
const libraries = ["places"];

const App = () => {
  const [user, setUser] = useState(authService.getUser());
  const [deals, setDeals] = useState([])
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const currentUser = authService.getUser();
    setUser(currentUser);
    setIsLoading(false)
  }, []);

  const [filters, setFilters] = useState({
    storiesMin: "",
    storiesMax: "",
    squareFeetMin: "",
    squareFeetMax: "",
    rateType: "",
    minimumRate: "",
    maximumRate: "",
    loanAmountMin: "",
    loanAmountMax: "",
    dealType: "",
    assetClass: "",
    developers: "",
    unitsMin: "",
    unitsMax: "",
  });

  const navigate = useNavigate()
  

  useEffect(() => {
    const fetchAllDeals = async () => {
      if (user) {
        const dealData = await dealService.index(filters, 'date'); 
        setDeals(dealData);
      }
    };
    fetchAllDeals();
  }, [user, filters]); 
  
  const handleFilterChange = (e) => {
    const { name, value } = e.target;

    if (name === "clear") {
      setFilters({
        unitsMin: "",
        unitsMax: "",
        storiesMin: "",
        storiesMax: "",
        squareFeetMin: "",
        squareFeetMax: "",
        minimumRate: "",
        maximumRate: "",
        loanAmountMin: "",
        loanAmountMax: "",
        dealType: "",
        assetClass: "",
        developers: "",
      });
    } else {
      setFilters((prevFilters) => ({
        ...prevFilters,
        [name]: value,
      }));
    }
  };

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

  const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY; 
  
  

  return (
    <AuthedUserContext.Provider value={user}>
      <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY} libraries={libraries}>
        <div className="page-container">
          <NavBar handleSignout={handleSignout} />
          
          <div className="main-content">
          {!isLoading && (
            <Routes>
              {user ? (
                <>
                  <Route path="/" element={<Dashboard user={user} deals={deals} />} />
                  <Route path="/deals" element={<DealList setDeals={setDeals} deals={deals} filters={filters} handleFilterChange={handleFilterChange} />} />
                  <Route path="/deals/:dealId" element={<DealDetails handleDeleteDeal={handleDeleteDeal} />} />
                  <Route path='/deals/new' element={<DealForm handleAddDeal={handleAddDeal} />} />
                  <Route path='/deals/:dealId/edit' element={<DealForm handleUpdateDeal={handleUpdateDeal} />} />
                </>
              ) : (
                <>
                  <Route path="/" element={<Landing />} />
                  <Route path="/signup" element={<SignupForm setUser={setUser} />} />
                  <Route path="/signin" element={<SigninForm setUser={setUser} />} />
                  <Route path="*" element={<Navigate to="/signin" replace />} />
                </>
              )}
            </Routes>
             )}
             {isLoading && <div>Loading...</div>}
          </div>
          <Footer />
        </div>
        
      </LoadScript>
    </AuthedUserContext.Provider>
  );
};

export default App;
