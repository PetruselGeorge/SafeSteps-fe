// LoginScreen.js
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import LoginScreenContent from "./LoginScreenContent";
import Loader from "../../../utils/Loader/Loader";
import { useAuth } from "../../../context/AuthContext";
import { useNavigation } from "@react-navigation/native";

const LoginScreen = () => {
  const navigation = useNavigation();
  const { login, loading: authLoading, error: authError } = useAuth();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    if (formData.email.trim() === "" || formData.password.trim() === "") {
      setError("Both email and password are required.");
      return;
    }

    try {
      console.log("[Auth] Attempting login...");
      await login(formData);
      console.log("[Auth] Login successful - navigation handled in context");
    } catch (err) {
      console.error("[Auth] Login failed:", err);
      setError(err.message || "Failed to login. Please try again.");
    }
  };

  if (authLoading) {
    console.log("[Auth] Auth check in progress...");
    return <Loader />;
  }

  return (
    <SafeAreaView style={{ flex: 1 }} edges={["left", "right"]}>
      <LoginScreenContent
        formData={formData}
        setFormData={setFormData}
        error={error || authError}
        onLogin={handleLogin}
      />
    </SafeAreaView>
  );
};

export default LoginScreen;
