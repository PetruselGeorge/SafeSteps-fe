import React from "react";
import {
  View,
  ImageBackground,
  ActivityIndicator,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../../context/AuthContext";
import { useFavorites } from "../../context/FavoriteContext";
import styles from "./styles";
import FavoriteTrailsContent from "./FavoriteTrailContent";

const backgroundImage = require("../../assets/homescreen/homescreen-background.png");

export default function FavoriteTrailsScreen() {
  const { user } = useAuth();
  const navigation = useNavigation();
  const {
    favoriteTrails,
    refreshFavorites,
    removeFromFavorites,
    loadingFavorites,
  } = useFavorites();

  useFocusEffect(
    React.useCallback(() => {
      refreshFavorites();
    }, [refreshFavorites])
  );

  return (
    <ImageBackground
      source={backgroundImage}
      style={styles.background}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.overlay} edges={["left", "right"]}>
        <TouchableOpacity
          onPress={() => navigation.openDrawer()}
          style={styles.menuButton}
        >
          <Ionicons name="menu" size={28} color="#fff" />
        </TouchableOpacity>

        {loadingFavorites ? (
          <ActivityIndicator size="large" color="#A0CFFF" />
        ) : (
          <FavoriteTrailsContent
            trails={favoriteTrails}
            onRemove={removeFromFavorites}
            refreshing={loadingFavorites}
            onRefresh={refreshFavorites}
          />
        )}
      </SafeAreaView>
    </ImageBackground>
  );
}