import { useState } from "react";
import { TextInput, View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  FadeIn,
  FadeOut,
} from "react-native-reanimated";
import styles from "./styles";

export default function SearchBar({
  query,
  setQuery,
  difficulty,
  setDifficulty,
  maxDistance,
  setMaxDistance,
}) {
  const scale = useSharedValue(1);
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const [showFilters, setShowFilters] = useState(false);

  const handleFocus = () => {
    scale.value = withTiming(1.03, { duration: 150 });
  };

  const handleBlur = () => {
    scale.value = withTiming(1, { duration: 150 });
  };

  return (
    <View>
      <Animated.View style={[styles.wrapper, animatedStyle]}>
        <Ionicons name="search" size={20} color="#ccc" style={styles.icon} />
        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder="Search trails..."
          placeholderTextColor="#aaa"
          style={styles.input}
          returnKeyType="search"
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        <TouchableOpacity
          onPress={() => setShowFilters((prev) => !prev)}
          style={styles.filterButton}
        >
          <Ionicons name="options-outline" size={22} color="#ccc" />
        </TouchableOpacity>
      </Animated.View>

      {showFilters && (
        <Animated.View
          entering={FadeIn.duration(250)}
          exiting={FadeOut.duration(200)}
          style={styles.filterContainer}
        >
          <Text style={styles.filterLabel}>Difficulty</Text>
          {["", "Easy", "Moderate", "Hard"].map((level) => (
            <TouchableOpacity
              key={level}
              onPress={() => setDifficulty(level)}
              style={[
                styles.filterOption,
                difficulty === level && styles.activeFilterOption,
              ]}
            >
              <Text style={styles.filterOptionText}>
                {level === "" ? "Any" : level}
              </Text>
            </TouchableOpacity>
          ))}

          <Text style={styles.filterLabel}>Max Distance</Text>
          {[
            { label: "Any", value: "" },
            { label: "max 10 km", value: "10" },
            { label: "max 30 km", value: "30" },
            { label: "max 100 km", value: "100" },
          ].map(({ label, value }) => (
            <TouchableOpacity
              key={value}
              onPress={() => setMaxDistance(value)}
              style={[
                styles.filterOption,
                maxDistance === value && styles.activeFilterOption,
              ]}
            >
              <Text style={styles.filterOptionText}>{label}</Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity
            onPress={() => {
              setDifficulty("");
              setMaxDistance("");
            }}
            style={styles.resetButton}
          >
            <Text style={styles.resetButtonText}>Reset Filters</Text>
          </TouchableOpacity>
        </Animated.View>
      )}
    </View>
  );
}
