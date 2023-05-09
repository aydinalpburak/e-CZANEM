import React from "react";
import LoginMainScreen from "./loginProject/loginMainScreen";
import { NavigationContainer } from "@react-navigation/native";
import AddressForm from "./screens/AdressForm";
import BottomNavigator from "./routes/bottomNavigation";
import OrdersScreen from "./screens/KuryeAnaEkran";
import Barcode from "./screens/Barcode";
import App2 from "./screens/Deneme";

//-------Login Icin Gerekli Olanlar----------------

export default function App() {
  //       <BottomNavigator />  eklenicek ama nasil bakalim...
  //<AppContext.Provider value={favorites} >

  //</AppContext.Provider>
  return (
    //<HelloWorldApp></HelloWorldApp>
    <NavigationContainer>
      <Barcode />
    </NavigationContainer>
    //<AddressForm></AddressForm>
  );
}
