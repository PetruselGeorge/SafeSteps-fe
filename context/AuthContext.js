import { createContext, useState, useEffect, useContext, use } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { loginUser, validateOrRefreshToken } from "../screens/Auth/AuthApi/api";
import { navigationRef, reset } from "../navigation/NavigationService";
import { jwtDecode } from "jwt-decode";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showWelcomeBack, setShowWelcomeBack] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const isValid = await validateOrRefreshToken();
        const token = await AsyncStorage.getItem("accessToken");
        const decoded = jwtDecode(token);
        setUser(decoded);
        if (isValid) {
          console.log("[Auth] Token is valid. Showing WelcomeBack...");
          setIsAuthenticated(true);
          setShowWelcomeBack(true);
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
      const decoded = jwtDecode(response.jwtToken);
      setUser(decoded);
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
      value={{
        isAuthenticated,
        login,
        logout,
        loading,
        error,
        showWelcomeBack,
        setShowWelcomeBack,
        user
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
