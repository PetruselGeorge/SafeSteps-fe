import { useEffect } from "react";
import { SafeAreaView, Text } from "react-native";
import LottieView from "lottie-react-native";
import { useNavigation } from "@react-navigation/native";
import { successStyles as styles } from "./styles";
import AsyncStorage from "@react-native-async-storage/async-storage";

const RegisterSuccess = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const setRegisterFlag = async () => {
      await AsyncStorage.setItem("isNewUser", "true");
    };

    setRegisterFlag();

    const timeout = setTimeout(() => {
      navigation.reset({
        index: 0,
        routes: [{ name: "LoginScreen" }],
      });
    }, 2000);

    return () => clearTimeout(timeout);
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <LottieView
        source={require("../../../assets/animations/safesteps_success.json")}
        autoPlay
        loop={false}
        style={styles.animation}
      />
      <Text style={styles.title}>Success!</Text>
      <Text style={styles.message}>Your account has been created.</Text>
    </SafeAreaView>
  );
};

export default RegisterSuccess;
