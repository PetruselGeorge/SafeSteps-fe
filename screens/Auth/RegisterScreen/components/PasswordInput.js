import { View, TextInput, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "../RegisterScreenStepOne/styles";

const PasswordInput = ({
  value,
  onChangeText,
  showPassword,
  toggleVisibility,
  placeholder,
  onFocus,
  onBlur,
  autofillHints = {},
  passwordError,
}) => (
  <View style={[styles.passwordContainer, passwordError && styles.errorBorder]}>
    <Ionicons
      name="lock-closed-outline"
      size={20}
      color="white"
      style={styles.icon}
    />

    <TextInput
      style={styles.passwordInput}
      secureTextEntry={!showPassword}
      textContentType="newPassword"
      autoComplete="password-new"
      placeholder={placeholder}
      placeholderTextColor="white"
      value={value}
      onChangeText={onChangeText}
      onFocus={onFocus}
      onBlur={onBlur}
      {...autofillHints}
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

export default PasswordInput;
