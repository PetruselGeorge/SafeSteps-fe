import { Alert, TouchableOpacity, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { uploadTrailImage } from "../TrailInfoApi/api";
import styles from "../styles";

export default function ImageUploader({ trailId, galleryRef }) {
  const pickAndUploadImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        quality: 0.7,
        allowsEditing: true,
      });

      if (!result.canceled && result.assets.length > 0) {
        const image = result.assets[0];
        const formData = new FormData();
        formData.append("image", {
          uri: image.uri,
          type: "image/*",
          name: "trail_image.jpg",
        });

        const res = await uploadTrailImage(trailId, formData);
        if (res.ok) {
          Alert.alert("Success", "Image uploaded successfully!");
          galleryRef.current?.refreshImages();
        } else {
          Alert.alert("Error", "Upload failed.");
        }
      }
    } catch (error) {
      console.error("Upload error", error);
      Alert.alert("Error", "Could not upload image.");
    }
  };

  return (
    <TouchableOpacity style={styles.addImageButton} onPress={pickAndUploadImage}>
      <Ionicons name="image-outline" size={20} color="#A0CFFF" />
      <Text style={styles.addImageText}>Add Image</Text>
    </TouchableOpacity>
  );
}
