import React, { useRef, useState } from "react";
import { Button } from "react-native";
import * as Animatable from "react-native-animatable";
import { useAuth } from "../../context/AuthContext";
import UploadTrailSection from "./UploadTrailSection/UploadTrailSection";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./styles";
import AllTrails from "./AllTrailsSection/AllTrails";

const HomeScreen = () => {
  const { logout, user } = useAuth();
  const welcomeRef = useRef(null);
  const [newTrail, setNewTrail] = useState(null);

  const handleUploadSuccess = (trail) => {
    setNewTrail(trail);
  };

  return (
    <SafeAreaView style={styles.safeContainer} edges={["left", "right"]}>
      <Animatable.View
        animation="fadeIn"
        duration={1000}
        style={styles.container}
      >
        <Animatable.Text
          ref={welcomeRef}
          animation="fadeInDown"
          duration={800}
          style={styles.title}
          onAnimationEnd={() => {
            setTimeout(() => {
              welcomeRef.current?.fadeOutUp(600);
            }, 2000);
          }}
        >
          Welcome {user?.firstName || "Back"}!
        </Animatable.Text>

        {user?.role === "ROLE_ADMIN" && (
          <UploadTrailSection onUploadSuccess={handleUploadSuccess} />
        )}
        <AllTrails newTrail={newTrail} />
        <Button title="Log Out" onPress={logout} color="#d9534f" />
      </Animatable.View>
    </SafeAreaView>
  );
};

export default HomeScreen;
