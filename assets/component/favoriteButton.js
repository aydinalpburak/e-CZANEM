import React from "react"
import { useState } from "react";
import { useContext } from "react"
import { TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";
import AppContext from "../globals/appContext";

export default function FavoriteButton({ id, pharmacyId }){
  const favorites = useContext(AppContext); // burayi arastir bakalim

  if((favorites?.favs.find((food) => food.T1.id == id) ? true : false) == true){
    return(
      <TouchableOpacity
        activeOpacity={ 0.5 }
        onPress={ () => favorites.deleteFavorites(id, pharmacyId) }
      >
        <Icon
          type="ionicon"
          name="basket"                //favoriye eklendiginde burasi 
          color="#007A6B"
          size={ 35 }
        />
      </TouchableOpacity>
    );
  } else {
    return(
      <TouchableOpacity
        activeOpacity={ 0.5 }
        onPress={ () => favorites.addFavorites(id, pharmacyId) }
      >
        <Icon
          type="ionicon"
          name="basket-outline"    //facoriden cikarildiginida burasi
          color="black"
          size={ 35 }
        />
      </TouchableOpacity>
    );
  }
}