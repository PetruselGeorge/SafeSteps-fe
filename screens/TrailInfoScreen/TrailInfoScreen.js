import React, { useRef } from "react";
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import styles from "./styles";
import TrailImageGallery from "./TrailImageGallery/TrailImageGallery";
import { useAuth } from "../../context/AuthContext";
import ImageUploader from "./ImageUploader/ImageUploader";

export default function TrailInfoScreen({ route }) {
  const navigation = useNavigation();
  const { trail } = route.params;
  const { user } = useAuth();
  const galleryRef = useRef(null);
  const resolvedImage = require("../../assets/homescreen/homescreen-background.png");

  return (
    <ImageBackground source={resolvedImage} style={styles.background}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
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
        </View>

        {user?.role === "ROLE_ADMIN" && (
          <ImageUploader trailId={trail.id} galleryRef={galleryRef} />
        )}
      </ScrollView>
    </ImageBackground>
  );
}
