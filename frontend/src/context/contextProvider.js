import React, { createContext, useContext, useEffect, useState} from 'react';

const authContext = createContext();

const ContextProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const login = (user) =>{
      setUser(user);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    window.location.href = '/';
  };
  

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/auth/verify', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        });
        
        // Parse the response as JSON
        const data = await response.json();
  
        // Check if 'success' exists in the data
        if (data.success) {
          setUser(data.user);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.log(error);
      }
    };
    verifyUser();
  }, []); // Add an empty dependency array to run only once on mount  

  return (
    <authContext.Provider value={{user, login, logout}}>
        {children}
    </authContext.Provider>
  )
}

export const useAuth = () => useContext(authContext);
export default ContextProvider;