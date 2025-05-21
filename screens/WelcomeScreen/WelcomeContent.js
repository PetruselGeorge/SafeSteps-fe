import { ImageBackground, Text, View, TouchableOpacity } from "react-native";
import * as Animatable from "react-native-animatable";
import styles from "./styles";
import LottieView from "lottie-react-native";
import { useEffect, useRef } from "react";

const rotatingBounce = {
  0: {
    transform: [{ rotate: "0deg" }, { translateY: 0 }],
  },
  0.25: {
    transform: [{ rotate: "4deg" }, { translateY: -4 }],
  },
  0.5: {
    transform: [{ rotate: "-4deg" }, { translateY: -8 }],
  },
  0.75: {
    transform: [{ rotate: "2deg" }, { translateY: 0 }],
  },
  1: {
    transform: [{ rotate: "0deg" }, { translateY: 2 }],
  },
};

const starsAnimation = require("../../assets/animations/stars.json");

const WelcomeContent = ({
  backgroundImage,
  pinpointImage,
  compassImage,
  safetyImage,
  cupImage,
  handleNext,
  handleLogin,
}) => {
  const starsRef = useRef(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (starsRef.current) {
        starsRef.current.play();
        console.log("[Stars] Animation started");
      }
    }, 1000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <ImageBackground
      source={backgroundImage}
      resizeMode="cover"
      style={styles.image}
      blurRadius={1}
    >
      <Animatable.Image
        animation={rotatingBounce}
        easing={"ease-in-out"}
        iterationCount={"infinite"}
        delay={300}
        duration={2200}
        source={pinpointImage}
        style={styles.pinpointImage}
      />

      <View style={styles.overlay} />
      <LottieView
        ref={starsRef}
        source={starsAnimation}
        autoPlay={false}
        loop={true}
        pointerEvents="none"
        style={[styles.fullScreenStars, { transform: [{ scale: 2.5 }] }]}
      />
      <Animatable.Text animation="fadeInDown" delay={500} style={styles.text}>
        SafeSteps
      </Animatable.Text>

      <Animatable.Text animation="fadeInUp" delay={800} style={styles.header}>
        Explore with safety.
      </Animatable.Text>

      <Animatable.Text animation="fadeInUp" delay={1000} style={styles.div}>
        Discover trails, receive alerts in real time and earn rewards with each
        step.
      </Animatable.Text>

      <Animatable.View
        animation="fadeInUp"
        delay={1300}
        style={styles.benefitContainer}
      >
        <View style={styles.benefitItem}>
          <ImageBackground source={compassImage} style={styles.benefitImage} />
          <Text style={styles.benefitText}>Custom Trails</Text>
        </View>

        <View style={styles.benefitItem}>
          <ImageBackground source={safetyImage} style={styles.benefitImage} />
          <Text style={styles.benefitText}>Safety Alerts</Text>
        </View>

        <View style={styles.benefitItem}>
          <ImageBackground source={cupImage} style={styles.benefitImage} />
          <Text style={styles.benefitText}>Game Mode</Text>
        </View>
      </Animatable.View>

      <Animatable.View animation="fadeIn" delay={1600}>
        <TouchableOpacity style={styles.button} onPress={handleNext}>
          <Text style={styles.buttonText}>Let's begin!</Text>
        </TouchableOpacity>
      </Animatable.View>

      <TouchableOpacity onPress={handleLogin}>
        <Animatable.Text animation="fadeIn" delay={2000} style={styles.signUp}>
          Already have an account? Sign up!
        </Animatable.Text>
      </TouchableOpacity>
    </ImageBackground>
  );
};

export default WelcomeContent;
