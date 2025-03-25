const BACKEND_URL = `${import.meta.env.VITE_BACKEND_SERVER_URL}` 


const index = async (filters = {}) => {
    try {
      const params = new URLSearchParams(filters).toString()
      const res = await fetch(`${BACKEND_URL}/deals/?${params}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('access')}` },
      });
      return res.json();
    } catch (error) {
      console.error(error);
    }
  };

  const show = async (dealId) => {
    try {
      const res = await fetch(`${BACKEND_URL}/deals/${dealId}/`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('access')}` },
      });
      return res.json()
    } catch (error) {
      console.error(error)
    }
  }


const create = async (dealFormData) => {
  try {
    const res = await fetch(`${BACKEND_URL}/deals/`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access')}`,
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
    await fetch(`${BACKEND_URL}/deals/${dealId}/`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('access')}`,
      }
    })
  } catch (error) {
    console.error(error)
  }
}

const updateDeal = async (dealId, dealFormData) => {
  try {
    const res = await fetch(`${BACKEND_URL}/deals/${dealId}/`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dealFormData),
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
}

const fetchDevelopers = async () => {
  try {
    const res = await fetch(`${BACKEND_URL}/developers/`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('access')}` },
    });
    return res.json();
  } catch (error) {
    console.error('Error fetching developers:', error);
  }
};
  export { 
    index,
    show,
    create,
    deleteDeal,
    updateDeal,
    fetchDevelopers,
  };
  