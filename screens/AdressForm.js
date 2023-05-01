import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
  Dimensions,
  TouchableOpacity,
  Alert,
} from "react-native";
import Logo2PNG from "../assets/component/LogoPNG";
import CustomButton from "../assets/component/CustomButton";
import * as Location from "expo-location";
import Background from "../src/components/Background";
import Popup from "../assets/component/Popup";

export default function AddressForm() {
  const [neighborhood, setNeighborhood] = useState("");
  const [street, setStreet] = useState("");
  const [buildingNumber, setBuildingNumber] = useState("");
  const [floorNumber, setFloorNumber] = useState("");
  const [doorNumber, setDoorNumber] = useState("");
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [address, setAddress] = useState([]);
  const [isVisible, setIsVisible] = useState(false);

  const openPopup = () => {
    setIsVisible(true);
  };

  const closePopup = () => {
    setIsVisible(false);
    !stringAdress(address[0]);
  };
  const errorMessage =
    "Adres Bilgisi Bulunamadı, Butona Tekrardan Basabilir Veya Eliniz İle Adres Bilgisini Girebilirsiniz.";

  const handleSubmit = () => {
    // Handle the form submission here
  };

  function stringAdress(item) {
    if (item != undefined) {
      console.log(
        `${item.district} mah. ${item.street} cd. \nNo:${item.streetNumber} ${item.subregion}/${item.region}`
      );
      setDistrict(item.subregion);
      setStreet(item.street);
      setBuildingNumber(item.streetNumber);
      setCity(item.region);
      setNeighborhood(item.district);
      //counter = 0;
      return true;
    } else {
      openPopup();
      //Alert.alert(); // todo alert olarak ekrana basilacak.
      return false;
    }
  }

  const userLocation = async () => {
    console.log("Butona Basildi, Adres bilgisi getiriliyor...");
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied.");
    }
    let location = await Location.getCurrentPositionAsync({
      enableHighAccuracy: true,
    });
    //console.log(location);
    const reverseGeocode = async () => {
      const reverseGeocodedAddress = await Location.reverseGeocodeAsync({
        longitude: location.coords.longitude,
        latitude: location.coords.latitude,
      });
      setAddress(reverseGeocodedAddress);
    };
    await reverseGeocode();
    !stringAdress(address[0]);
  };

  return (
    <Background>
      <Popup
        isVisible={isVisible}
        onClose={closePopup}
        infoMessage={errorMessage}
      />
      <Logo2PNG />
      <Text style={styles.heading}>Adres Bilgilerini Giriniz</Text>
      <CustomButton
        title={"Adres Bilgimi Getir"}
        onPress={userLocation}
      ></CustomButton>
      <TextInput
        style={styles.input}
        placeholder="Şehir"
        value={city}
        onChangeText={setCity}
      />
      <TextInput
        style={styles.input}
        placeholder="İlçe"
        value={district}
        onChangeText={setDistrict}
      />
      <TextInput
        style={styles.input}
        placeholder="Mahalle"
        value={neighborhood}
        onChangeText={setNeighborhood}
      />
      <TextInput
        style={styles.input}
        placeholder="Cadde"
        value={street}
        onChangeText={setStreet}
      />
      <TextInput
        style={styles.input}
        placeholder="Bina Numarası"
        value={buildingNumber}
        onChangeText={setBuildingNumber}
      />
      <TextInput
        style={styles.input}
        placeholder="Kat Numarası"
        value={floorNumber}
        onChangeText={setFloorNumber}
      />
      <TextInput
        style={styles.input}
        placeholder="Kapı Numarası"
        value={doorNumber}
        onChangeText={setDoorNumber}
      />

      <TouchableOpacity style={styles.card} onPress={handleSubmit}>
        <Text style={{ fontWeight: "bold", color: "white" }}>
          Ödeme Ekranına Geç
        </Text>
      </TouchableOpacity>
    </Background>
  );
}

const styles = StyleSheet.create({
  container_button: {
    position: "absolute",
    bottom: 0,
    alignItems: "center",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#197A6C",
    marginBottom: 20,
  },
  input: {
    height: 40,
    width: "80%",
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    paddingLeft: 15,
    paddingRight: 15,
    marginBottom: 20,
    shadowColor: "#000000",
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 4,
    elevation: 3,
  },
  card: {
    backgroundColor: "#197A6C",
    borderRadius: 20,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    position: "absolute",
    bottom: 5,
    left: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
  },
});
