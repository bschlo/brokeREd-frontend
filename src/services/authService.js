const BACKEND_URL = import.meta.env.VITE_BACKEND_SERVER_URL 


const signup = async (formData) => {
  try {
    const res = await fetch(`${BACKEND_URL}/users/register/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },  
      body: JSON.stringify(formData),
    });
       
    // Check if the response status is OK
    if (!res.ok) {
      const errorMessage = await res.text(); // Read the response body in case of error
      throw new Error(errorMessage);
    }

    const json = await res.json();

    if (json.access) {
      localStorage.setItem('access', json.access); // Store the JWT token in localStorage

      const user = json.user
    
      return user;
    }

    if (json.err) {
      throw new Error(json.err);
    }
    return json;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

// signin function
const signin = async (user) => {
  try {
    const res = await fetch(`${BACKEND_URL}/users/login/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    });

    // Check if the response status is OK
    if (!res.ok) {
      const errorMessage = await res.text();
      throw new Error(errorMessage);
    }

    const json = await res.json();

    if (json.error) {
      throw new Error(json.error);
    }

    if (json.access) {
      const username = json.user.username
      localStorage.setItem('access', json.access); // Store the JWT token in localStorage
      localStorage.setItem('user', username); // Store the JWT token in localStorage
      
      const user = json.user
      return user;
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
};

// getUser function
const getUser = () => {
    
  const access = localStorage.getItem('access');
  if (!access) return null;
  const user = localStorage.getItem('user');
  return user;
  console.log(user)
};

// signout function
const signout = () => {
  localStorage.removeItem('access');
  localStorage.removeItem('user');
};

export { signup, signin, getUser, signout };

