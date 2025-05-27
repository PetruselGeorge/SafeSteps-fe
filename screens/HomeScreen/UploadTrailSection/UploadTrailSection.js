import { useState } from "react";
import * as DocumentPicker from "expo-document-picker";
import { uploadTrailGpx } from "../TrailsApi/api";
import { Alert } from "react-native";
import UploadTrailContent from "./UploadTrailContent";
export default function UploadTrailSection({ onUploadSuccess }) {

  const [selectedFile, setSelectedFile] = useState(null);

  const handleSelectAndUpload = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        copyToCacheDirectory: true,
      });

      if (result.canceled || !result.assets?.length) return;

      const file = result.assets[0];

      if (file.size && file.size > 5 * 1024 * 1024) {
        Alert.alert("File too large", "Maximum 5MB.");
        return;
      }

      if (!file.name.toLowerCase().endsWith(".gpx")) {
        Alert.alert("Invalid format", "Only .gpx files accepted.");
        return;
      }

      setSelectedFile(file.name);

      const newTrail = await uploadTrailGpx(file.uri, file.name);
      Alert.alert("Success", "Trail has been uploaded!");

      if (onUploadSuccess) {
        onUploadSuccess(newTrail);
      }
    } catch (err) {
      if (err.status === 403) {
        Alert.alert("Forbidden access");
      } else {
        Alert.alert("Error", "Failed upload");
      }
    }
  };

  return (
    <UploadTrailContent
      handleSelectAndUpload={handleSelectAndUpload}
      selectedFile={selectedFile}
    />
  );
}
