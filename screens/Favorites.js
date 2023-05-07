import React from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { FlatList, TouchableOpacity } from "react-native";
import { StyleSheet } from "react-native";
import { Text } from "react-native";
import { View } from "react-native";
import { Icon } from "react-native-elements";
import FoodCard from "../assets/component/foodCard";
import window from "../assets/controller/window";
import AppContext from "../assets/globals/appContext";
import globalStyles from "../assets/styles/globalStyles";

export default function Favorites({ navigation, route }) {
  const favorites = useContext(AppContext);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    get2globalArray(favorites.foods);
    //getTotalPrice(favorites.foods); //favorilerin toplami kadar olmasi kadar...
  }, [favorites.foods]);

  useEffect(() => {
    setTotalPrice(getTotalPrice);
  }, []);

 

  function get2globalArray(favorites) {
    // console.log(`Tetiklendi`);
    // global.items.forEach((element) => {
    //   console.log(`GUNCEL DURUM ${element.id} ${element.count} ${element.price}`);
    // });
    //console.log(`---------------------------------------------------`);
    for (let i = 0; i < favorites.length; i++) {
      let newProduct = {
        id: favorites[i].id,
        price: favorites[i].price,
        count: 1,
      };
      let isFound = false;
      global.items.forEach((element) => {
        if (element.id == newProduct.id) {
          isFound = true;
        }
      });
      if (!isFound) {
        global.items.push(newProduct);
        // console.log(
        //   `Eklendi ${newProduct.id} ${newProduct.count} ${newProduct.price}`
        // );
        setTotalPrice(getTotalPrice);
      }
    }
    compareArraysAndDelete(favorites,global.items);
  }

  function compareArraysAndDelete(arr1, arr2) {
    arr2.forEach((item, i) => {
      if (!arr1.some((el) => el.id === item.id)) {
        console.log(`Silindi ${item.id} ${item.price} ${item.count}`);
        setTotalPrice(getTotalPrice);
        arr2.splice(i, 1);
      }
    });
  }
  
  function getTotalPrice() {
    var result = 0;
    global.items.forEach(element => {
      result = result + (parseFloat(element.price) * element.count);
    });
    return result;
  }

  return (
    <View style={globalStyles.screen}>
      <View>
        {favorites?.foods.length <= 0 ? (
          <View style={styles.emptyContainer}>
            <Icon
              type="ionicon"
              name="basket-outline" //todo degisecek logo
              size={window.width / 3 > 240 ? 240 : window.width / 3}
              color="#bbb"
            />
            <View style={styles.emptyLabelContainer}>
              <Text style={styles.emptyLabel}>Henüz Ürün Eklenmedi</Text>
              <Text style={styles.emptyLabelDetails}>
                Sepetinizde ürün bulunmuyor. Lütfen devam edebilmek için ürün
                ekleyin.
              </Text>
            </View>
          </View>
        ) : (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={favorites.foods}
            ListHeaderComponent={() => (
              <View
                style={{
                  height: 12,
                }}
              ></View>
            )}
            ListFooterComponent={() => (
              <View
                style={{
                  height: 12,
                }}
              ></View>
            )}
            renderItem={({ item }) => (
              <FoodCard
                navigation={navigation}
                route={route}
                food={item}
                isSearch={false}
                setTotalPrice={setTotalPrice}
              />
            )}
          />
        )}
      </View>
      <TouchableOpacity
        style={styles.card}
        onPress={() => {
          console.log("Butona Basildi - Adress Sayfasina Geciliyor");
          navigation.push("AdressForm");
        }}
      >
        <Text style={{ fontWeight: "bold", color: "white" }}>
          Toplam Fiyat:
        </Text>
        <Text style={{ fontWeight: "bold", color: "black", marginLeft: 5 }}>
          {(Math.round(totalPrice * 100) / 100).toFixed(2)}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  emptyContainer: {
    padding: 32,
    height: window.height / 3 + 16,
    maxHeight: 480,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  emptyLabelContainer: {
    marginVertical: 4,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyLabel: {
    fontSize: window.width / 20 > 32 ? 32 : window.width / 20,
    fontWeight: "bold",
    color: "#888",
  },
  emptyLabelDetails: {
    textAlign: "center",
    marginVertical: 8,
    color: "#aaa",
    fontSize: window.width / 32 > 24 ? 24 : window.width / 32,
    width: window.width / 1.5,
    maxWidth: 480,
  },
  card: {
    backgroundColor: "#197A6C",
    borderRadius: 10,
    padding: 10,
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
    flexDirection: "row",
  },
});
