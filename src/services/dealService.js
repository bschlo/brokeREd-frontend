const BACKEND_URL = `${import.meta.env.VITE_BACKEND_SERVER_URL}/deals/` 

// src/services/hootService.js

const index = async () => {
    try {
      const res = await fetch(BACKEND_URL, {
        headers: { Authorization: `Bearer ${localStorage.getItem('access')}` },
      });
      return res.json();
    } catch (error) {
      console.log(error);
    }
  };
  
  export { 
    index,
  };
  