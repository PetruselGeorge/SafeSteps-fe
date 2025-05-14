import { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import RegistrationScreenOneContent from "./RegistrationScreenOneContent";
import { useNavigation } from "@react-navigation/native";
import Loader from "../../../utils/Loader/Loader";
import { Platform } from "react-native";
import { checkEmailExists } from "../AuthApi/api";
import { useCallback } from "react";
import debounce from "lodash.debounce";
const RegistrationScreenOne = () => {
  const navigation = useNavigation();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const [passwordValidation, setPasswordValidation] = useState({
    length: false,
    hasNumber: false,
    hasSpecialChar: false,
    hasUpperLetter: false,
  });

  const [passwordStrength, setPasswordStrength] = useState("Too Weak");
  const [suggestions, setSuggestions] = useState([]);

  const [emailValidation, setEmailValidation] = useState({
    isEmail: false,
  });

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [emailTaken, setEmailTaken] = useState(false);

  const [touched, setTouched] = useState({
    email: false,
    password: false,
    confirmPassword: false,
  });

  const validatePassword = (pwd) => {
    const rules = {
      length: pwd.length >= 8,
      hasNumber: /\d/.test(pwd),
      hasSpecialChar: /[^A-Za-z0-9]/.test(pwd),
      hasUpperLetter: /[A-Z]/.test(pwd),
    };
    setPasswordValidation(rules);

    const sgs = [];
    if (!rules.length) sgs.push("• At least 8 characters");
    if (!rules.hasNumber) sgs.push("• Add at least one number");
    if (!rules.hasUpperLetter) sgs.push("• Both upper & lower letters");
    if (!rules.hasSpecialChar) sgs.push("• Add a special character");
    setSuggestions(sgs);

    const fails = Object.values(rules).filter((ok) => !ok).length;
    const strength =
      fails === 0
        ? "Very Strong"
        : fails === 1
        ? "Strong"
        : fails === 2
        ? "Moderate"
        : fails === 3
        ? "Weak"
        : "Too Weak";
    setPasswordStrength(strength);
  };

  const validateEmail = (email) => {
    setEmailValidation({
      isEmail: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email),
    });
  };

  const checkEmail = useCallback(
    debounce(async (email) => {
      if (!email) {
        setEmailTaken(false);
        return;
      }

      try {
        const { exists } = await checkEmailExists(email.trim());
        setEmailTaken(exists);
      } catch (err) {
        console.warn(err);
      }
    }, 600),
    []
  );

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });

    if (!touched[field] && value.length > 0) {
      setTouched((prev) => ({ ...prev, [field]: true }));
    }

    if (field === "email") {
      validateEmail(value);
      checkEmail(value.trim());
    }

    if (field === "password" || field === "confirmPassword") {
      validatePassword(value);
    }
  };

  const isValid =
    formData.firstName.trim().length > 1 &&
    formData.lastName.trim().length > 1 &&
    /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email) &&
    !emailTaken &&
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(
      formData.password
    ) &&
    formData.password === formData.confirmPassword;

  const handleNext = () => {
    if (isValid) {
      navigation.navigate("RegistrationScreenTwo", formData);
    }
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const onChangeText = (text) => {
    if (text.length > formData.password.length + 3) {
      setShowPassword(false);
      setTimeout(() => {
        setShowPassword(true);
      }, 10);
    }
    onChange("password", text);
  };

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timeout);
  }, []);

  const autofillHints = Platform.select({
    android: { importantForAutofill: "yes" },
    default: {},
  });

  const emailError =
    (touched.email && !emailValidation.isEmail) || emailTaken;

  const passwordError = touched.password && passwordStrength !== "Very Strong";

  const confirmPwError =
    touched.confirmPassword &&
    formData.confirmPassword.length > 0 &&
    formData.confirmPassword !== formData.password;

  return isLoading ? (
    <Loader />
  ) : (
    <SafeAreaView style={{ flex: 1 }} edges={["left", "right"]}>
      <RegistrationScreenOneContent
        formData={formData}
        onChange={handleChange}
        showPassword={showPassword}
        setShowPassword={setShowPassword}
        showConfirmPassword={showConfirmPassword}
        setShowConfirmPassword={setShowConfirmPassword}
        isValid={isValid}
        onNext={handleNext}
        onBack={handleBack}
        focusedField={focusedField}
        setFocusedField={setFocusedField}
        passwordValidation={passwordValidation}
        emailValidation={emailValidation}
        onChangeText={onChangeText}
        autofillHints={autofillHints}
        passwordStrength={passwordStrength}
        suggestions={suggestions}
        emailTaken={emailTaken}
        emailError={emailError}
        passwordError={passwordError}
        confirmPwError={confirmPwError}
        touched={touched}
      />
    </SafeAreaView>
  );
};

export default RegistrationScreenOne;
