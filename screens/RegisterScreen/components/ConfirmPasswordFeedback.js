import React from 'react';
import { View, Text } from 'react-native';
import styles from '../RegisterScreenStepOne/styles';

const ConfirmPasswordFeedback = ({ password, confirmPassword, visible }) => {
  if (!visible || confirmPassword.length === 0) return null;

  const match = password === confirmPassword;

  return (
    <View style={styles.validationBox}>
      <Text style={{ color: match ? 'green' : 'red' }}>
        {match
          ? '• Passwords match'
          : '• Passwords do not match'}
      </Text>
    </View>
  );
};

export default ConfirmPasswordFeedback;