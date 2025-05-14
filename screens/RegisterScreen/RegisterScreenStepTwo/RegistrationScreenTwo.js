import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRoute } from "@react-navigation/native";
import RegistrationScreenTwoContent from "./RegistrationScreenTwoContent";
import Loader from "../../../utils/Loader/Loader";
import { registerUser } from "../AuthApi/api";
import { Snackbar } from "react-native-paper";
const RegistrationScreenTwo = () => {
  const { params } = useRoute();
  const navigation = useNavigation();

  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    ...params,
    address: "",
    city: "",
    country: "",
    packageType: "BASIC",
  });

  const [snack, setSnack] = useState({ visible: false, msg: "" });
  const showSnack = (msg) => setSnack({ visible: true, msg });

  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 400);
    return () => clearTimeout(t);
  }, []);

  const onChange = (field, value) =>
    setFormData({ ...formData, [field]: value });

  const finishRegistration = async (data) => {
    try {
      await registerUser(data);
      navigation.reset({ index: 0, routes: [{ name: "RegisterSuccess" }] });
    } catch (err) {
      showSnack(err.message || "Server error");
    }
  };

  const onFinish = () => finishRegistration(formData);

  const onSkip = () =>
    finishRegistration({
      ...formData,
      address: "-",
      city: "-",
      country: "-",
    });

  const handleBack = () => {
    navigation.goBack();
  };
  return isLoading ? (
    <Loader />
  ) : (
    <SafeAreaView style={{ flex: 1 }} edges={["left", "right"]}>
      <RegistrationScreenTwoContent
        formData={formData}
        onChange={onChange}
        onFinish={onFinish}
        onSkip={onSkip}
        onBack={handleBack}
      />
      <Snackbar
        visible={snack.visible}
        style={{ backgroundColor: "#ff3333" }}
        theme={{ colors: { inverseOnSurface: "#fff" } }}
        onDismiss={() => setSnack({ ...snack, visible: false })}
        duration={2500}
        action={{ label: "OK", onPress: () => {} }}
      >
        {snack.msg}
      </Snackbar>
    </SafeAreaView>
  );
};

export default RegistrationScreenTwo;
