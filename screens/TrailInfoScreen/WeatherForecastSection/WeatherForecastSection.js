import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Modal, ScrollView } from "react-native";
import { getWeatherForecastByTrail } from "../TrailInfoApi/api";
import WeatherChart from "./WeatherChart";
import styles from "./styles";
import { Ionicons } from "@expo/vector-icons";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

const weatherIconMap = {
  0: { icon: "sunny", label: "Clear" },
  1: { icon: "partly-sunny", label: "Mainly Clear" },
  2: { icon: "cloud-outline", label: "Partly Cloudy" },
  3: { icon: "cloud", label: "Overcast" },
  45: { icon: "cloudy-night", label: "Fog" },
  48: { icon: "cloudy-night", label: "Depositing Fog" },
  51: { icon: "rainy-outline", label: "Light Drizzle" },
  61: { icon: "rainy", label: "Light Rain" },
  63: { icon: "rainy", label: "Moderate Rain" },
  65: { icon: "rainy-sharp", label: "Heavy Rain" },
  71: { icon: "snow-outline", label: "Light Snow" },
  73: { icon: "snow", label: "Moderate Snow" },
  75: { icon: "snow-sharp", label: "Heavy Snow" },
  95: { icon: "thunderstorm", label: "Thunderstorm" },
};

const formatHour = (isoString) => isoString.slice(11, 16);

const WeatherForecastSection = ({ trailId }) => {
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTab, setSelectedTab] = useState("today");

  const pulse = useSharedValue(1);
  useEffect(() => {
    pulse.value = withRepeat(withTiming(1.05, { duration: 1000 }), -1, true);
  }, []);
  const animatedTitleStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pulse.value }],
  }));

  useEffect(() => {
    const loadForecast = async () => {
      try {
        const data = await getWeatherForecastByTrail(trailId);
        setForecast(data.hourly || []);
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    loadForecast();
  }, [trailId]);

  const filterForecastByTab = () => {
    const now = new Date();
    const today = now.getDate();
    const tomorrow = new Date(now);
    tomorrow.setDate(today + 1);
    tomorrow.setHours(0, 0, 0, 0);

    return forecast.filter((f) => {
      const forecastDate = new Date(f.time);
      if (selectedTab === "today") {
        return forecastDate.getDate() === today && forecastDate > now;
      } else if (selectedTab === "tomorrow") {
        return (
          forecastDate.getDate() === tomorrow.getDate() &&
          forecastDate.getHours() >= 0
        );
      }
      return false;
    });
  };

  const filteredForecast = filterForecastByTab();
  const previewForecast = filteredForecast.slice(0, 5);

  const renderForecastItem = (hour) => {
    const { icon, label } = weatherIconMap[hour.weatherCode] || {
      icon: "help-circle-outline",
      label: "Unknown",
    };

    return (
      <View key={hour.time} style={styles.forecastItem}>
        <View style={styles.iconWithText}>
          <Ionicons name="time-outline" size={18} color="#A0CFFF" />
          <Text style={styles.forecastText}>{formatHour(hour.time)}</Text>
        </View>
        <View style={styles.iconWithText}>
          <Ionicons name="thermometer-outline" size={18} color="#A0CFFF" />
          <Text style={styles.forecastText}>{hour.temperature}°C</Text>
        </View>
        <View style={styles.iconWithText}>
          <Ionicons name="water-outline" size={18} color="#A0CFFF" />
          <Text style={styles.forecastText}>{hour.precipitation}mm</Text>
        </View>
        <View style={styles.iconWithText}>
          <Ionicons name={icon} size={18} color="#A0CFFF" />
          <Text style={styles.forecastText}>{label}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Animated.Text style={[styles.title, animatedTitleStyle]}>
          Weather Forecast
        </Animated.Text>
      </TouchableOpacity>

      <View style={styles.tabContainer}>
        {["today", "tomorrow"].map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[
              styles.tabButton,
              selectedTab === tab && styles.tabButtonActive,
            ]}
            onPress={() => setSelectedTab(tab)}
          >
            <Text
              style={[
                styles.tabText,
                selectedTab === tab && styles.tabTextActive,
              ]}
            >
              {tab === "today" ? "Today" : "Tomorrow"}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {loading && <Text style={styles.loadingText}>Loading forecast...</Text>}
      {error && <Text style={styles.errorText}>Error loading forecast.</Text>}
      {!loading && !error && previewForecast.length > 0 && (
        <WeatherChart
          data={previewForecast}
          maxPoints={5}
          onPress={() => setModalVisible(true)}
        />
      )}

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Full Weather Forecast</Text>
            <ScrollView style={styles.modalScroll}>
              {filteredForecast.map(renderForecastItem)}
            </ScrollView>
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={styles.closeButton}
            >
              <Text style={styles.closeText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default WeatherForecastSection;
