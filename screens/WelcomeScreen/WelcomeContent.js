import React from 'react';
import {
    ImageBackground,
    Text,
    View,
    TouchableOpacity,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';

const WelcomeContent = ({ backgroundImage, pinpointImage, compassImage, safetyImage, cupImage }) => {
    const navigation = useNavigation();

    return (
        <ImageBackground
            source={backgroundImage}
            resizeMode="cover"
            style={styles.image}
            blurRadius={1}
        >
            <Animatable.Image
                animation="bounceIn"
                delay={300}
                duration={1200}
                source={pinpointImage}
                style={styles.pinpointImage}
            />

            <View style={styles.overlay} />

            <Animatable.Text animation="fadeInDown" delay={500} style={styles.text}>
                SafeSteps
            </Animatable.Text>

            <Animatable.Text animation="fadeInUp" delay={800} style={styles.header}>
                Explore with safety.
            </Animatable.Text>

            <Animatable.Text animation="fadeInUp" delay={1000} style={styles.div}>
                Discover trails, receive alerts in real time and earn rewards with each step.
            </Animatable.Text>

            <Animatable.View animation="fadeInUp" delay={1300} style={styles.benefitContainer}>
                <View style={styles.benefitItem}>
                    <ImageBackground source={compassImage} style={styles.benefitImage} />
                    <Text style={styles.benefitText}>Personalized Trails</Text>
                </View>

                <View style={styles.benefitItem}>
                    <ImageBackground source={safetyImage} style={styles.benefitImage} />
                    <Text style={styles.benefitText}>Safety Alerts</Text>
                </View>

                <View style={styles.benefitItem}>
                    <ImageBackground source={cupImage} style={styles.benefitImage} />
                    <Text style={styles.benefitText}>Game Mode</Text>
                </View>
            </Animatable.View>

            <Animatable.View animation="fadeIn" delay={1600}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('RegisterScreen')}
                >
                    <Text style={styles.buttonText}>Let's begin!</Text>
                </TouchableOpacity>
            </Animatable.View>

            <TouchableOpacity>
                <Animatable.Text animation="fadeIn" delay={2000} style={styles.signUp}>
                    Already have an account? Sign up!
                </Animatable.Text>
            </TouchableOpacity>
        </ImageBackground>
    );
};

export default WelcomeContent;
