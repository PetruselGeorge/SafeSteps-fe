import {
  useEffect,
  useRef,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";
import {
  View,
  Animated,
  TouchableOpacity,
  ActivityIndicator,
  Text,
  Alert,
} from "react-native";
import {
  getTrailImages,
  fetchTrailImageAsBase64,
  deleteTrailImage,
} from "../TrailInfoApi/api";
import styles from "./styles";
import { useAuth } from "../../../context/AuthContext";
import { Ionicons } from "@expo/vector-icons";

const TrailImageGallery = forwardRef(({ trailId }, ref) => {
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const opacity = useRef(new Animated.Value(1)).current;
  const { user } = useAuth();

  const fetchAndSetImages = async () => {
    try {
      const imageDtos = await getTrailImages(trailId);
      const imagesWithData = await Promise.all(
        imageDtos.map(async (img) => {
          const base64 = await fetchTrailImageAsBase64(trailId, img.id);
          return { id: img.id, uri: base64 };
        })
      );
      setImages(imagesWithData);
    } catch (err) {
      Alert.alert("Error", "Could not load trail images.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useImperativeHandle(ref, () => ({
    refreshImages: fetchAndSetImages,
  }));

  useEffect(() => {
    fetchAndSetImages();
  }, [trailId]);

  useEffect(() => {
    if (images.length === 0) return;

    const interval = setInterval(() => {
      const next = (currentIndex + 1) % images.length;
      animateImageChange(next);
    }, 3000);

    return () => clearInterval(interval);
  }, [currentIndex, images]);

  const animateImageChange = (nextIndex) => {
    opacity.setValue(1);

    Animated.timing(opacity, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setCurrentIndex(nextIndex);
      opacity.setValue(0);
      Animated.timing(opacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    });
  };

  const deleteImageHandler = async () => {
    const image = images[currentIndex];
    if (!image) return;

    Alert.alert("Delete Image", "Are you sure you want to delete this image?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          try {
            await deleteTrailImage(trailId, image.id);

            const updatedImages = [...images];
            updatedImages.splice(currentIndex, 1);

            const newIndex = Math.max(0, currentIndex - 1);
            setCurrentIndex(newIndex);
            setImages(updatedImages);

            Alert.alert("Deleted", "Image was deleted successfully.");
          } catch (error) {
            console.error("Delete error", error);
            Alert.alert("Error", "Could not delete image.");
          }
        },
      },
    ]);
  };

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#A0CFFF" />
      </View>
    );
  }

  if (images.length === 0) {
    return <Text style={styles.noImagesText}>No images available.</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.imageWrapper}>
        <Animated.Image
          source={{ uri: images[currentIndex].uri }}
          style={[styles.image, { opacity }]}
        />

        {user?.role === "ROLE_ADMIN" && (
          <TouchableOpacity
            onPress={deleteImageHandler}
            style={styles.deleteOverlayButton}
          >
            <Ionicons name="trash-outline" size={22} color="#FF6B6B" />
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.controls}>
        <TouchableOpacity
          onPress={() =>
            animateImageChange(
              (currentIndex - 1 + images.length) % images.length
            )
          }
          style={styles.button}
        >
          <Ionicons name="chevron-back" size={24} color="white" />
        </TouchableOpacity>

        <Text style={styles.indexText}>
          {currentIndex + 1} / {images.length}
        </Text>

        <TouchableOpacity
          onPress={() => animateImageChange((currentIndex + 1) % images.length)}
          style={styles.button}
        >
          <Ionicons name="chevron-forward" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
});

export default TrailImageGallery;
