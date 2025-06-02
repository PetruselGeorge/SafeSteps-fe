import React, { useEffect, useRef, useState } from "react";
import {
  View,
  ActivityIndicator,
  TouchableOpacity,
  Text,
  Alert,
} from "react-native";
import MapView, { Polyline } from "react-native-maps";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import * as Location from "expo-location";
import { Accelerometer } from "expo-sensors";
import * as Linking from "expo-linking";

import styles from "./styles";
import { getTrailCoordinates } from "./TailMapApi/api";

const SHAKE_THRESHOLD = 1.8;
const SHAKE_COUNT = 3;
const SHAKE_WINDOW = 5000;

export default function TrailMap({ route }) {
  const { trailId } = route.params;
  const navigation = useNavigation();

  const [coordinates, setCoordinates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [followUser, setFollowUser] = useState(false);
  const [userLocation, setUserLocation] = useState(null);

  const mapRef = useRef(null);
  const shakeTimestamps = useRef([]);
  const alertTimeoutRef = useRef(null);

  useEffect(() => {
    const fetchCoords = async () => {
      try {
        const data = await getTrailCoordinates(trailId);
        const segments = {};

        for (const coord of data) {
          const segment = coord.segmentIndex ?? 0;
          if (!segments[segment]) segments[segment] = [];

          const lat = parseFloat(coord.latitude);
          const lon = parseFloat(coord.longitude);

          if (!isNaN(lat) && !isNaN(lon)) {
            segments[segment].push({ latitude: lat, longitude: lon });
          }
        }

        const groupedSegments = Object.values(segments).filter((seg) => seg.length > 1);
        setCoordinates(groupedSegments);
      } catch (e) {
        console.error("Failed to fetch trail coords:", e);
      } finally {
        setLoading(false);
      }
    };

    fetchCoords();
  }, [trailId]);

  useEffect(() => {
    if (coordinates.length && mapRef.current) {
      const flat = coordinates.flat();
      mapRef.current.fitToCoordinates(flat, {
        edgePadding: { top: 100, right: 100, bottom: 100, left: 100 },
        animated: true,
      });
    }
  }, [coordinates]);

  useEffect(() => {
    const timer = setInterval(() => setElapsedTime((prev) => prev + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    let subscription;

    const trackLocation = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") return;

      subscription = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 2000,
          distanceInterval: 2,
        },
        (location) => {
          const { latitude, longitude } = location.coords;
          setUserLocation({ latitude, longitude });

          if (followUser && mapRef.current) {
            mapRef.current.animateToRegion(
              {
                latitude,
                longitude,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
              },
              800
            );
          }
        }
      );
    };

    trackLocation();
    return () => subscription?.remove();
  }, [followUser]);

  useEffect(() => {
    const checkShake = ({ x, y, z }) => {
      const force = Math.sqrt(x * x + y * y + z * z);
      const now = Date.now();

      if (force > SHAKE_THRESHOLD) {
        shakeTimestamps.current.push(now);
        shakeTimestamps.current = shakeTimestamps.current.filter(
          (t) => now - t <= SHAKE_WINDOW
        );

        if (shakeTimestamps.current.length >= SHAKE_COUNT) {
          triggerEmergencyAlert();
          shakeTimestamps.current = [];
        }
      }
    };

    Accelerometer.setUpdateInterval(500);
    const subscription = Accelerometer.addListener(checkShake);

    return () => {
      subscription?.remove();
      clearTimeout(alertTimeoutRef.current);
    };
  }, []);

  const triggerEmergencySMSOrCall = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.warn("Location permission not granted");
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;

      const phoneNumber = "0755493422";
      const mapLink = `https://maps.google.com/?q=${latitude},${longitude}`;
      const message = encodeURIComponent(
        `Possible accident detected!\nLocation: ${mapLink}`
      );

      await Linking.openURL(`sms:${phoneNumber}?body=${message}`);
    } catch (error) {
      console.error("Failed to send emergency SMS:", error);
    }
  };

  const triggerEmergencyAlert = () => {
    Alert.alert(
      "Emergency Alert",
      "We detected a sudden movement. Are you okay?",
      [
        { text: "Yes, I'm okay", onPress: () => clearTimeout(alertTimeoutRef.current) },
        {
          text: "No, I need help",
          style: "destructive",
          onPress: () => {
            clearTimeout(alertTimeoutRef.current);
            triggerEmergencySMSOrCall();
          },
        },
      ],
      { cancelable: false }
    );

    alertTimeoutRef.current = setTimeout(() => {
      triggerEmergencySMSOrCall();
    }, 30000);
  };

  const formatTime = (sec) => {
    const min = Math.floor(sec / 60);
    const s = sec % 60;
    return `${min}m ${s < 10 ? "0" : ""}${s}s`;
  };

  if (loading || coordinates.length === 0) {
    return (
      <ActivityIndicator style={styles.loading} color="#50A8FF" size="large" />
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        showsUserLocation
        followsUserLocation={false}
      >
        {coordinates.map((segment, index) => (
          <Polyline
            key={index}
            coordinates={segment}
            strokeColor="#50A8FF"
            strokeWidth={4}
          />
        ))}
      </MapView>

      <View style={styles.overlay}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={20} color="white" />
        </TouchableOpacity>

        <Text style={styles.timerText}>
          <Ionicons name="time" size={18} color="white" /> {formatTime(elapsedTime)}
        </Text>

        <TouchableOpacity
          style={styles.followButton}
          onPress={() => setFollowUser(true)}
        >
          <Ionicons name="navigate" size={18} color="#162233" />
          <Text style={styles.followButtonText}> Follow trail</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
