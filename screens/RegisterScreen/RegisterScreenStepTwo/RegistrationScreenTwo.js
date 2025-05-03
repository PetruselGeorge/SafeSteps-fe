import { useNavigation, useRoute } from "@react-navigation/native";
import { useState } from "react";

const RegistrationScreenTwo = () => {
  const params = useRoute();
  const navigation = useNavigation();

  const [formData, setFormData] = useState({
    ...params,
    address: '',
    city:'',
    country:'',
    packageType:'BASIC'
  });

  
};

export default RegistrationScreenTwo;
