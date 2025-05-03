import { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import RegistrationScreenOneContent from "./RegistrationScreenOneContent";
import { useNavigation } from "@react-navigation/native";
import Loader from "../../../utils/Loader/Loader";

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

  const validatePassword = (password) => {
    setPasswordValidation({
      length: password.length >= 8,
      hasNumber: /\d/.test(password),
      hasSpecialChar: /[!@#$%^&*(),.?\":{}|<>]/.test(password),
      hasUpperLetter: /[A-Z]/.test(password),
    });
  };

  const validateEmail = (email) => {
    setEmailValidation({
      isEmail: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email),
    });
  };

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });

    if (field === "password" || field === "confirmPassword") {
      validatePassword(value);
    }
    if (field === "email") {
      validateEmail(value);
    }
  };

  const isValid =
    formData.firstName.trim().length > 1 &&
    /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email) &&
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
      />
    </SafeAreaView>
  );
};

export default RegistrationScreenOne;
