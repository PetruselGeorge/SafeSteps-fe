import React, { useState, useEffect, useCallback } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Snackbar } from "react-native-paper";
import { Country, City } from "country-state-city";
import RegistrationScreenTwoContent from "./RegistrationScreenTwoContent";
import Loader from "../../../utils/Loader/Loader";
import { registerUser } from "../AuthApi/api";
const RegistrationScreenTwo = () => {
  const navigation = useNavigation();
  const { params } = useRoute();

  const [sending, setSending] = useState(false);
  const [loading, setLoading] = useState(true);
  const [countryOpen, setCountryOpen] = useState(false);
  const [cityOpen, setCityOpen] = useState(false);
  const [countryItems, setCountryItems] = useState([]);
  const [cityItems, setCityItems] = useState([]);
  const [filteredCities, setFilteredCities] = useState([]);
  const [citySearch, setCitySearch] = useState("");
  const [loadingCities, setLoadingCities] = useState(false);
  const [formData, setFormData] = useState({
    ...params,
    address: "",
    country: "",
    city: "",
    packageType: "BASIC",
  });
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const validCountries = Country.getAllCountries().filter((country) => {
          const cities = City.getCitiesOfCountry(country.isoCode);
          return cities && cities.length > 0;
        });

        const countryData = validCountries.map((c) => ({
          label: c.name,
          value: c.isoCode,
          key: c.isoCode,
        }));

        setCountryItems(countryData);
      } catch (error) {
        console.error("Failed to load countries:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  const createCityItem = (cityName) => ({
    label: cityName,
    value: cityName,
    key: cityName,
  });

  const loadCities = useCallback((countryCode) => {
    setLoadingCities(true);

    const allCitiesData = City.getCitiesOfCountry(countryCode);

    const uniqueCityNames = Array.from(
      new Set(allCitiesData.map((city) => city.name))
    ).sort();

    const allCityItems = uniqueCityNames.map((cityName) =>
      createCityItem(cityName)
    );

    setCityItems(allCityItems);
    setFilteredCities(allCityItems);
    setLoadingCities(false);
  }, []);

  const onCountryChange = useCallback(
    (countryCode) => {
      setFormData((prev) => ({ ...prev, country: countryCode, city: "" }));
      setCitySearch(""); // Resetează căutarea
      loadCities(countryCode);
    },
    [loadCities]
  );

  const onCitySearch = (text) => {
    setCitySearch(text);
    if (text.length >= 3) {
      const filtered = cityItems.filter((city) =>
        city.label.toLowerCase().startsWith(text.toLowerCase())
      );
      setFilteredCities(filtered);
    } else {
      setFilteredCities([]);
    }
  };

  const onCityChange = (cityName) => {
    setFormData((prev) => ({ ...prev, city: cityName }));
    setCitySearch(cityName);
    setFilteredCities([]);
  };

  const onChange = (field, value) =>
    setFormData((prev) => ({ ...prev, [field]: value }));

  const saveUser = async (payload) => {
    try {
      setSending(true);
      const response = await registerUser(payload);
      console.log("User registered:", response);
      navigation.reset({ index: 0, routes: [{ name: "RegisterSuccess" }] });
    } catch (err) {
      console.error("Failed to save user:", err);
      setSnack({ visible: true, msg: err.message || "Server error" });
    } finally {
      setSending(false);
    }
  };

  const toDash = (v) => (v.trim() === "" ? "-" : v.trim());

  const onFinish = () =>
    saveUser({
      ...formData,
      address: toDash(formData.address),
      city: toDash(formData.city),
      country: toDash(formData.country),
    });

  const handleBack = () => navigation.goBack();

  const [snack, setSnack] = useState({ visible: false, msg: "" });

  if (loading || sending) {
    return <Loader />;
  }

  return (
    <SafeAreaView style={{ flex: 1 }} edges={["left", "right"]}>
      <RegistrationScreenTwoContent
        formData={formData}
        onChange={onChange}
        onFinish={onFinish}
        onBack={handleBack}
        canFinish={true}
        countryValue={formData.country}
        cityValue={formData.city}
        countryItems={countryItems}
        cityItems={filteredCities}
        onCountryChange={onCountryChange}
        onCityChange={onCityChange}
        citySearch={citySearch}
        onCitySearch={onCitySearch}
        countryOpen={countryOpen}
        setCountryOpen={setCountryOpen}
        cityOpen={cityOpen}
        setCityOpen={setCityOpen}
        loadingCities={loadingCities}
      />
    </SafeAreaView>
  );
};

export default RegistrationScreenTwo;
