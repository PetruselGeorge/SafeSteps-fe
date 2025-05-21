import React from "react";
import { Text, Button, View } from "react-native";
import * as Animatable from "react-native-animatable";
import { useAuth } from "../../context/AuthContext";

const HomeScreen = () => {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <Animatable.View
      animation="fadeIn"
      duration={1000}
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <Text style={{ fontSize: 20, marginBottom: 20 }}>🏠 HomeScreen</Text>
      <Button title="Log Out" onPress={handleLogout} color="#d9534f" />
    </Animatable.View>
  );
};

export default HomeScreen;
