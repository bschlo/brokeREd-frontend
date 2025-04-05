import { authFetch } from "./authService";
const BASE_URL = import.meta.env.VITE_BACKEND_SERVER_URL

const index = async (filters = {}, sortByLoanAmount = 'asc') => {
  try {
    const params = new URLSearchParams({ ...filters, sortByLoanAmount }).toString();
    const res = await authFetch(`${BASE_URL}/deals/?${params}`);
    
    if (!res) {
      throw new Error('No response from server');
    }
    
    return await res.json();
  } catch (error) {
    console.error('Failed to fetch deals:', error);
    throw error; 
  }
};

const show = async (dealId) => {
  try {
    const res = await authFetch(`${BASE_URL}/deals/${dealId}/`);
    return res.json();
  } catch (error) {
    console.error(error);
  }
};

const create = async (dealFormData) => {
  try {
    const res = await authFetch(`${BASE_URL}/deals/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dealFormData),
    });

    if (!res.ok) {
      const errorData = await res.json();
      console.error('Error response:', errorData);
      throw new Error(`Request failed with status ${res.status}: ${JSON.stringify(errorData)}`);
    }

    return await res.json();
  } catch (error) {
    console.log(error);
  }
};

const deleteDeal = async (dealId) => {
  try {
    await authFetch(`${BASE_URL}/deals/${dealId}/`, {
      method: 'DELETE',
    });
  } catch (error) {
    console.error(error);
  }
};

const updateDeal = async (dealId, dealFormData) => {
  try {
    const res = await authFetch(`${BASE_URL}/deals/${dealId}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dealFormData),
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

const fetchDevelopers = async () => {
  try {
    const res = await authFetch(`${BASE_URL}/developers/`);
    return res.json();
  } catch (error) {
    console.error('Error fetching developers:', error);
  }
};

const getTopAndBottomDeals = async () => {
  try {
    const res = await authFetch(`${BASE_URL}/deals/top-bottom/`);
    return res.json();
  } catch (error) {
    console.error(error);
  }
};

export { 
  index,
  show,
  create,
  deleteDeal,
  updateDeal,
  fetchDevelopers,
  getTopAndBottomDeals,
};
