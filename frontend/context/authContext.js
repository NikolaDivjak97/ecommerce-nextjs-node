import { createContext, useContext, useState, useEffect } from "react";
import { getUserFromClient } from "@/utils/auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const data = await getUserFromClient();

      if (data && data.user) {
        setUser(data.user);
      }
    };

    fetchUser();
  }, []);

  return <AuthContext.Provider value={{ user, setUser }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
