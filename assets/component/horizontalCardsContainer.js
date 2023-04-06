import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { StyleSheet } from "react-native";
import { FlatList } from "react-native";
import { Text, View } from "react-native";
import { discoverFoods } from "../controller/query";
import DiscoverSeeAll from "./discoverSeeAll";
import HorizontalCard from "./horizontalCards";

function shuffle(array) {
  let currentIndex = array.length,  randomIndex;

  while (currentIndex != 0) {

    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

export default function HorizontalCardsContainer({ navigation, route, foodCategory, yeni }) {

  const [foods, setFoods] = useState([]);
  const [foodsYeni, setFoodsYeni] = useState([]);
  const [discover, setDiscover] = useState([]);

  useEffect(() => {
    setFoodsYeni(yeni);
  }, [foodCategory]);

  return(
    <View style = { styles.cardsContainer }>
      <View style={ styles.cardsLabelContainer }>
        <Text style = { styles.foodCategoryName }>{ (foodCategory.name).toUpperCase() }</Text>
        {discover.length >= 5 ? (
          <DiscoverSeeAll navigation={ navigation } route={ route } foodType={ foodCategory.name }/>
        ) : (
          null
        )}
      </View>
      <View style={ styles.divider }></View>
      <FlatList
        style = { styles.cards }
        keyExtractor={ yeni.id }
        data={ yeni }
        horizontal={ true }
        showsHorizontalScrollIndicator={ false }
        renderItem={({ item }) => (
          <HorizontalCard
            navigation={ navigation }
            route={ route }
            food= { item }
            yeni= { item }
            color={ foodCategory.color != null ? foodCategory.color : `#FEA11F` }
          />
        )}
        ListHeaderComponent={
          <View style={{
            width: 12,
          }}></View>
        }
        ListFooterComponent={
          <View style={{
            width: 12,
          }}></View>
        }
      />
      <View style={ styles.divider }></View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardsContainer: {
    marginVertical: 2,  
  },
  cards: {
    paddingBottom: 4,      
  },
  cardsLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
  },
  foodCategoryName: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#222',
    flex: 1,
  },
  divider: {
    height: 1,
    marginHorizontal: 20,
    backgroundColor: "#2221",
    marginTop: 6,
    marginBottom: 4,
  },
});