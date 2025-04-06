const BASE_URL = import.meta.env.VITE_BACKEND_SERVER_URL;

const signup = async (formData) => {
  try {
    const res = await fetch(`${BASE_URL}/users/register/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    if (!res.ok) {
      // Try to parse as JSON first, fall back to text
      try {
        const errorData = await res.json();
        throw new Error(errorData.detail || JSON.stringify(errorData));
      } catch (parseError) {
        const errorMessage = await res.text();
        throw new Error(`Status ${res.status}: ${errorMessage}`);
      }
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
    console.log('Signup error:', err);
    throw err;
  }
};

const signin = async (user) => {
  try {
    console.log('Attempting login with:', JSON.stringify(user));
    
    const res = await fetch(`${BASE_URL}/users/login/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    });

    console.log('Login response status:', res.status);

    if (!res.ok) {
      // Try to parse as JSON first, fall back to text
      try {
        const errorData = await res.json();
        throw new Error(errorData.detail || JSON.stringify(errorData));
      } catch (parseError) {
        const errorMessage = await res.text();
        throw new Error(`Status ${res.status}: ${errorMessage}`);
      }
    }

    const json = await res.json();
    console.log('Login response data:', JSON.stringify(json));

    if (json.error) {
      throw new Error(json.error);
    }

    if (json.access) {
      const user = json.user;
      localStorage.setItem('access', json.access);
      localStorage.setItem('user', JSON.stringify(user));
      return user;
    }

    return json;
  } catch (err) {
    console.error('Signin error:', err);
    throw err;
  }
};

const getUser = () => {
  const userStr = localStorage.getItem("user");
  const accessToken = localStorage.getItem("access");

  try {
    if (userStr && accessToken) {
      return { user: JSON.parse(userStr), token: accessToken };
    }
    return null;
  } catch (error) {
    console.error("Invalid JSON in localStorage:", userStr);
    signout();
    return null;
  }
};

const signout = () => {
  localStorage.removeItem('access');
  localStorage.removeItem('user');
  console.log("User has been signed out.");
};



export { signup, signin, getUser, signout};
