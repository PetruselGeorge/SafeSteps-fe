import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import DropDownPicker from "react-native-dropdown-picker";
import {
  KeyboardAwareFlatList,
  KeyboardAwareScrollView,
} from "react-native-keyboard-aware-scroll-view";
import styles from "./styles";
import { FlatList } from "react-native";
const RegistrationScreenTwoContent = ({
  formData,
  onChange,
  onFinish,
  onBack,
  canFinish,
  countryValue,
  cityValue,
  countryItems,
  cityItems,
  onCountryChange,
  onCityChange,
  citySearch,
  onCitySearch,
  countryOpen,
  setCountryOpen,
  cityOpen,
  setCityOpen,
  loadingCities,
}) => (
  <View
    style={{ flex: 1 }}
  >
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={onBack}>
        <Ionicons name="arrow-back" size={24} color="white" />
        <Text style={styles.backText}>Back</Text>
      </TouchableOpacity>

      <View style={styles.card}>
        <Text style={styles.title}>Complete your profile (optional)</Text>
        <DropDownPicker
          open={countryOpen}
          setOpen={(isOpen) => {
            setCountryOpen(isOpen);
            if (isOpen) setCityOpen(false);
          }}
          value={formData.country}
          setValue={(callback) => {
            const val =
              typeof callback === "function"
                ? callback(formData.country)
                : callback;
            onCountryChange(val);
            setCountryOpen(false);
          }}
          items={countryItems}
          searchable
          placeholder="Select country"
          listMode="SCROLLVIEW"
          zIndex={3000}
          zIndexInverse={1000}
          style={styles.dropContainer}
          textStyle={styles.dropText}
          placeholderStyle={styles.dropPlaceholder}
          dropDownContainerStyle={styles.dropdownItem}
          selectedItemContainerStyle={styles.dropSelectedItem}
          searchContainerStyle={styles.searchContainer}
          searchTextInputStyle={styles.searchTextInput}
        />

        <View style={styles.flInputContainer}>
          <TextInput
            placeholder="Search city (min 3 characters)"
            value={citySearch}
            onChangeText={onCitySearch}
            placeholderTextColor="#E9C46A"
            style={styles.flInputField}
          />
          {cityItems.length > 0 && (
            <FlatList
              data={cityItems}
              keyExtractor={(item) => item.key}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => onCityChange(item.label)}
                  style={styles.flListItem}
                >
                  <Text style={styles.flListItemText}>{item.label}</Text>
                </TouchableOpacity>
              )}
              style={styles.flListContainer}
            />
          )}
        </View>

        <View style={styles.inputWithIcon}>
          <Ionicons
            name="home-outline"
            size={20}
            color="white"
            style={styles.icon}
          />
          <TextInput
            style={styles.inputField}
            placeholder="Address"
            placeholderTextColor="white"
            value={formData.address}
            onChangeText={(t) => onChange("address", t)}
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={onFinish}>
          <Text style={styles.buttonText}>Finish</Text>
        </TouchableOpacity>
      </View>
    </View>
  </View>
);

export default RegistrationScreenTwoContent;
