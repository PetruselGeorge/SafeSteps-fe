import { View, Text, ImageBackground, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import styles from "./styles";

export default function TrailInfoScreen({ route }) {
  const navigation = useNavigation();
  const { trail } = route.params;

  const resolvedImage = require("../../assets/homescreen/homescreen-background.png");

  return (
    <ImageBackground source={resolvedImage} style={styles.background}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}
      >
        <Ionicons name="arrow-back" size={24} color="#fff" />
        <Text style={styles.backText}>Back</Text>
      </TouchableOpacity>

      <View style={styles.titleContainer}>
        <Text style={styles.pageTitle}>{trail.name}</Text>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.info}>Distance: {trail.distanceKm} km</Text>
        <Text style={styles.info}>Difficulty: {trail.difficulty}</Text>
        {trail.addedAt && (
          <Text style={styles.info}>
            Added to favorites:{" "}
            {new Date(trail.addedAt).toLocaleString("en-GB")}
          </Text>
        )}
      </View>
    </ImageBackground>
  );
}
