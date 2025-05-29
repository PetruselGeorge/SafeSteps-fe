import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { PaperProvider } from "react-native-paper";
import { AuthProvider } from "./context/AuthContext";
import AppNavigator from "./navigation/AppNavigator";
import { navigationRef } from "./navigation/NavigationService";
import { FavoritesProvider } from "./context/FavoriteContext";

const App = () => {
  return (
    <PaperProvider>
      <SafeAreaProvider>
        <NavigationContainer ref={navigationRef}>
          <AuthProvider>
            <FavoritesProvider>
              <AppNavigator />
            </FavoritesProvider>
          </AuthProvider>
        </NavigationContainer>
      </SafeAreaProvider>
    </PaperProvider>
  );
};

export default App;
