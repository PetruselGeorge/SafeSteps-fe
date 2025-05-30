import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Animated,
  TouchableOpacity,
  ActivityIndicator,
  Text,
  Alert,
  Image,
} from "react-native";
import { getTrailImages, fetchTrailImageAsBase64 } from "../TrailInfoApi/api";
import styles, { CARD_WIDTH } from "./styles";

export default function TrailImageGallery({ trailId }) {
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const opacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const loadImages = async () => {
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

    loadImages();
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

  const goToNext = () => {
    if (images.length > 0) {
      const next = (currentIndex + 1) % images.length;
      animateImageChange(next);
    }
  };

  const goToPrev = () => {
    if (images.length > 0) {
      const prev = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
      animateImageChange(prev);
    }
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
      <Animated.Image
        source={{ uri: images[currentIndex].uri }}
        style={[
          styles.image,
          {
            opacity: opacity,
          },
        ]}
      />

      <View style={styles.controls}>
        <TouchableOpacity onPress={goToPrev} style={styles.button}>
          <Text style={styles.buttonText}>◀</Text>
        </TouchableOpacity>
        <Text style={styles.indexText}>
          {currentIndex + 1} / {images.length}
        </Text>
        <TouchableOpacity onPress={goToNext} style={styles.button}>
          <Text style={styles.buttonText}>▶</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
