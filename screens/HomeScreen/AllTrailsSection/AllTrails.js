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
    const currentPage = typeof pageToLoad === "number" ? pageToLoad : 0;

    if (loading || !hasMore) return;
    setLoading(true);

    const fetchFunction = isSearching
      ? () =>
          searchTrailsWithFilters(
            debouncedQuery.trim(),
            maxDistance,
            difficulty,
            currentPage
          )
      : () => getAllTrails(currentPage);

    try {
      const data = await fetchFunction();

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
          const retryData = await fetchFunction();

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
          console.error("[Retry] Error fetching trails:", finalErr);
        } finally {
          setLoading(false);
        }
      }, 1000);
      return;
    }

    setLoading(false);
  };

  useEffect(() => {
    const search = async () => {
      if (!debouncedQuery.trim() && !difficulty && !maxDistance) {
        setIsSearching(false);
        setPage(0);
        setTrails([]);
        setHasMore(true);
        loadMore(0);
        return;
      }

      setIsSearching(true);
      setLoading(true);

      try {
        const result = await searchTrailsWithFilters(
          debouncedQuery.trim(),
          maxDistance,
          difficulty,
          0
        );
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
