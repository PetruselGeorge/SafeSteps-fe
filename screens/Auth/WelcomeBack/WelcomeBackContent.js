import { View, Text } from "react-native";
import styles from "./styles";
import { useEffect } from "react";
import { Pacifico_400Regular, useFonts } from "@expo-google-fonts/pacifico";
import * as SplashScreen from "expo-splash-screen";

const WelcomeBackContent = () => {
  const [fontsLoaded] = useFonts({
    Pacifico_400Regular: Pacifico_400Regular,
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
      <Text style={styles.header}>Welcome Back!</Text>
      <Text style={styles.div}>
        We are happy to see you again. Continue your adventure!
      </Text>
    </View>
  );
};

export default WelcomeBackContent;
