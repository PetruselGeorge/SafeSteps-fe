// LoginScreen.js
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import LoginScreenContent from "./LoginScreenContent";
import Loader from "../../../utils/Loader/Loader";
import { useAuth } from "../../../context/AuthContext";
import { useNavigation } from "@react-navigation/native";
import WelcomeBack from "../WelcomeBack/WelcomeBack";

const LoginScreen = () => {
  const navigation = useNavigation();
  const { login, loading: authLoading, error: authError } = useAuth();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showWelcomeBack, setShowWelcomeBack] = useState(false);

  const handleLogin = async () => {
    if (formData.email.trim() === "" || formData.password.trim() === "") {
      setError("Both email and password are required.");
      return;
    }

    try {
      console.log("[Auth] Attempting login...");
      await login(formData);
      console.log("[Auth] Login successful - navigation handled in context");
      setShowWelcomeBack(true);
    } catch (err) {
      console.error("[Auth] Login failed:", err);
      setError(err.message || "Failed to login. Please try again.");
    }
  };

  const handleAnimationEnd = () => {
    setShowWelcomeBack(false);
  };

  if (authLoading) {
    console.log("[Auth] Auth check in progress...");
    return <Loader />;
  }

  if (showWelcomeBack) {
    return <WelcomeBack onAnimationEnd={handleAnimationEnd} />;
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
