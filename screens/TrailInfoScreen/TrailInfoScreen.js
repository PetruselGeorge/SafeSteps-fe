import { useRef } from "react";
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import styles from "./styles";
import TrailImageGallery from "./TrailImageGallery/TrailImageGallery";
import { useAuth } from "../../context/AuthContext";
import ImageUploader from "./ImageUploader/ImageUploader";
import WeatherForecastSection from "./WeatherForecastSection/WeatherForecastSection";
import TrailReviewSection from "./TrailReviewSection/TrailReviewSection";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { getWeatherForecastByTrail } from "./TrailInfoApi/api";

export default function TrailInfoScreen({ route }) {
  const navigation = useNavigation();
  const { trail } = route.params;
  const { user } = useAuth();
  const galleryRef = useRef(null);
  const resolvedImage = require("../../assets/homescreen/homescreen-background.png");
  const handleStartTrail = async () => {
    try {
      const forecastData = await getWeatherForecastByTrail(trail.id);
      const hourly = forecastData.hourly;

      const now = new Date();
      const nextHours = hourly.filter((entry) => {
        const time = new Date(entry.time);
        return time > now && time - now <= 3 * 60 * 60 * 1000;
      });

      const badWeather = nextHours.some(
        (hour) =>
          hour.precipitation > 0.1 ||
          [0, 1, 2, 3, 61, 63, 65, 80, 81, 82, 95, 96, 99].includes(
            hour.weatherCode
          )
      );

      if (badWeather) {
        Alert.alert(
          "Warning",
          "In the next hours there might be a storm do you wish to proceed?",
          [
            { text: "Quit", style: "cancel" },
            {
              text: "Start Anyway",
              style: "default",
              onPress: () =>
                navigation.navigate("TrailMap", { trailId: trail.id }),
            },
          ]
        );
      } else {
        navigation.navigate("TrailMap", { trailId: trail.id });
      }
    } catch (error) {
      navigation.navigate("TrailMap", { trailId: trail.id });
    }
  };
  return (
    <ImageBackground source={resolvedImage} style={styles.background}>
      <KeyboardAwareScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        enableOnAndroid
        extraScrollHeight={Platform.OS === "ios" ? 20 : 30}
      >
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Ionicons name="arrow-back" size={24} color="#A0CFFF" />
            <Text style={styles.backText}>Back</Text>
          </TouchableOpacity>
          <Text style={styles.pageTitle}>{trail.name}</Text>
        </View>

        <View style={styles.galleryWrapper}>
          <TrailImageGallery ref={galleryRef} trailId={trail.id} />
        </View>

        {user?.role === "ROLE_ADMIN" && (
          <ImageUploader trailId={trail.id} galleryRef={galleryRef} />
        )}

        <View style={{ marginVertical: 20, alignItems: "center" }}>
          <TouchableOpacity
            style={styles.startTrail}
            onPress={handleStartTrail}
          >
            <Ionicons name="walk-outline" size={20} color="white" />
            <Text style={{ color: "white", marginLeft: 8, fontWeight: "600" }}>
              Start Trail
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.infoContainer}>
          <View style={styles.infoRow}>
            <MaterialIcons name="directions-walk" size={20} color="#A0CFFF" />
            <Text style={styles.infoText}>Distance: {trail.distanceKm} km</Text>
          </View>
          <View style={styles.infoRow}>
            <Ionicons name="barbell-outline" size={20} color="#A0CFFF" />
            <Text style={styles.infoText}>Difficulty: {trail.difficulty}</Text>
          </View>
          <View style={styles.infoRow}>
            <Ionicons name="location-outline" size={20} color="#A0CFFF" />
            <Text style={styles.infoText}>Location: {trail.location}</Text>
          </View>
          {trail.addedAt && (
            <View style={styles.infoRow}>
              <Ionicons name="heart-outline" size={20} color="#A0CFFF" />
              <Text style={styles.infoText}>
                Favorited: {new Date(trail.addedAt).toLocaleString("en-GB")}
              </Text>
            </View>
          )}

          <WeatherForecastSection trailId={trail.id} />
        </View>

        <TrailReviewSection trailId={trail.id} />
      </KeyboardAwareScrollView>
    </ImageBackground>
  );
}
