import { useEffect, useState } from "react";
import { useAuth } from "../../../../context/AuthContext";
import { fetchTrailImageAsBase64WithAuth } from "../../TrailsApi/api";
import * as Animatable from "react-native-animatable";
import { ImageBackground, TouchableOpacity, Text } from "react-native";
import styles from "../styles";
import { Ionicons } from "@expo/vector-icons";
import { navigate } from "../../../../navigation/NavigationService";
export default function TrailCard({
  item,
  handleUpdateImage,
  isFavorite,
  toggleFavorite,
  showRemoveButton = false,
  disableFavoriteToggle = false,
  showAddedAt = false,
}) {
  const { user } = useAuth();
  const [imageUri, setImageUri] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const loadImage = async () => {
      if (item.mainImageUrl) {
        const base64 = await fetchTrailImageAsBase64WithAuth(item.mainImageUrl);
        if (isMounted) setImageUri(base64);
      }
    };
    loadImage();
    return () => {
      isMounted = false;
    };
  }, [item.mainImageUrl, item.localMainImage]);

  const resolvedImage = item.localMainImage
    ? { uri: item.localMainImage }
    : imageUri
    ? { uri: imageUri }
    : require("../../../../assets/trails/default-trail.png");

  const handlePress = () => {
    navigate("TrailInfo", { trail: item });
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <Animatable.View animation="fadeIn" duration={500} style={styles.card}>
        <ImageBackground
          source={resolvedImage}
          style={styles.imageBackground}
          imageStyle={styles.imageStyle}
        >
          {disableFavoriteToggle ? (
            <Ionicons
              name={isFavorite ? "heart" : "heart-outline"}
              size={22}
              color={isFavorite ? "#e74c3c" : "#ccc"}
              style={styles.favoriteIcon}
            />
          ) : (
            <TouchableOpacity
              style={styles.favoriteIcon}
              onPress={() => toggleFavorite(item.id)}
            >
              <Ionicons
                name={isFavorite ? "heart" : "heart-outline"}
                size={22}
                color={isFavorite ? "#e74c3c" : "#ccc"}
              />
            </TouchableOpacity>
          )}

          <Animatable.View
            animation="fadeInUp"
            duration={600}
            style={styles.overlay}
          >
            <Text style={styles.trailName}>{item.name}</Text>
            <Text style={styles.trailInfo}>Distance: {item.distanceKm} km</Text>
            <Text style={styles.trailInfo}>Difficulty: {item.difficulty}</Text>
            <Text style={styles.trailInfo}>Location: {item.location}</Text>
            {showAddedAt && item.addedAt && (
              <Text style={styles.addedAt}>
                Added:{" "}
                {new Date(item.addedAt).toLocaleString("en-GB", {
                  dateStyle: "short",
                  timeStyle: "short",
                })}
              </Text>
            )}
          </Animatable.View>

          {showRemoveButton ? (
            <TouchableOpacity
              style={styles.editIcon}
              onPress={() => toggleFavorite(item.id)}
            >
              <Ionicons name="trash" size={20} color="white" />
            </TouchableOpacity>
          ) : (
            user?.role === "ROLE_ADMIN" &&
            handleUpdateImage && (
              <TouchableOpacity
                style={styles.editIcon}
                onPress={() => handleUpdateImage(item.id)}
              >
                <Ionicons name="camera" size={20} color="#A0CFFF" />
              </TouchableOpacity>
            )
          )}
        </ImageBackground>
      </Animatable.View>
    </TouchableOpacity>
  );
}
