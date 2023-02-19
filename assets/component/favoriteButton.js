import React from "react"
import { useState } from "react";
import { useContext } from "react"
import { TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";
import AppContext from "../globals/appContext";

export default function FavoriteButton({ id }){
  const favorites = useContext(AppContext); // burayi arastir bakalim

  if((favorites.favs.find((food) => food == id) ? true : false) == true){
    return(
      <TouchableOpacity
        activeOpacity={ 0.5 }
        onPress={ () => favorites.deleteFavorites(id) }
      >
        <Icon
          type="material-icons"
          name="favorite"                //favoriye eklendiginde burasi 
          color="red"
          size={ 40 }
        />
      </TouchableOpacity>
    );
  } else {
    return(
      <TouchableOpacity
        activeOpacity={ 0.5 }
        onPress={ () => favorites.addFavorites(id) }
      >
        <Icon
          type="material-icons"
          name="favorite-outline"  //facoriden cikarildiginida burasi
          color="blue"
          size={ 40 }
        />
      </TouchableOpacity>
    );
  }
}