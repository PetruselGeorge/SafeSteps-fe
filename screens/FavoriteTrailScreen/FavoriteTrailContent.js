import { FlatList } from "react-native";
import TrailCard from "../HomeScreen/AllTrailsSection/utils/TrailCard";
import styles from "./styles";

export default function FavoriteTrailsContent({
  trails,
  onRemove,
  refreshing,
  onRefresh,
}) {
  return (
    <FlatList
      data={trails}
      keyExtractor={(item) => item.trailId}
      contentContainerStyle={styles.contentContainerStyle}
      renderItem={({ item }) => (
        <TrailCard
          item={{ ...item, id: item.trailId }}
          isFavorite={true}
          toggleFavorite={() => onRemove(item.trailId)}
          handleUpdateImage={null}
          showRemoveButton={true}
          disableFavoriteToggle={true}
        />
      )}
      refreshing={refreshing}
      onRefresh={onRefresh}
      showsVerticalScrollIndicator={false}
    />
  );
}
