import axios from "axios";
import React, { useState, useEffect, createContext, useContext } from "react";

const authContext = createContext();

const ContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (user) => {
    setUser(user);
  };

  const logout = () => {
    localStorage.clear('token');
    setUser(null); // logout ke baad user ko null set karte hain
  };

  useEffect(() => {
    const verifyUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.log("No token found.");
        setUser(null);
        return;
      }

      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/auth/verify`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (res.data.success) {
          setUser(res.data.user);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.log("Verification error:", error);
        setUser(null);  // Agar error ho toh user ko null set karenge
      }
    };
    verifyUser();
  }, []);

  return (
    <authContext.Provider value={{ login, user, logout }}>
      {children}
    </authContext.Provider>
  );
};

export const useAuth = () => useContext(authContext);

export default ContextProvider;
