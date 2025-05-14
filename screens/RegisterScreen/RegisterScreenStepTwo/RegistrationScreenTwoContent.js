// RegistrationScreenTwoContent.js
import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from "react-native";
import styles from "./styles";
import { Ionicons } from "@expo/vector-icons";

const RegistrationScreenTwoContent = ({
  formData,
  onChange,
  onFinish,
  onSkip,
  onBack,
}) => (
  <KeyboardAvoidingView
    behavior={Platform.OS === "ios" ? "padding" : "height"}
    style={{ flex: 1 }}
  >
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      <TouchableOpacity style={styles.backButton} onPress={onBack}>
        <Ionicons name="arrow-back" size={24} color="white" />
        <Text style={styles.backText}>Back</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Complete your profile (optional)</Text>

      <TextInput
        style={styles.input}
        placeholder="Address"
        placeholderTextColor="white"
        value={formData.address}
        onChangeText={(t) => onChange("address", t)}
      />

      <TextInput
        style={styles.input}
        placeholder="City"
        placeholderTextColor="white"
        value={formData.city}
        onChangeText={(t) => onChange("city", t)}
      />

      <TextInput
        style={styles.input}
        placeholder="Country"
        placeholderTextColor="white"
        value={formData.country}
        onChangeText={(t) => onChange("country", t)}
      />

      <TouchableOpacity style={styles.button} onPress={onFinish}>
        <Text style={styles.buttonText}>Finish</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={onSkip}>
        <Text style={styles.skipText}>Skip for now</Text>
      </TouchableOpacity>
    </ScrollView>
  </KeyboardAvoidingView>
);

export default RegistrationScreenTwoContent;
