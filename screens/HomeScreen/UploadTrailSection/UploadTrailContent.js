import { Animated, Text, View, Pressable } from "react-native";
import { useRef } from "react";
import { Ionicons } from "@expo/vector-icons";
import styles from "./styles";

export default function UploadTrailContent({ handleSelectAndUpload, selectedFile }) {
  const opacity = useRef(new Animated.Value(0.6)).current;

  const handlePressIn = () => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 150,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.timing(opacity, {
      toValue: 0.6,
      duration: 150,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={styles.container}>
      <Pressable
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={handleSelectAndUpload}
        style={{ borderRadius: 20 }}
      >
        <Animated.View style={[styles.card, { opacity }]}>
          <Text style={styles.sectionTitle}>Upload a New Trail</Text>
          <Ionicons name="add" size={48} color="rgba(160, 207, 255, 0.65)" />
        </Animated.View>
      </Pressable>

      {selectedFile && <Text style={styles.selectFile}>{selectedFile}</Text>}
    </View>
  );
}
