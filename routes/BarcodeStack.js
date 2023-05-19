import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Search from "../screens/Search";
import FoodView from "../screens/FoodView";
import FoodCategory from "../screens/FoodCategory";
import Barcode from "../screens/Barcode";

const Stack = createNativeStackNavigator();

const BarcodeStack = () => (
  <Stack.Navigator
    initialRouteName="Barcode"
    screenOptions = {{
      headerShown: true,
      headerTitleStyle: {
        fontWeight: "bold",
        textTransform: 'uppercase',
        color: '#444',
      },
    }}
  >
    <Stack.Screen
      name="Barcode"
      options={({ navigation, route }) => ({
        title: "Receteli Ürün Satışı",
      })}
    >
      {(props) => <Barcode {...props}/>}
    </Stack.Screen>

    <Stack.Screen
      name="FoodView"
      options={({navigation, route}) => ({
        title: "Food View",
        animation: "slide_from_bottom",
      })}
    >
      {(props) => <FoodView {...props}/>}
    </Stack.Screen>

    <Stack.Screen
      name='FoodCategory'
      options={({ navigation, route }) => ({
        title: 'Food Category',
        animation: "slide_from_right",
      })}
    >
      {(props) => <FoodCategory {...props}/>}
    </Stack.Screen>
    
  </Stack.Navigator>
);

export default BarcodeStack;