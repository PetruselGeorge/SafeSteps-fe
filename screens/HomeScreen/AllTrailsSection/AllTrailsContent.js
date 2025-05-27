import styles from "./styles";
import { FlatList, Text, View, ActivityIndicator } from "react-native";
import TrailCard from "./utils/TrailCard";
import * as Animatable from "react-native-animatable";
export default function AllTrailsContent({
  trails,
  loadMore,
  loading,
  handleUpdateImage,
}) {
  const renderFooter = () => {
    if (!loading) return null;
    return <ActivityIndicator style={styles.loadingIndicator} />;
  };

  const renderItem = ({ item }) => (
    <TrailCard item={item} handleUpdateImage={handleUpdateImage} />
  );

  return (
    <View style={styles.container}>
      <Animatable.Text
        animation="fadeInDown"
        duration={800}
        style={styles.sectionTitle}
      >
        All Trails
      </Animatable.Text>
      <FlatList
        data={trails}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        onEndReached={() => loadMore()}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.flatListContent}
        scrollEventThrottle={16}
        bounces={true}
        decelerationRate="fast"
      />
    </View>
  );
}
