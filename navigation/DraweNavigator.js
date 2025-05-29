import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeScreen from "../screens/HomeScreen/HomeScreen";
import CustomDrawerContent from "../screens/components/CustomDrawerContent";
import FavoriteTrailsScreen from "../screens/FavoriteTrailScreen/FavoriteTrailScreen";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => (
  <Drawer.Navigator
    drawerContent={(props) => <CustomDrawerContent {...props} />}
    screenOptions={{
      headerShown: false,
      drawerStyle: {
        width: 300,
        backgroundColor: "#1f2b38",
      },
      overlayColor: "rgba(0,0,0,0.5)",
      drawerType: "slide",
      drawerActiveTintColor: "#A0CFFF", 
      drawerInactiveTintColor: "#ffffff", 
      drawerLabelStyle: {
        fontSize: 16,
        fontWeight: "500",
      },
    }}
  >
    <Drawer.Screen name="Home" component={HomeScreen} />
    <Drawer.Screen name="Your Favorites!" component={FavoriteTrailsScreen} />
  </Drawer.Navigator>
);

export default DrawerNavigator;
