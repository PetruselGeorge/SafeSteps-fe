import React from 'react';
import { View, } from 'react-native';
import LottieView from 'lottie-react-native';
import styles from './styles';
const Loader = () => {
  return (
    <View style={styles.container}>
      <LottieView
        source={require('../../assets/animations/safesteps_loader.json')}
        autoPlay
        loop
        style={styles.animation}
      />
    </View>
  );
};


export default Loader;
