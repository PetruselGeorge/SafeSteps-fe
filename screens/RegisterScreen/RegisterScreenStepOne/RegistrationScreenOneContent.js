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
import ConfirmPasswordInput from "../components/ConfirmPasswordInput";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import PasswordStrengthBar from "../components/PasswordStrenghtBar";
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
  autofillHints,
  passwordStrength,
  suggestions,
  emailTaken,
  emailError,
  passwordError,
  confirmPwError,
  touched,
}) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="handled"
        style={styles.container}
        extraScrollHeight={20}
      >
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
              style={styles.inputFieldName}
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
              style={styles.inputFieldName}
              placeholder="Last Name"
              placeholderTextColor="white"
              value={formData.lastName}
              onChangeText={(text) => onChange("lastName", text)}
            />
          </View>

          <View
            style={[styles.inputWithIcon, emailError && styles.errorBorder]}
          >
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

          {touched.email && focusedField === "email" && (
            <View style={styles.validationBox}>
              {!emailValidation.isEmail ? (
                <Text style={{ color: "red" }}>Invalid e-mail format</Text>
              ) : emailTaken ? (
                <Text style={{ color: "red" }}>E-mail already in use</Text>
              ) : (
                <Text style={{ color: "green" }}>E-mail is available</Text>
              )}
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
            placeholder="password"
            onFocus={() => setFocusedField("password")}
            onBlur={() => setFocusedField(null)}
            autofillHints={autofillHints}
            passwordError={passwordError}
          />

          {touched.password && focusedField === "password" && (
            <>
              <PasswordStrengthBar strength={passwordStrength} />

              {passwordStrength !== "Very Strong" && suggestions.length > 0 && (
                <View style={styles.validationBox}>
                  {suggestions.map((s, i) => (
                    <Text key={i} style={{ color: "red" }}>
                      {s}
                    </Text>
                  ))}
                </View>
              )}
            </>
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
            placeholder="confirm password"
            autofillHints={autofillHints}
            confirmPwError={confirmPwError}
          />

          {touched.confirmPassword && focusedField === "confirmPassword" && (
            <ConfirmPasswordFeedback
              visible={true}
              password={formData.password}
              confirmPassword={formData.confirmPassword}
            />
          )}

          <TouchableOpacity
            style={[styles.button, !isValid && styles.buttonDisabled]}
            onPress={onNext}
            disabled={!isValid}
          >
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </KeyboardAvoidingView>
  );
};

export default RegistrationScreenOneContent;
