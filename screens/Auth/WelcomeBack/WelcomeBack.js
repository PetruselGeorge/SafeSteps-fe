import { useEffect, useRef } from "react";
import { ImageBackground, View } from "react-native";
import WelcomeBackContent from "./WelcomeBackContent";
import styles from "./styles";
import * as Animatable from "react-native-animatable";
import { SafeAreaView } from "react-native-safe-area-context";
import LottieView from "lottie-react-native";
import { useAuth } from "../../../context/AuthContext";
import { navigationRef, reset } from "../../../navigation/NavigationService";

const backgroundImage = require("../../../assets/welcomebackpage/welcomeback-background.png");
const starsAnimation = require("../../../assets/animations/stars.json");
const WelcomeBack = ({ onAnimationEnd }) => {
  const textRef = useRef(null);
  const starsRef = useRef(null);
  const { setShowWelcomeBack } = useAuth();

  useEffect(() => {
    if (textRef.current) {
      textRef.current.animate("zoomIn", 1000).then(() => {
        setTimeout(() => {
          if (textRef.current) {
            textRef.current.animate("fadeOutUp", 800).then(() => {
              if (starsRef.current) {
                starsRef.current.play();
              }

              setShowWelcomeBack(false);

              const interval = setInterval(() => {
                if (navigationRef.isReady()) {
                  console.log(
                    "[WelcomeBack] Navigator ready. Redirecting to HomeScreen..."
                  );
                  reset(0, [{ name: "Drawer" }]);
                  clearInterval(interval);
                } else {
                  console.log("[WelcomeBack] Navigator not ready yet...");
                }
              }, 100);
            });
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
          ref={starsRef}
          source={starsAnimation}
          autoPlay={true}
          loop={true}
          style={styles.fullScreenStars}
        />
      </ImageBackground>
    </SafeAreaView>
  );
};

export default WelcomeBack;
