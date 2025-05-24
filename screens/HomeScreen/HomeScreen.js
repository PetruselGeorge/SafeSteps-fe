import React from "react";
import { Text, Button, View } from "react-native";
import * as Animatable from "react-native-animatable";
import { useAuth } from "../../context/AuthContext";
import UploadTrailSection from "./TrailSection/UploadTrailSection";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./styles"; 

const HomeScreen = () => {
  const { logout, user } = useAuth();

  return (
    <SafeAreaView style={styles.safeContainer} edges={["left", "right"]}>
      <Animatable.View animation="fadeIn" duration={1000} style={styles.container}>
        <Text style={styles.title}>Welcome {user?.firstName || "Back"}!</Text>

        {user?.role === "ROLE_ADMIN" && (
  
            <UploadTrailSection />
        )}

        <Button title="Log Out" onPress={logout} color="#d9534f" />
      </Animatable.View>
    </SafeAreaView>
  );
};

export default HomeScreen;
