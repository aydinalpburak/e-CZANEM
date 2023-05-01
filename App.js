import React from "react";
import LoginMainScreen from "./loginProject/loginMainScreen";
import { NavigationContainer } from "@react-navigation/native";
import AddressForm from "./screens/AdressForm";

//-------Login Icin Gerekli Olanlar----------------

export default function App() {
  //       <BottomNavigator />  eklenicek ama nasil bakalim...
  //<AppContext.Provider value={favorites} >

  //</AppContext.Provider>
  return (
    //<HelloWorldApp></HelloWorldApp>
    // <NavigationContainer>
    //   <LoginMainScreen />
    // </NavigationContainer>
    <AddressForm></AddressForm>
  );
}
