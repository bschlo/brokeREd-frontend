
const BACKEND_URL = import.meta.env.VITE_BACKEND_SERVER_URL;
import { useNavigate } from "react-router";

const navigate = useNavigate()

const signup = async (formData) => {
  try {
    const res = await authFetch(`${BACKEND_URL}/users/register/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    if (!res.ok) {
      const errorMessage = await res.text();
      throw new Error(errorMessage);
    }

    const json = await res.json();

    if (json.access) {
      localStorage.setItem('access', json.access);

      const user = json.user;
      localStorage.setItem('user', JSON.stringify(user));

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

const signin = async (user) => {
  try {
    const res = await authFetch(`${BACKEND_URL}/users/login/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    });

    if (!res.ok) {
      const errorMessage = await res.text();
      throw new Error(errorMessage);
    }

    const json = await res.json();

    if (json.error) {
      throw new Error(json.error);
    }

    if (json.access) {
      const user = json.user;
      localStorage.setItem('access', json.access); 
      localStorage.setItem('user', JSON.stringify(user)); 
      

      return user;
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const getUser = () => {
  const userStr = localStorage.getItem("user");
  const accessToken = localStorage.getItem("access");

  try {
    if (userStr) {
      return { user: JSON.parse(userStr), token: accessToken };
    }
    return null;
  } catch (error) {
    console.error("Invalid JSON in localStorage:", userStr);
    signout()
    localStorage.removeItem("user"); 
    return { user: null, token: accessToken }; 
  }
};

const signout = () => {
  localStorage.removeItem('access');
  localStorage.removeItem('user');
  console.log("User has been signed out.");
};

const authFetch = async (endpoint, options = {}) => {
  const token = localStorage.getItem('access');

  if (!token) {
    signout();
    navigate('/signin') 
    return null;
  }

  const res = await fetch(`${BACKEND_URL}${endpoint}`, {
    ...options,
    headers: {
      ...(options.headers || {}),
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  if (res.status === 401) {
    signout();
    navigate('/signin')  
    return null;
  }

  return res;
};



export { signup, signin, getUser, signout, authFetch };
