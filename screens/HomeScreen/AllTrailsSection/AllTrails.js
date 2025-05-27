import { useEffect, useState } from "react";
import { getAllTrails, updateTrailMainImage } from "../TrailsApi/api";
import { Alert } from "react-native";
import { View } from "react-native-animatable";
import styles from "./styles";
import AllTrailsContent from "./AllTrailsContent";
import * as ImagePicker from "expo-image-picker";

export default function AllTrails({
  user,
  trails,
  setTrails,
  page,
  setPage,
  hasMore,
  setHasMore,
  loading,
  setLoading,
  onNewTrail,
}) {
  useEffect(() => {
    setPage(0);
    setHasMore(true);
    setTrails([]);
    loadMore(0);
  }, []);

  const loadMore = async (pageToLoad = page) => {
    const currentPage = typeof pageToLoad === "number" ? pageToLoad : 0;

    if (loading || !hasMore) return;
    setLoading(true);

    try {
      const data = await getAllTrails(currentPage);

      if (Array.isArray(data.content)) {
        setTrails((prev) => {
          const existingIds = new Set(prev.map((t) => t.id));
          const newItems = data.content.filter((t) => !existingIds.has(t.id));
          return [...prev, ...newItems];
        });

        setPage((prev) => prev + 1);
        setHasMore(!data.last);
      } else {
        throw new Error("Invalid response format");
      }
    } catch (err) {
      console.warn("First attempt failed, retrying in 1s...", err);
      setTimeout(async () => {
        try {
          const retryData = await getAllTrails(currentPage);
          if (Array.isArray(retryData.content)) {
            setTrails((prev) => {
              const existingIds = new Set(prev.map((t) => t.id));
              const newItems = retryData.content.filter(
                (t) => !existingIds.has(t.id)
              );
              return [...prev, ...newItems];
            });

            setPage((prev) => prev + 1);
            setHasMore(!retryData.last);
          } else {
            throw new Error("Invalid retry response format");
          }
        } catch (finalErr) {
          Alert.alert("Error", "Trails couldn't be loaded after retry.");
          console.error("[TrailAPI Retry] Error fetching trails:", finalErr);
        } finally {
          setLoading(false);
        }
      }, 1000);
      return;
    }

    setLoading(false);
  };

  const updateTrailImageLocally = (trailId, newImageUri) => {
    setTrails((prev) =>
      prev.map((trail) =>
        trail.id === trailId ? { ...trail, localMainImage: newImageUri } : trail
      )
    );
  };

  const handleUpdateImage = async (trailId) => {
    try {
      const permissionResult =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (!permissionResult.granted) {
        Alert.alert(
          "Permission required",
          "Access to photo gallery is needed."
        );
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsEditing: true,
        quality: 0.8,
      });

      if (result.canceled || !result.assets?.length) return;

      const file = result.assets[0];

      const updated = await updateTrailMainImage(
        trailId,
        file.uri,
        file.fileName || "main.jpg"
      );

      updateTrailImageLocally(trailId, file.uri);
      Alert.alert("Success", "Image has been updated");
    } catch (err) {
      console.error("Update image error:", err);
      Alert.alert("Error", "Can't update the image");
    }
  };

  return (
    <View style={styles.sectionWrapper}>
      <AllTrailsContent
        trails={trails}
        loadMore={loadMore}
        loading={loading}
        handleUpdateImage={handleUpdateImage}
        user={user}
        onUploadSuccess={onNewTrail}
      />
    </View>
  );
}
