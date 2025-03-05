const BACKEND_URL = `${import.meta.env.VITE_BACKEND_SERVER_URL}` 

// src/services/hootService.js

const index = async () => {
    try {
      const res = await fetch(`${BACKEND_URL}/deals/`, {
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
    return res.json();
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
  
  export { 
    index,
    show,
    create,
    deleteDeal,
    updateDeal,
  };
  