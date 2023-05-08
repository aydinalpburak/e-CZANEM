import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Image,
  Alert,
  ScrollView,
  StyleSheet,
} from "react-native";
import { TextInput } from "react-native";
import paymentImage from "../assets/payment.png";
import { Picker } from "@react-native-picker/picker";

export default function PaymentPage({ navigation, route }) {
  const [isPaymentSuccessModalVisible, setIsPaymentSuccessModalVisible] =
    useState(false);
  const [isPaymentAtDoor, setIsPaymentAtDoor] = useState(false);
  const [cardNumber, setCardNumber] = useState("");
  const [cvv, setCvv] = useState("");
  const [expiryMonth, setExpiryMonth] = useState("");
  const [expiryYear, setExpiryYear] = useState("");
  const [params, setParams] = useState(route.params);

  const [months, setMonths] = useState([
    "Ay Seçin",
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
  ]);

  <Picker
    selectedValue={expiryMonth}
    onValueChange={(itemValue) => setExpiryMonth(itemValue)}
  >
    {months.map((month, index) => {
      return <Picker.Item key={index} label={month} value={month} />;
    })}
  </Picker>;
  const currentYear = new Date().getFullYear();
  const [years, setYears] = useState([
    "Yıl Seçin",
    Array.from(Array(10), (_, i) => (currentYear + i).toString()),
  ]);

  <Picker
    selectedValue={expiryYear}
    onValueChange={(itemValue) => setExpiryYear(itemValue)}
  >
    {years.map((year, index) => {
      return <Picker.Item key={index} label={year} value={year} />;
    })}
  </Picker>;
  const handleExpiryDateChange = () => {
    setExpiryDate(`${expiryMonth}/${expiryYear}`);
  };

  const handleCardNumberChange = (text) => {
    // Remove any non-numeric characters from the input
    const formattedText = text.replace(/[^0-9]/g, "");

    // Limit the input to 16 characters
    if (formattedText.length <= 16) {
      setCardNumber(formattedText);
    }
  };
  function handleCreditCardPayment() {
    // Credit Card payment handling code goes here
    if (cardNumber && cvv && cardNumber.length == 16 && cvv.length == 3) {
      setIsPaymentSuccessModalVisible(true);
      console.log(
        `Card Number: ${cardNumber}, Expiry Month: ${expiryMonth}, Expiry Year: ${expiryYear}, CVV: ${cvv}`
      );
    } else {
      // One or more fields are empty, show an error message
      Alert.alert("Hata!", "Lütfen tüm alanları eksiksiz doldurunuz!", [
        {
          text: "Tekrar Dene",
          onPress: () => console.log("Kart bilgileri girme tekrar denendi!"),
        },
      ]);
    }
  }

  function handlePaymentAtDoorClick() {
    setIsPaymentAtDoor(true);
    setIsPaymentSuccessModalVisible(true);
  }

  function renderPaymentSuccessModal() {
    return (
      <Modal
        visible={isPaymentSuccessModalVisible}
        transparent={true}
        animationType="fade"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Ödeme Yöntemi Seçme Başarılı!</Text>
            {isPaymentAtDoor ? (
              <Text style={styles.modalText}>
                Seçilen Ödeme Yöntemi: Kapıda Ödeme.
              </Text>
            ) : (
              <Text style={styles.modalText}>
                Seçilen Ödeme Yöntemi: Kart ile Ödeme.
              </Text>
            )}
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setIsPaymentSuccessModalVisible(false)}
            >
              <Text style={styles.modalButtonText}>Tamam</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.paymentOptionContainer}>
        <TouchableOpacity
          style={[
            styles.paymentOptionButton,
            isPaymentAtDoor && styles.activePaymentOptionButton,
          ]}
          onPress={handlePaymentAtDoorClick}
        >
          <Text
            style={[
              styles.paymentOptionButtonText,
              isPaymentAtDoor && styles.activePaymentOptionButtonText,
            ]}
          >
            Kapıda Ödeme
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.paymentOptionButton,
            !isPaymentAtDoor && styles.activePaymentOptionButton,
          ]}
          onPress={() => setIsPaymentAtDoor(false)}
        >
          <Text
            style={[
              styles.paymentOptionButtonText,
              !isPaymentAtDoor && styles.activePaymentOptionButtonText,
            ]}
          >
            Kart ile Ödeme
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.expiryPickerContainer}></View>

      {!isPaymentAtDoor && (
        <View style={styles.creditCardFormContainer}>
          <TextInput
            style={styles.creditCardInput}
            placeholder="Kart Numarası*"
            keyboardType="numeric"
            maxLength={16}
            value={cardNumber}
            onChangeText={handleCardNumberChange}
          />
          <TextInput
            style={styles.creditCardInput}
            placeholder="Güvenlik Kodu (CVV)*"
            keyboardType="numeric"
            //textContentType="numeric"
            maxLength={3}
            value={cvv}
            onChangeText={(text) => setCvv(text)}
            secureTextEntry={true}
          />
          <Text style={styles.pickerText}>Son Kullanma Tarihini Giriniz</Text>
          <Text style={styles.pickerText}>Ay: </Text>
          <Picker
            selectedValue={expiryMonth}
            style={styles.expiryPickerContainer}
            onValueChange={(itemValue, itemIndex) => setExpiryMonth(itemValue)}
          >
            <Picker.Item label="01" value="01" />
            <Picker.Item label="02" value="02" />
            <Picker.Item label="03" value="03" />
            <Picker.Item label="04" value="04" />
            <Picker.Item label="05" value="05" />
            <Picker.Item label="06" value="06" />
            <Picker.Item label="07" value="07" />
            <Picker.Item label="08" value="08" />
            <Picker.Item label="09" value="09" />
            <Picker.Item label="10" value="10" />
            <Picker.Item label="11" value="11" />
            <Picker.Item label="12" value="12" />
          </Picker>
          <Text style={styles.pickerText}>Yıl: </Text>
          <Picker
            selectedValue={expiryYear}
            style={styles.expiryPicker}
            onValueChange={(itemValue, itemIndex) => setExpiryYear(itemValue)}
          >
            <Picker.Item label="2023" value="2023" />
            <Picker.Item label="2024" value="2024" />
            <Picker.Item label="2025" value="2025" />
            <Picker.Item label="2026" value="2026" />
            <Picker.Item label="2027" value="2027" />
            <Picker.Item label="2028" value="2028" />
            <Picker.Item label="2029" value="2029" />
            <Picker.Item label="2030" value="2030" />
          </Picker>
          <TouchableOpacity
            style={styles.creditCardPaymentButton}
            onPress={handleCreditCardPayment}
          >
            <Text style={styles.creditCardPaymentButtonText}>
              Ödemeyi tamamla
            </Text>
          </TouchableOpacity>
        </View>
      )}
      {renderPaymentSuccessModal()}
      <View style={styles.paymentImageContainer}>
        <Image source={paymentImage} style={styles.paymentImage} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
    backgroundColor: "#fff",
  },
  pickerText: {
    color: "#8e8e8e",
    marginLeft: 10,
    marginBottom: 10,
  },
  picker: {
    flex: 1,
    color: "#8e8e8e",
    marginLeft: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 5,
    marginBottom: 10,
    color: "#145369",
  },
  paymentOptionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  paymentOptionButton: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    width: "48%",
  },
  activePaymentOptionButton: {
    backgroundColor: "#6a5acd",
    borderColor: "#6a5acd",
  },
  paymentOptionButtonText: {
    color: "#000",
    textAlign: "center",
  },
  activePaymentOptionButtonText: {
    color: "#fff",
  },
  creditCardFormContainer: {
    marginBottom: 20,
  },
  creditCardInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  creditCardPaymentButton: {
    backgroundColor: "#6a5acd",
    borderRadius: 5,
    padding: 10,
    width: "100%",
  },
  creditCardPaymentButtonText: {
    color: "#fff",
    textAlign: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 5,
    padding: 20,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalText: {
    marginBottom: 10,
  },
  modalButton: {
    backgroundColor: "#6a5acd",
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
  },
  modalButtonText: {
    color: "#fff",
    textAlign: "center",
  },
  paymentImageContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: 20,
  },
  paymentImage: {
    width: "100%",
    height: 150,
  },
});
