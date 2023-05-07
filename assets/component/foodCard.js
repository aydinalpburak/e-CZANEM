import React from "react";
import { useState } from "react";
import { Image, StyleSheet, TouchableOpacity } from "react-native";
import { Text } from "react-native";
import { View } from "react-native";
import medicineCategory from "../FoodsDB/foodCategories";
import FavoriteButton from "./favoriteButton";
import { Ionicons } from "@expo/vector-icons";
import "../globals/priceBasket";

var baseUrlString = "https://drive.google.com/uc?export=view&id=";

export default function FoodCard({
  navigation,
  route,
  food,
  isSearch,
  setTotalPrice,
}) {
  food.image = baseUrlString + food?.image1;
  const [foodColor, setFoodColor] = useState(() => {
    let result = medicineCategory.filter(({ name }) => name == food.type[0])[0];
    return result != null
      ? result.color != null
        ? result.color
        : `red`
      : `pink`;
  });

  const [count, setCount] = useState(1);

  const decrementCount = () => {
    var newCount = 1;
    if (count > 1) {
      newCount = count - 1;
    } else {
      newCount = 1;
    }
    updateCountById(food.id, newCount, global.items);
    setTotalPrice(getTotalPrice);
    setCount(newCount);
  };

  const incrementCount = () => {
    const newCount = count + 1;
    updateCountById(food.id, newCount, global.items);
    setTotalPrice(getTotalPrice);
    setCount(newCount);
  };

  function updateCountById(id, count, arrGlobal) {
    for (let i = 0; i < arrGlobal.length; i++) {
      if (arrGlobal[i].id === id) {
        arrGlobal[i].count = count;
        break;
      }
    }
    // global.items.forEach((element) => {
    //   console.log(
    //     `GUNCEL DURUM ${element.id} ${element.count} ${element.price}`
    //   );
    // });
  }

  function getTotalPrice() {
    var result = 0;
    global.items.forEach((element) => {
      result = result + parseFloat(element.price) * element.count;
    });
    return result;
  }
  return (
    <View style={styles.cardWrapper}>
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.cardContainer}
        onPress={() => {
          navigation.push("FoodView", food);
        }}
      >
        <View style={styles.cardImageContainer}>
          <Image style={styles.cardImage} source={{ uri: food.image }} />
        </View>
        <View
          style={[
            styles.cardFoodColor,
            {
              borderColor: foodColor,
            },
          ]}
        ></View>
        <View style={styles.cardDetailsContainer}>
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
            {isSearch ? null : (
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginLeft: 20,
                }}
              >
                <TouchableOpacity onPress={decrementCount}>
                  <Ionicons
                    name="remove-circle-outline"
                    size={24}
                    color="black"
                  />
                </TouchableOpacity>
                <Text style={{ marginHorizontal: 10, fontSize: 16 }}>
                  {count}
                </Text>
                <TouchableOpacity onPress={incrementCount}>
                  <Ionicons name="add-circle-outline" size={24} color="black" />
                </TouchableOpacity>
              </View>
            )}
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
