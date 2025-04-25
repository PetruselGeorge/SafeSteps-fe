import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
      flex: 1,
    },
    image: {
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: 'center',
      paddingTop: 130,
    },
    overlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: 'rgba(255, 149, 100, 0.07)',
    },
    text: {
      fontSize: 32,
      fontWeight: 'bold',
      color: 'white',
      zIndex: 1,
    },
    header: {
      fontSize: 48,
      fontWeight: 'bold',
      textAlign: 'center',
      marginTop: 60,
      color: 'white',
    },
    div: {
      textAlign: 'center',
      marginTop: 20,
      color: 'white',
      marginHorizontal: 50,
      fontSize: 24,
    },
    pinpointImage: {
      position: 'absolute',
      top: 60,
      width: 80,
      height: 80,
      zIndex: 10,
    },
    benefitContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 50,
      marginHorizontal: 30,
    },
    benefitItem: {
      alignItems: 'center',
      flex: 1,
      marginHorizontal: 10,
    },
    benefitImage: {
      width: 90,
      height: 80,
    },
    benefitText: {
      color: 'white',
      textAlign: 'center',
      fontSize: 16,
      marginTop: 8,
    },
    button: {
      backgroundColor: 'rgb(28, 125, 186)',
      paddingVertical: 20,
      paddingHorizontal: 90,
      borderRadius: 30,
      marginTop: 40,
      alignSelf: 'center',
      zIndex: 2,
    },
    buttonText: {
      color: '#fff',
      fontSize: 22,
      fontWeight: 'bold',
    },
    signUp: {
      marginTop: 40,
      fontSize: 15,
      color: 'white',
    },
  });