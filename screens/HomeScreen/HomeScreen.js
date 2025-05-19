import React from "react";
import { Text } from "react-native";
import * as Animatable from "react-native-animatable";

const HomeScreen = () => {
  return (
    <Animatable.View animation="fadeIn" duration={1000}>
      <Text>HomeScreen</Text>
    </Animatable.View>
  );
};

export default HomeScreen;
