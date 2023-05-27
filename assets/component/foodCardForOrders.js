import React from "react";
import { useState } from "react";
import { Image, StyleSheet, TouchableOpacity } from "react-native";
import { Text } from "react-native";
import { View } from "react-native";
import medicineCategory from "../FoodsDB/foodCategories";
import { Ionicons } from "@expo/vector-icons";
import "../globals/priceBasket";

var baseUrlString = "https://drive.google.com/uc?export=view&id=";

export default function FoodCardForOrders({ navigation, route, params }) {
  const [food, setFood] = useState(params.medicines);
  const [count, setCount] = useState(params.count);
  const [pharmacyId, setPharmacyId] = useState(params.pharmacyid);

  const backgroundColor = food.isreceteli === "true" ? "#F38E78" : "white";
  food.image = baseUrlString + food?.image1;
  const [medicineColor, setMedicineColor] = useState(() => {
    let result = medicineCategory.filter(({ name }) => name == food.type[0])[0];
    return result != null
      ? result.color != null
        ? result.color
        : `red`
      : `pink`;
  });

  return (
    <View style={styles.cardWrapper}>
      <TouchableOpacity activeOpacity={0.8} style={styles.cardContainer}>
        <View style={styles.cardImageContainer}>
          <Image style={styles.cardImage} source={{ uri: food.image }} />
        </View>
        <View
          style={[
            styles.cardFoodColor,
            {
              borderColor: medicineColor,
            },
          ]}
        ></View>
        <View style={[styles.cardDetailsContainer, { backgroundColor }]}>
          <Text style={{ color: "#333", fontWeight: "bold", fontSize: 16 }}>
            {food.name}
          </Text>
          <Text
            style={{
              color: "#444",
              fontStyle: "italic",
              fontSize: 12,
              marginTop: -4,
            }}
          >
            {food.tagalog}
          </Text>
          <View style={styles.foodTypeContainer}>
            <View style={styles.foodType}>
              <Text style={styles.foodTypeLabel}>{food.type[0]}</Text>
            </View>
            {food.type.length > 1 ? (
              <Text style={styles.foodTypesLabel}>+{food.type.length - 1}</Text>
            ) : null}

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginLeft: 20,
              }}
            >
              <Text style={styles.foodTypesLabel}>
                Adet: {count}
              </Text>
            </View>
          </View>
          <Text
            style={[styles.foodTypeLabel, { marginTop: 5 }]}
          >{`${food.price} TL`}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  cardWrapper: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  cardContainer: {
    height: 96,
    backgroundColor: "white",
    flexDirection: "row",
    elevation: 2,
    overflow: "hidden",
    borderRadius: 8,
    alignItems: "center",
    flex: 1,
    // borderWidth: 1,
    // borderColor: '#2221',
    // shadowColor: '#0008',
  },
  cardImageContainer: {
    height: 96,
    aspectRatio: 5 / 4,
    borderRadius: 8,
    overflow: "hidden",
  },
  cardImage: {
    height: "100%",
    width: "100%",
    resizeMode: "cover",
  },
  cardFoodColor: {
    position: "absolute",
    height: "100%",
    width: "100%",
    borderRightWidth: 3,
  },
  cardDetailsContainer: {
    //todo kontrol
    paddingVertical: 4,
    paddingHorizontal: 8,
    height: "100%",
    flex: 1,
  },
  foodTypeContainer: {
    flexDirection: "row",
    marginTop: 8,
    alignItems: "center",
  },
  foodType: {
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 2,
    borderRadius: 6,
    borderColor: "#888",
  },
  foodTypeLabel: {
    fontSize: 10,
    color: "#888",
    fontWeight: "bold",
  },
  foodTypesLabel: {
    fontSize: 8,
    color: "#888",
    fontWeight: "bold",
    aspectRatio: 1,
    padding: 4,
    borderWidth: 1,
    borderRadius: 100,
    borderColor: "#888",
    marginLeft: 6,
  },
  favButtonContainer: {
    padding: 8,
  },
});
