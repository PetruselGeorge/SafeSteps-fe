import React from "react";
import { View, TextInput, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "../RegisterScreenStepOne/styles";

const ConfirmPasswordInput = ({
  value,
  onChangeText,
  showPassword,
  toggleVisibility,
  onFocus,
  onBlur,
}) => {
  return (
    <View style={styles.passwordContainer}>
      <Ionicons
        name="lock-closed-outline"
        size={20}
        color={"white"}
        style={styles.icon}
      />
      <TextInput
        style={styles.passwordInput}
        secureTextEntry={!showPassword}
        textContentType="none"
        autoComplete="off"
        placeholder="Confirm Password"
        placeholderTextColor="white"
        value={value}
        onChangeText={onChangeText}
        onFocus={onFocus}
        onBlur={onBlur}
      />
      <TouchableOpacity onPress={toggleVisibility}>
        <Ionicons
          name={showPassword ? "eye-off" : "eye"}
          size={24}
          color="white"
        />
      </TouchableOpacity>
    </View>
  );
};

export default ConfirmPasswordInput;
