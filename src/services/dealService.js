const BASE_URL = import.meta.env.VITE_BACKEND_SERVER_URL;

const index = async (filters = {}, sortByLoanAmount = 'asc') => {
  try {
    const params = new URLSearchParams({ ...filters, sortByLoanAmount }).toString();
    const res = await fetch(`${BASE_URL}/deals/?${params}`);

    if (!res.ok) {
      throw new Error(`Failed to fetch deals. Status: ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.error('Failed to fetch deals:', error);
    throw error;
  }
};

const show = async (dealId) => {
  try {
    const res = await fetch(`${BASE_URL}/deals/${dealId}/`);

    if (!res.ok) {
      throw new Error(`Failed to fetch deal ${dealId}. Status: ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const create = async (dealFormData) => {
  try {
    const res = await fetch(`${BASE_URL}/deals/`, {
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
    console.error('Failed to create deal:', error);
    throw error;
  }
};

const deleteDeal = async (dealId) => {
  try {
    const res = await fetch(`${BASE_URL}/deals/${dealId}/`, {
      method: 'DELETE',
    });

    if (!res.ok) {
      throw new Error(`Failed to delete deal ${dealId}. Status: ${res.status}`);
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const updateDeal = async (dealId, dealFormData) => {
  try {
    const res = await fetch(`${BASE_URL}/deals/${dealId}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dealFormData),
    });

    if (!res.ok) {
      throw new Error(`Failed to update deal ${dealId}. Status: ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const fetchDevelopers = async () => {
  try {
    const res = await fetch(`${BASE_URL}/developers/`);

    if (!res.ok) {
      throw new Error(`Failed to fetch developers. Status: ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.error('Error fetching developers:', error);
    throw error;
  }
};

const getTopAndBottomDeals = async () => {
  try {
    const res = await fetch(`${BASE_URL}/deals/top-bottom/`);

    if (!res.ok) {
      throw new Error(`Failed to fetch top/bottom deals. Status: ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.error('Error fetching top and bottom deals:', error);
    throw error;
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
