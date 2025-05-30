import styles from "./styles";
import { FlatList, Text, View, ActivityIndicator } from "react-native";
import TrailCard from "./utils/TrailCard";
import { useRef } from "react";
import UploadTrailSection from "../UploadTrailSection/UploadTrailSection";
export default function AllTrailsContent({
  trails,
  loadMore,
  loading,
  handleUpdateImage,
  user,
  onUploadSuccess,
  favoriteIds,
  toggleFavorite,
}) {
  const debounceTimeout = useRef(null);

  const renderHeader = () => (
    <View>
      {user?.role === "ROLE_ADMIN" && (
        <UploadTrailSection onUploadSuccess={onUploadSuccess} />
      )}
    </View>
  );

  const renderItem = ({ item }) => (
    <TrailCard
      item={item}
      handleUpdateImage={handleUpdateImage}
      isFavorite={favoriteIds.includes(item.id)}
      toggleFavorite={toggleFavorite}
    />
  );

  const renderFooter = () =>
    loading ? <ActivityIndicator style={styles.loadingIndicator} /> : null;

  return (
    <View style={styles.container}>
      <FlatList
        data={trails}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        onEndReached={() => {
          if (debounceTimeout.current) return;
          debounceTimeout.current = setTimeout(() => {
            loadMore();
            debounceTimeout.current = null;
          }, 100);
        }}
        onEndReachedThreshold={0.5}
        ListHeaderComponent={renderHeader}
        ListFooterComponent={renderFooter}
        contentContainerStyle={styles.flatListContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}
