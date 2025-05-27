import React, { useRef, useState } from "react";
import {
  View,
  Button,
  FlatList,
  Text,
  ActivityIndicator,
  ImageBackground,
} from "react-native";
import { useAuth } from "../../context/AuthContext";
import UploadTrailSection from "./UploadTrailSection/UploadTrailSection";
import TrailCard from "./AllTrailsSection/utils/TrailCard";
import styles from "./styles";
import { SafeAreaView } from "react-native-safe-area-context";
import { getAllTrails } from "./TrailsApi/api";
import * as Animatable from "react-native-animatable";
import AllTrails from "./AllTrailsSection/AllTrails";

const backgroundImage = require("../../assets/homescreen/homescreen-background.png");

export default function HomeScreen() {
  const { logout, user } = useAuth();
  const welcomeRef = useRef(null);

  const [trails, setTrails] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);


  const handleNewTrail = (trail) => {
    setTrails((prev) => {
      const alreadyExists = prev.some((t) => t.id === trail.id);
      if (alreadyExists) return prev;
      return [trail, ...prev];
    });
  };

  const loadMore = async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    try {
      const data = await getAllTrails(page);
      setTrails((prev) => [...prev, ...data.content]);
      setPage((prev) => prev + 1);
      setHasMore(!data.last);
    } catch (err) {
      console.error("Failed to load trails");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ImageBackground
      source={backgroundImage}
      style={styles.background}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.overlay} edges={["left", "right"]}>
        <AllTrails
          user={user}
          trails={trails}
          setTrails={setTrails}
          page={page}
          setPage={setPage}
          hasMore={hasMore}
          setHasMore={setHasMore}
          loading={loading}
          setLoading={setLoading}
          onNewTrail={handleNewTrail}
        />
      </SafeAreaView>
    </ImageBackground>
  );
}
