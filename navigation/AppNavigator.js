import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useAuth } from "../context/AuthContext";
import WelcomeScreen from "../screens/WelcomeScreen/WelcomeScreen";
import RegistrationScreenOne from "../screens/Auth/RegisterScreen/RegisterScreenStepOne/RegistrationScreenOne";
import RegistrationScreenTwo from "../screens/Auth/RegisterScreen/RegisterScreenStepTwo/RegistrationScreenTwo";
import RegisterSuccess from "../screens/Auth/RegisterScreen/RegisterSuccess";
import LoginScreen from "../screens/Auth/LoginScreen/LoginScreen";
import HomeScreen from "../screens/HomeScreen/HomeScreen";
import Loader from "../utils/Loader/Loader";
import WelcomeBack from "../screens/Auth/WelcomeBack/WelcomeBack";

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <Loader />;
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isAuthenticated ? (
        <>
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
          <Stack.Screen name="WelcomeBack" component={WelcomeBack} />
        </>
      ) : (
        <>
          <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen
            name="RegistrationScreenOne"
            component={RegistrationScreenOne}
          />
          <Stack.Screen
            name="RegistrationScreenTwo"
            component={RegistrationScreenTwo}
          />
          <Stack.Screen name="RegisterSuccess" component={RegisterSuccess} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default AppNavigator;
