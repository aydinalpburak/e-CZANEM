import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Favorites from "../screens/Favorites";
import FoodView from "../screens/FoodView";
import FoodCategory from "../screens/FoodCategory";
import AdressForm from "../screens/AdressForm";
import PaymentPage from "../screens/PaymentScreen";

const Stack = createNativeStackNavigator();

const FavoritesStack = () => (
  <Stack.Navigator
    initialRouteName="Favorites"
    screenOptions={{
      headerShown: true,
      headerTitleStyle: {
        fontWeight: "bold",
        textTransform: "uppercase",
        color: "#444",
      },
    }}
  >
    <Stack.Screen
      name="Favorites"
      options={({ navigation, route }) => ({
        title: "Sepet",
      })}
    >
      {(props) => <Favorites {...props} />}
    </Stack.Screen>
    <Stack.Screen
      name="FoodView"
      options={({ navigation, route }) => ({
        title: "Food View",
        animation: "slide_from_bottom",
      })}
    >
      {(props) => <FoodView {...props} />}
    </Stack.Screen>
    <Stack.Screen
      name="AdressForm"
      options={({ navigation, route }) => ({
        title: "Adres Bilgileri",
        animation: "slide_from_bottom",
      })}
    >
      {(props) => <AdressForm {...props} />}
    </Stack.Screen>
    <Stack.Screen  //todo burasi odeme ekrani olarak stack
      name="PaymentScreen"
      options={({navigation, route}) => ({
        title: "Ödeme Ekranı",
        animation: "slide_from_bottom",
      })}
    >
      {(props) => <PaymentPage {...props}/>}
    </Stack.Screen>
    <Stack.Screen
      name="FoodCategory"
      options={({ navigation, route }) => ({
        title: "Food Category",
        animation: "slide_from_right",
      })}
    >
      {(props) => <FoodCategory {...props} />}
    </Stack.Screen>
  </Stack.Navigator>
);

export default FavoritesStack;
