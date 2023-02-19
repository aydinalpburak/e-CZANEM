import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import DiscoverStack from "./DiscoverStack";
import CategoriesStack from "./CategoriesStack";
import SearchStack from "./SearchStack";
import FavoritesStack from "./FavoritesStack";
import SettingsStack from "./SettingsStack";
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
            title: "Discover",
            tabBarIcon: (props) => (
              <Icon type="ionicon" name="fast-food-outline" color={ props.color }/>
            )
          }}/>
        <Tab.Screen name="CategoriesStack" component={CategoriesStack}
          options={{
            title: "Categories",
            tabBarIcon: (props) => (
              <Icon type="material-icons" name="restaurant" color={ props.color }/>
            )
          }}/>
        <Tab.Screen name="SearchStack" component={SearchStack}
          options={{
            title: "Search",
            tabBarIcon: (props) => (
              <Icon type="material-icons" name="search" color={ props.color }/>
            )
          }}/>
        <Tab.Screen name="FavoritesStack" component={SettingsStack}
          options={{
            title: "Sepet",
            tabBarIcon: (props) => (
              <Icon type="material-icons" name="favorite-outline" color={ props.color }/>
            )
          }}/>
        <Tab.Screen name="SettingsStack" component={SettingsStack}
          options={{
            title: "Settings",
            tabBarIcon: (props) => (
              <Icon type="material-icons" name="settings" color={ props.color }/>
            )
          }}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
}