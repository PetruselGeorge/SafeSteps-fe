import React, { useState, useEffect } from 'react';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { Asset } from 'expo-asset';
import Loader from '../../utils/Loader/Loader';
import WelcomeContent from './WelcomeContent';

const backgroundImage = require('../../assets/homepage/homepage-background.png');
const pinpointImage = require('../../assets/homepage/homepage-pinpoint.png');
const compassImage = require('../../assets/homepage/homepage-compass.png');
const safetyImage = require('../../assets/homepage/homepage-safety.png');
const cupImage = require('../../assets/homepage/homepage-cup.png');

const WelcomeScreen = () => {
  const [assetsLoaded, setAssetsLoaded] = useState(false);

  useEffect(() => {
    const loadAssets = async () => {
      await Asset.loadAsync([
        backgroundImage,
        pinpointImage,
        compassImage,
        safetyImage,
        cupImage,
      ]);
      setAssetsLoaded(true);
    };

    loadAssets();
  }, []);

  if (!assetsLoaded) {
    return <Loader />;
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{flex:1}} edges={['left', 'right']}>
        <WelcomeContent 
        backgroundImage={backgroundImage}
        pinpointImage={pinpointImage}
        compassImage={compassImage}
        safetyImage={safetyImage}
        cupImage={cupImage}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};



export default WelcomeScreen;
