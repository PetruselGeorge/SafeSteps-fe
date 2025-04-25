
import styles from "./styles";
import { View, TouchableOpacity, Text, TextInput } from "react-native";
import { Ionicons } from '@expo/vector-icons';

const RegistrationScreenOneContent = ({
    formData,
    onChange,
    showPassword,
    setShowPassword,
    isValid,
    onNext,
    onBack,
    focusedField,
    setFocusedField,
    passwordValidation,
    emailValidation

}) => {
    return (
        <View style={styles.container}>
            <View style={styles.overlay} />
            
            <TouchableOpacity style={styles.backButton} onPress={onBack}>
                <Ionicons name="arrow-back" size={24} color="white" />
                <Text style={styles.backText}>Back</Text>
            </TouchableOpacity>

            <Text style={styles.title}>Create your account</Text>

            <TextInput
                style={styles.nameInput}
                placeholder="Fist Name"
                value={formData.firstName}

                onChangeText={(text) => onChange('firstName', text)}
            />

            <TextInput
                style={styles.nameInput}
                placeholder="Last Name"
                value={formData.lastName}
                onChangeText={(text) => onChange('lastName', text)}
            />

            <TextInput
                style={styles.input}
                placeholder="Email"
                keyboardType="email-address"
                autoCapitalize="none"
                value={formData.email}
                onChangeText={(text) => onChange('email', text)}
                onFocus={() => setFocusedField('email')}
                onBlur={() => {
                    setFocusedField(null);
                }}
            />
            {
                focusedField === 'email' && (
                    <View style={styles.validationBox}>
                        <Text style={{ color: emailValidation.isEmail ? 'green' : 'red' }}>
                            Valid email address.
                        </Text>
                    </View>
                )
            }

            <View style={styles.passwordContainer}>
                <TextInput
                    style={styles.passwordInput}
                    textContentType="newPassword"
                    autoComplete="new-password"
                    placeholder="Password"
                    secureTextEntry={!showPassword}
                    value={formData.password}
                    onChangeText={(text) => onChange('password', text)}
                    onFocus={() => setFocusedField('password')}
                    onBlur={() => {
                        setFocusedField(null);
                    }}
                />

                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                    <Ionicons
                        name={showPassword ? 'eye-off' : 'eye'}
                        size={24}
                        color="gray"
                    />
                </TouchableOpacity>
            </View>

            {focusedField === 'password' && (
                <View style={styles.validationBox}>
                    <Text style={{ color: passwordValidation.length ? 'green' : 'red' }}>
                        • At least 8 characters
                    </Text>
                    <Text style={{ color: passwordValidation.hasNumber ? 'green' : 'red' }}>
                        • At least one number
                    </Text>
                    <Text style={{ color: passwordValidation.hasSpecialChar ? 'green' : 'red' }}>
                        • At least one special character
                    </Text>
                    <Text style={{ color: passwordValidation.hasUpperLetter ? 'green' : 'red' }}>
                        • At least one uppercase letter
                    </Text>
                </View>
            )}

            <View style={styles.passwordContainer}>
                <TextInput
                    textContentType="password"
                    autoComplete="password"
                    style={styles.passwordInput}
                    placeholder="Confirm Password"
                    secureTextEntry={!showPassword}
                    value={formData.confirmPassword}
                    onChangeText={(text) => onChange('confirmPassword', text)}
                    onFocus={() => setFocusedField('confirmPassword')}
                    onBlur={() => setFocusedField(null)}
                />

                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                    <Ionicons
                        name={showPassword ? 'eye-off' : 'eye'}
                        size={24}
                        color="gray"
                    />
                </TouchableOpacity>
            </View>

            {focusedField === 'confirmPassword' && formData.confirmPassword.length > 0 && (
                <View style={styles.validationBox}>
                    <Text style={{
                        color:
                            formData.confirmPassword === formData.password ? 'green' : 'red',
                    }}>
                        {formData.confirmPassword === formData.password
                            ? '• Passwords match'
                            : '• Passwords do not match'}
                    </Text>
                </View>
            )}

            <TouchableOpacity
                style={[styles.button, !isValid && styles.buttonDisabled]}
                onPress={onNext}
                disabled={!isValid}
            >
                <Text style={styles.buttonText}>Next</Text>
            </TouchableOpacity>
        </View>
    );
};

export default RegistrationScreenOneContent;