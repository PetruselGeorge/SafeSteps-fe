// Loader.js
import React from "react";
import { View } from "react-native";
import LottieView from "lottie-react-native";
import styles from "./styles"
import animationData from "../../assets/animations/safesteps_loader.json";

const Loader = () => {
  return (
    <View style={styles.container}>
      <LottieView
        source={animationData}
        autoPlay
        loop
        style={styles.animation}
      />
    </View>
  );
};

export default Loader;
