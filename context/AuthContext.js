// src/context/AuthContext.js

import { createContext, useState, useEffect, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { loginUser, validateOrRefreshToken } from "../screens/Auth/AuthApi/api";
import { navigationRef, reset } from "../navigation/NavigationService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const isValid = await validateOrRefreshToken();
        if (isValid) {
          console.log("[Auth] Token is valid. Navigating to HomeScreen...");
          setIsAuthenticated(true);
          const interval = setInterval(() => {
            if (navigationRef.isReady()) {
              reset(0, [{ name: "HomeScreen" }]);
              clearInterval(interval);
            } else {
              console.warn("[Auth] Navigator not ready, will retry...");
            }
          }, 100);
        } else {
          console.log("[Auth] No valid token. Showing WelcomeScreen...");
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error("[Auth] Error checking authentication:", error);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (formData) => {
    try {
      const response = await loginUser(formData);

      await AsyncStorage.setItem("accessToken", response.jwtToken);
      await AsyncStorage.setItem("refreshToken", response.refreshToken);

      console.log("[Auth] Tokens Saved Successfully");

      setIsAuthenticated(true);

      const interval = setInterval(() => {
        if (navigationRef.isReady()) {
          console.log("[Auth] Navigator is ready. Resetting to HomeScreen...");
          reset(0, [{ name: "HomeScreen" }]);
          clearInterval(interval);
        } else {
          console.warn("[Auth] Navigator not ready, will retry...");
        }
      }, 100);

      return response;
    } catch (err) {
      console.error("[Auth] Login Failed:", err);
      setError(err.message || "Login failed. Please try again.");
      setIsAuthenticated(false);
      throw err;
    }
  };

  const logout = async () => {
    console.log("[Auth] Logging out...");
    await AsyncStorage.removeItem("accessToken");
    await AsyncStorage.removeItem("refreshToken");
    setIsAuthenticated(false);
    setLoading(false);
    reset(0, [{ name: "WelcomeScreen" }]);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, login, logout, loading, error }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
