import styles from "./styles";
import {
  FlatList,
  Text,
  View,
  ActivityIndicator,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../../../context/AuthContext";

export default function AllTrailsContent({
  trails,
  loadMore,
  loading,
  handleUpdateImage,
}) {
  const { user } = useAuth();

  const renderFooter = () => {
    if (!loading) return null;
    return <ActivityIndicator style={styles.loadingIndicator} />;
  };

  const renderItem = ({ item }) => {
    const imageUri = item.localMainImage
      ? { uri: item.localMainImage }
      : item.mainImageBase64
      ? { uri: `data:image/jpeg;base64,${item.mainImageBase64}` }
      : require("../../../assets/trails/default-trail.png");
      
    console.log("Rendering trails:", trails);

    return (
      <View style={styles.card}>
        <ImageBackground
          source={imageUri}
          style={styles.imageBackground}
          imageStyle={styles.imageStyle}
        >
          <View style={styles.overlay}>
            <Text style={styles.trailName}>{item.name}</Text>
            <Text style={styles.trailInfo}>Distance: {item.distanceKm} km</Text>
            <Text style={styles.trailInfo}>Difficulty: {item.difficulty}</Text>
          </View>

          {user?.role === "ROLE_ADMIN" && (
            <TouchableOpacity
              style={styles.editIcon}
              onPress={() => handleUpdateImage(item.id)}
            >
              <Ionicons name="camera" size={20} color="#A0CFFF" />
            </TouchableOpacity>
          )}
        </ImageBackground>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>All Trails</Text>
      <FlatList
        data={trails}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        onEndReached={() => loadMore()}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.flatListContent}
      />
    </View>
  );
}
