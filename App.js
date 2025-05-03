import WelcomeScreen from "./screens/WelcomeScreen/WelcomeScreen";
import RegistrationScreenOne from "./screens/RegisterScreen/RegisterScreenStepOne/RegistrationScreenOne";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import RegistrationScreenTwo from "./screens/RegisterScreen/RegisterScreenStepTwo/RegistrationScreenTwo";

const Stack = createNativeStackNavigator();

const App = () => (
  <NavigationContainer>
    <SafeAreaProvider>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
        <Stack.Screen
          name="RegistrationScreenOne"
          component={RegistrationScreenOne}
        />
        <Stack.Screen
          name="RegistrationScreenTwo"
          component={RegistrationScreenTwo}
        />
      </Stack.Navigator>
    </SafeAreaProvider>
  </NavigationContainer>
);

export default App;
