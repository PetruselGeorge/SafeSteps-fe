import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import styles from "./styles";

const LoginScreenContent = ({ formData, setFormData, error, onLogin }) => {
  return (
    <View
      style={{ flex: 1 }}
      e
    >
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="handled"
        style={styles.container}
        enableOnAndroid={true}
      >
        <View style={styles.card}>
          <Text style={styles.title}>Welcome Back</Text>

          <View style={styles.inputWithIcon}>
            <Ionicons
              name="mail-outline"
              size={20}
              color="white"
              style={styles.icon}
            />
            <TextInput
              style={styles.inputField}
              placeholder="Email"
              placeholderTextColor="white"
              keyboardType="email-address"
              autoCapitalize="none"
              value={formData.email}
              onChangeText={(text) =>
                setFormData((prev) => ({ ...prev, email: text }))
              }
            />
          </View>

          <View style={styles.inputWithIcon}>
            <Ionicons
              name="lock-closed-outline"
              size={20}
              color="white"
              style={styles.icon}
            />
            <TextInput
              style={styles.inputField}
              placeholder="Password"
              placeholderTextColor="white"
              secureTextEntry
              value={formData.password}
              onChangeText={(text) =>
                setFormData((prev) => ({ ...prev, password: text }))
              }
            />
          </View>

          {error !== "" && <Text style={styles.errorText}>{error}</Text>}

          <TouchableOpacity style={styles.button} onPress={onLogin}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

export default LoginScreenContent;
