import React from "react";
import { View, Text } from "react-native";
import styles from "../RegisterScreenStepOne/styles";

const PasswordValidationView = ({ validation }) => (
    <View style={styles.validationBox}>
      <Text style={{ color: validation.length ? 'green' : 'red' }}>
        • At least 8 characters
      </Text>
      <Text style={{ color: validation.hasNumber ? 'green' : 'red' }}>
        • At least one number
      </Text>
      <Text style={{ color: validation.hasSpecialChar ? 'green' : 'red' }}>
        • At least one special character
      </Text>
      <Text style={{ color: validation.hasUpperLetter ? 'green' : 'red' }}>
        • At least one uppercase letter
      </Text>
    </View>
  );
export default PasswordValidationView;
