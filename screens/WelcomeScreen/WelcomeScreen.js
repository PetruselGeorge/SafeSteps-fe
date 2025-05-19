// src/screens/WelcomeScreen/WelcomeScreen.js

import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Asset } from "expo-asset";
import Loader from "../../utils/Loader/Loader";
import WelcomeContent from "./WelcomeContent";
import { useNavigation } from "@react-navigation/native";

const backgroundImage = require("../../assets/homepage/homepage-background.png");
const pinpointImage = require("../../assets/homepage/homepage-pinpoint.png");
const compassImage = require("../../assets/homepage/homepage-compass.png");
const safetyImage = require("../../assets/homepage/homepage-safety.png");
const cupImage = require("../../assets/homepage/homepage-cup.png");

const WelcomeScreen = () => {
  const [assetsLoaded, setAssetsLoaded] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    const loadAssets = async () => {
      console.log("[WelcomeScreen] Loading assets...");
      await Asset.loadAsync([
        backgroundImage,
        pinpointImage,
        compassImage,
        safetyImage,
        cupImage,
      ]);
      setAssetsLoaded(true);
    };

    loadAssets();
  }, []);

  const handleNext = () => {
    navigation.navigate("RegistrationScreenOne");
  };

  const handleLogin = () => {
    console.log("[WelcomeScreen] Navigating to LoginScreen...");
    navigation.navigate("LoginScreen");
  };

  if (!assetsLoaded) {
    return <Loader />;
  }

  return (
    <SafeAreaView style={{ flex: 1 }} edges={["left", "right"]}>
      <WelcomeContent
        backgroundImage={backgroundImage}
        pinpointImage={pinpointImage}
        compassImage={compassImage}
        safetyImage={safetyImage}
        cupImage={cupImage}
        handleNext={handleNext}
        handleLogin={handleLogin}
      />
    </SafeAreaView>
  );
};

export default WelcomeScreen;
