import { View, Text } from "react-native";
import styles from "./styles";
import { useEffect } from "react";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";

const PoppinsBold = require("../../../assets/fonts/Poppins-Bold.ttf");
const PoppinsLight = require("../../../assets/fonts/Poppins-Light.ttf");

const WelcomeBackContent = () => {
  const [fontsLoaded] = useFonts({
    PoppinsBold: PoppinsBold,
    PoppinsLight: PoppinsLight,
  });

  useEffect(() => {
    async function prepare() {
      if (fontsLoaded) {
        await SplashScreen.hideAsync();
      }
    }
    prepare();
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.contentContainer}>
      <Text style={styles.welcomeText}>Welcome back, explorer!</Text>
      <Text style={styles.subText}>
        We’re glad to see you again. Let’s get moving!
      </Text>
    </View>
  );
};

export default WelcomeBackContent;
