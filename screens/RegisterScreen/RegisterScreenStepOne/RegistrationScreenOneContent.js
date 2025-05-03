import styles from "./styles";
import {
  View,
  TouchableOpacity,
  Text,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import ConfirmPasswordFeedback from "../components/ConfirmPasswordFeedback";
import PasswordInput from "../components/PasswordInput";
import PasswordValidationView from "../components/PasswordValidationFeedback";
import ConfirmPasswordInput from "../components/ConfirmPasswordInput";

const RegistrationScreenOneContent = ({
  formData,
  onChange,
  showPassword,
  setShowPassword,
  showConfirmPassword,
  setShowConfirmPassword,
  isValid,
  onNext,
  onBack,
  focusedField,
  setFocusedField,
  passwordValidation,
  emailValidation,
}) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView keyboardShouldPersistTaps="handled" style={styles.container}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Ionicons name="arrow-back" size={24} color="white" />
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>
        <View style={styles.card}>
          <Text style={styles.title}>Create your account</Text>

          <View style={styles.inputWithIcon}>
            <Ionicons
              name="person-outline"
              size={20}
              color="white"
              style={styles.icon}
            />
            <TextInput
              style={styles.inputField}
              placeholder="First Name"
              placeholderTextColor="white"
              value={formData.firstName}
              onChangeText={(text) => onChange("firstName", text)}
            />
          </View>

          <View style={styles.inputWithIcon}>
            <Ionicons
              name="person-outline"
              size={20}
              color="white"
              style={styles.icon}
            />
            <TextInput
              style={styles.inputField}
              placeholder="Last Name"
              placeholderTextColor="white"
              value={formData.lastName}
              onChangeText={(text) => onChange("lastName", text)}
            />
          </View>

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
              onChangeText={(text) => onChange("email", text)}
              onFocus={() => setFocusedField("email")}
              onBlur={() => setFocusedField(null)}
            />
          </View>

          {focusedField === "email" && (
            <View style={styles.validationBox}>
              <Text
                style={{ color: emailValidation.isEmail ? "green" : "red" }}
              >
                Valid email address.
              </Text>
            </View>
          )}

          <PasswordInput
            value={formData.password}
            onChangeText={(text) => {
              if (text.length > formData.password.length + 3) {
                setShowPassword(false);
                setTimeout(() => {
                  setShowPassword(true);
                }, 10);
              }
              onChange("password", text);
            }}
            showPassword={showPassword}
            toggleVisibility={() => setShowPassword(!showPassword)}
            placeholder="Password"
            onFocus={() => setFocusedField("password")}
            onBlur={() => setFocusedField(null)}
          />

          {focusedField === "password" && (
            <PasswordValidationView validation={passwordValidation} />
          )}

          <ConfirmPasswordInput
            value={formData.confirmPassword}
            onChangeText={(text) => onChange("confirmPassword", text)}
            showPassword={showConfirmPassword}
            toggleVisibility={() =>
              setShowConfirmPassword(!showConfirmPassword)
            }
            onFocus={() => setFocusedField("confirmPassword")}
            onBlur={() => setFocusedField(null)}
          />

          <ConfirmPasswordFeedback
            visible={focusedField === "confirmPassword"}
            password={formData.password}
            confirmPassword={formData.confirmPassword}
          />

          <TouchableOpacity
            style={[styles.button, !isValid && styles.buttonDisabled]}
            onPress={onNext}
            disabled={!isValid}
          >
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default RegistrationScreenOneContent;
