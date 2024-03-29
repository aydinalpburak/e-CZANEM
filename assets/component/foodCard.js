import React from "react";
import { useState, useEffect } from "react";
import { Alert, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Text } from "react-native";
import { View } from "react-native";
import medicineCategory from "../FoodsDB/foodCategories";
import { Ionicons } from "@expo/vector-icons";
import "../globals/priceBasket";
import getRequest from "../component/getRequest";

var baseUrlString = "https://drive.google.com/uc?export=view&id=";

export default function FoodCard({
  navigation,
  route,
  food,
  isSearch,
  setTotalPrice,
}) {
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

  const [count, setCount] = useState(1);
  const [maxCount, setMaxCount] = useState(250000);

  const fetchMaxCount = async (_pharmacyId, _foodid) => {
    let url =
      "http://eczanev2-dev.eu-central-1.elasticbeanstalk.com/api/getMaxStock?pharmacyid=" +
      _pharmacyId +
      "&foodid=" +
      _foodid;
    const getOrders = await getRequest(url);
    if (getOrders) {
      setMaxCount(getOrders);
      return getOrders;
    }
  };


  const decrementCount = () => {
    if (food.isreceteli === "true"){
      return;
    }
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

  const incrementCount = async ()  => {
    if (food.isreceteli === "true"){
      return;
    }
    for (let i = 0; i < global.items.length; i++) {
      if ( global.items[i].id === food.id) {
        await fetchMaxCount(global.items[i].pharmacyid,global.items[i].id).catch((error) => {
          alert(error);
        });
        break;
      }
    }
    var newCount = count + 1;
    if (newCount <= maxCount) {
      updateCountById(food.id, newCount, global.items);
      setTotalPrice(getTotalPrice);
      setCount(newCount);
    } else {
      newCount = newCount -1;
      Alert.alert("Uyarı !", "Stok Yetersiz.", [{ text: 'Tamam' }]);
    }
  };

  function updateCountById(id, count, arrGlobal) {
    for (let i = 0; i < arrGlobal.length; i++) {
      if (arrGlobal[i].id === id) {
        arrGlobal[i].count = count;
        break;
      }
    }
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
                    color="red"
                  />
                </TouchableOpacity>
                <Text style={{ marginHorizontal: 10, fontSize: 16 }}>
                  {count}
                </Text>
                <TouchableOpacity onPress={incrementCount}>
                  <Ionicons name="add-circle-outline" size={32} color="green" />
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
