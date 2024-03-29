import React from "react";
import { useState, useEffect } from 'react';
import { TouchableOpacity } from "react-native";
import { Image, StyleSheet, Text, View } from "react-native";


var baseUrlString = 'https://drive.google.com/uc?export=view&id='; 

export default function HorizontalCard({ navigation, route, food, color }) {

  //food.image = '1xtCGKsOA_DzHIuz36DQh034St6av3cUS';
  return(
    <View style={ styles.cardWrapper }>
      <TouchableOpacity activeOpacity={ 0.6 } style={ styles.cardContainer } onPress={() => navigation.push("FoodView", food)}>
        <View style={ styles.foodImageContainer }>
          <Image source={{uri:baseUrlString+food.image1}} style={ styles.foodImage }/>
        </View>
        <View style={ styles.cardDeco1 }></View>
        <View
          style={[
            styles.cardDeco2,
            {
              backgroundColor: color,
            }
          ]}
        ></View>
        <View style={ styles.foodDetailsContainer }>
          <View style={ styles.foodDetails }>
            <Text style={{ fontWeight: "600", fontSize: 16, color: '#222' }}>{food.name}</Text>
            <Text style={{ fontStyle: "italic", fontSize: 12, marginTop: -2, color: "#444" }}>{ food.tagalog }</Text>
            <Text style={{ fontStyle: "italic", fontSize: 12, marginTop: -2, color: "#444" , marginTop:5}}>{`${food.price} TL`}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  cardWrapper: {
    padding: 8,
    paddingVertical: 4
  },
  cardContainer: {
    backgroundColor: "white",
    borderRadius: 8,
    overflow: "hidden",
    elevation: 2,
  },
  foodImageContainer: {
    width: 174,
    height: 72,
    backgroundColor: "#808080",
  },
  foodImage: {
    height: "100%",
    width: "100%",
    resizeMode: "cover"
  },
  foodDetailsContainer: {
  },
  cardDeco1: {
    position: "absolute",
    aspectRatio: 1,
    height: 48,
    backgroundColor: "#00000008",
    borderRadius: 100,
    right: -24,
    bottom: -24,
  },
  cardDeco2: {
    position: "absolute",
    height: 24,
    aspectRatio: 1,
    right: -12,
    bottom: -12,
    borderRadius: 100,
    elevation: 2,
  },
  foodDetails: {
    padding: 4,
    paddingHorizontal: 6,
    paddingBottom: 8,
  },
});