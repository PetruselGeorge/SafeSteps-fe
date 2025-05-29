import { useEffect, useState } from "react";
import {
  getAllTrails,
  searchTrailsWithFilters,
  updateTrailMainImage,
} from "../TrailsApi/api";
import { Alert } from "react-native";
import { View } from "react-native-animatable";
import styles from "./styles";
import AllTrailsContent from "./AllTrailsContent";
import * as ImagePicker from "expo-image-picker";
import SearchBar from "./utils/SearchBar/SearchBar";
import { useDebounce } from "./utils/useDebounce";

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
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 400);
  const [isSearching, setIsSearching] = useState(false);
  const [difficulty, setDifficulty] = useState("");
  const [maxDistance, setMaxDistance] = useState("");

  useEffect(() => {
    setPage(0);
    setHasMore(true);
    setTrails([]);
    loadMore(0);
  }, []);

const loadMore = async (pageToLoad = page) => {
  if (loading || !hasMore) return;

  setLoading(true);

  const fetchFunction = isSearching
    ? () =>
        searchTrailsWithFilters(
          debouncedQuery.trim(),
          maxDistance,
          difficulty,
          pageToLoad
        )
    : () => getAllTrails(pageToLoad);

  try {
    const data = await fetchFunction();

    if (Array.isArray(data.content)) {
      setTrails((prev) => {
        const existingIds = new Set(prev.map((t) => t.id));
        const newItems = data.content.filter((t) => !existingIds.has(t.id));
        return [...prev, ...newItems];
      });

      setPage(pageToLoad + 1);
      setHasMore(!data.last);
    } else {
      throw new Error("Invalid response format");
    }
  } catch (err) {
    console.error("Load more failed:", err);
  } finally {
    setLoading(false);
  }
};

 useEffect(() => {
  const search = async () => {
    const hasQuery = debouncedQuery.trim().length > 0;
    const hasFilters = difficulty || maxDistance;

    const isNowSearching = hasQuery || hasFilters;
    setIsSearching(isNowSearching);

    setPage(0);
    setTrails([]);
    setHasMore(true);

    setLoading(true);

    try {
      const result = isNowSearching
        ? await searchTrailsWithFilters(
            debouncedQuery.trim(),
            maxDistance,
            difficulty,
            0
          )
        : await getAllTrails(0);

      setTrails(result.content || []);
      setHasMore(!result.last);
      setPage(1);
    } catch (err) {
      console.error("Search error:", err);
    } finally {
      setLoading(false);
    }
  };

  search();
}, [debouncedQuery, difficulty, maxDistance]);

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
      <SearchBar
        query={query}
        setQuery={setQuery}
        difficulty={difficulty}
        setDifficulty={setDifficulty}
        maxDistance={maxDistance}
        setMaxDistance={setMaxDistance}
      />

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
