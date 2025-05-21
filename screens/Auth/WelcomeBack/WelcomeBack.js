import React, { useEffect, useRef } from "react";
import { ImageBackground, View } from "react-native";
import WelcomeBackContent from "./WelcomeBackContent";
import styles from "./styles";
import * as Animatable from "react-native-animatable";
import { SafeAreaView } from "react-native-safe-area-context";
import LottieView from "lottie-react-native";

const backgroundImage = require("../../../assets/welcomebackpage/welcomeback-background.png");
const fireworksAnimation = require("../../../assets/animations/fireworks.json");
const WelcomeBack = ({ onAnimationEnd }) => {
  const textRef = useRef(null);
  const fireworksRef = useRef(null);

  useEffect(() => {
    if (textRef.current) {
      textRef.current.animate("zoomIn", 1000).then(() => {
        setTimeout(() => {
          if (textRef.current) {
            textRef.current.animate("fadeOutUp", 800).then(() => {
              if (fireworksRef.current) {
                fireworksRef.current.play();
              }
            navigation.reset({ index: 0, routes: [{ name: "HomeScreen" }] });
            }, 1000);
          }
        }, 1500);
      });
    }
  }, []);

  return (
    <SafeAreaView style={styles.container} edges={["left", "right"]}>
      <ImageBackground
        source={backgroundImage}
        resizeMode="cover"
        style={styles.backgroundImage}
      >
        <Animatable.View ref={textRef} style={styles.content}>
          <WelcomeBackContent />
        </Animatable.View>

        <LottieView
          ref={fireworksRef}
          source={fireworksAnimation}
          autoPlay={false}
          loop={false}
          style={styles.fullScreenFireworks}
        />
      </ImageBackground>
    </SafeAreaView>
  );
};

export default WelcomeBack;
