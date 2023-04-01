import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import DiscoverStack from "./DiscoverStack";
import CategoriesStack from "./CategoriesStack";
import SearchStack from "./SearchStack";
import FavoritesStack from "./FavoritesStack";
import SettingsStack from "./SettingsStack";
import MapStack from "./MapStack";
import { Icon } from "react-native-elements";

const Tab = createBottomTabNavigator();

export default function BottomNavigator(){
  return(
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="DiscoverStack"
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: "#36C464",
          tabBarActiveBackgroundColor: "#0801",
          tabBarStyle: {
            height: 70,
          },
          tabBarItemStyle: {
            paddingVertical: 12
          },
        }}
      >
        <Tab.Screen name="DiscoverStack" component={ DiscoverStack }
          options={{
            title: "Ürünler",
            tabBarIcon: (props) => (
              <Icon type="ionicon" name="bandage-outline" color={ props.color }/>
            )
          }}/>
        <Tab.Screen name="CategoriesStack" component={CategoriesStack}
          options={{
            title: "Katagoriler",
            tabBarIcon: (props) => (
              <Icon type="ionicon" name="grid-outline" color={ props.color }/>
            )
          }}/>
        <Tab.Screen name="SearchStack" component={SearchStack}
          options={{
            title: "Arama",
            tabBarIcon: (props) => (
              <Icon type="material-icons" name="search" color={ props.color }/>
            )
          }}/>
        <Tab.Screen name="FavoritesStack" component={FavoritesStack}
          options={{
            title: "Sepet",
            tabBarIcon: (props) => (
              <Icon type="ionicon" name="basket-outline" color={ props.color }/>
            )
          }}/>
        <Tab.Screen name="MapStack" component={MapStack}
          options={{
            title: "Harita",
            tabBarIcon: (props) => (
              <Icon type="material-icons" name="map" color={ props.color }/>
            )
        }}/>
        <Tab.Screen name="SettingsStack" component={SettingsStack}
          options={{
            title: "Ayarlar",
            tabBarIcon: (props) => (
              <Icon type="material-icons" name="settings" color={ props.color }/>
            )
          }}/>          
      </Tab.Navigator>
    </NavigationContainer>
  );
}