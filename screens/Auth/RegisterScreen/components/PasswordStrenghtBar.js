import React from "react";
import { View, Text } from "react-native";
import styles from "../RegisterScreenStepOne/styles";

const barWidth = {
  "Too Weak": 0,
  Weak: 25,
  Moderate: 50,
  Strong: 75,
  "Very Strong": 100,
};
const barColor = {
  "Too Weak": "red",
  Weak: "orange",
  Moderate: "yellow",
  Strong: "green",
  "Very Strong": "limegreen",
};

const PasswordStrengthBar = ({ strength }) => (
  <View style={styles.strengthWrapper}>
    <Text style={styles.strengthText}>Password strength: {strength}</Text>

    <View style={styles.strengthTrack}>
      <View style={styles.strengthBar(strength)} />
    </View>
  </View>
);
export default PasswordStrengthBar;
