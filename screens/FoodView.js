import React from "react";
import { useState } from "react";
import { StyleSheet } from "react-native";
import { Image } from "react-native";
import { Text } from "react-native";
import { View } from "react-native";
import { useContext } from "react";
import globalStyles from "../assets/styles/globalStyles";
import window from "../assets/controller/window";
import { ScrollView } from "react-native";
import FoodViewType from "../assets/component/foodViewType";
import FoodRecipe from "../assets/component/foodRecipe";
import FavoriteButton from "../assets/component/favoriteButton";
import FoodInformation from "../assets/component/foodInformation";
import AppContext from "../assets/globals/appContext";
import ComboBoxEczaneler from "../assets/component/ComboBox";

function compareStrings(a, b) {
  a = a.toLowerCase();
  b = b.toLowerCase();

  return (a < b) ? -1 : (a > b) ? 1 : 0;
}
var baseUrlString = 'https://drive.google.com/uc?export=view&id='; 

export default function FoodView({ navigation, route }) {
  const [food, setFood] = useState(route.params);
  const [foodType, setFoodType] = useState(food.type);
  const [selectedPharmacy, setSelectedPharmacy] = useState(-1);
  const favorites = useContext(AppContext);
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: food.name,
    });
  }, [navigation, food]);

  foodType.sort(function(a, b) {
    return compareStrings(a, b);
  });

  return (
    <ScrollView style={ globalStyles.screen }>
      <View>
        <Image source={{uri: baseUrlString + food.image1}} style={ styles.image } />
        {(selectedPharmacy != -1) || (favorites?.favs.find((item) => item.id == food.id)) ? ( //todoB burasi onemli
          <View style={ styles.favoriteButtonContainer }>
          <FavoriteButton id={ food.id } pharmacyId={selectedPharmacy}/>
          </View>
        ) : (null)}        
        <View style={ styles.comboBoxContainer }>
            <ComboBoxEczaneler setSelected={setSelectedPharmacy} foodId={(food.id).toString()}></ComboBoxEczaneler>
        </View>
      </View>
      <View style={ styles.articleContainer }>
        <View style={ styles.article }>
          <View style={ styles.foodHeaderContainer }>
            <View style={ styles.foodNameContainer }>
              <Text style={ styles.foodName }>{ food.name }</Text>
              <Text style={ styles.foodTagalog }>({ food.tagalog })</Text>
              <Text style={ [styles.foodTagalog, {marginTop: 5}] }>{`${food.price} TL`}</Text>
            </View>
          </View>
          <View style={ styles.divider }></View>
          <View style={ styles.foodDescriptionContainer }>
            <Text style={ styles.foodDescription }>{ food.description }</Text>
            {food.information != null ? (
              <View style={ styles.foodInformationWrapper }>
                {food.information.map((information, index) => {
                  return(
                    <FoodInformation key={ index } information={ information }/>
                  );
                })}
              </View>
            ) : (
              null
            )}
          </View>
          <View style={ styles.divider }></View>
          <Text style={ styles.foodAuthor }>Uretici Firma: { food.author }</Text>
          <View style={ styles.divider }></View>
          <ScrollView
            horizontal={ true }
            style={ styles.foodTypesContainer }
            showsHorizontalScrollIndicator={ false }
          >
            <View style={{
              width: 16,
            }}></View>
            { foodType.map((type, index) => {
              return(
                <FoodViewType key={ index } navigation={ navigation } route={ route } foodType={ type }/>
              )
            })}
            <View style={{
              width: 16,
            }}></View>
          </ScrollView>
          <FoodRecipe recipe={ food.recipe }/>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  image: {
    height: window.width / 1.5,
    width: window.width,
    maxHeight: window.height / 2,
    resizeMode: "cover",
  },
  favoriteButtonContainer: {
    position: "absolute",
    backgroundColor: '#fff',
    padding: 6,
    elevation: 16,
    right: 12,
    bottom: 105,
    borderRadius: 100,
    aspectRatio: 1,
  },
  comboBoxContainer: {
    width:230,
    position: 'absolute',
    backgroundColor: 'white',
    borderRadius: 100,
    right: 12,
    bottom: 44,
    elevation: 16,
  },
  articleContainer: {
    marginTop: -64,
    paddingTop: 32,
    flex: 1,
  },
  article: {
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    backgroundColor: "#fff",
    elevation: 32,
    flex: 1,
    paddingBottom: window.height/4,
  },
  foodHeaderContainer: {
    flexDirection: "row",
  }, 
  foodNameContainer: {
    flex: 1,
    paddingHorizontal: 4,
    marginBottom: 8,
    marginTop: 8,
  },
  foodName: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    color: "#222",
  },
  foodTagalog: {
    fontSize: 16,
    fontStyle: "italic",
    textAlign: "center",
    marginTop: -4,
    color: "#444",
  },
  foodDescriptionContainer: {
    marginVertical: 12,
  },
  foodDescription: {
    textAlign: "justify",
    fontSize: 16,
    paddingHorizontal: 16,
  },
  divider: {
    backgroundColor: "#0002",
    height: 1,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  foodInformationWrapper: {
    marginTop: 12
  },
  foodSocials: {
    marginHorizontal: 'auto',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    margin: 8,
  },
  foodSocialLogo: {
    marginHorizontal: 12,
  },
  foodAuthor: {
    marginHorizontal: 'auto',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    fontSize: 12,
    fontStyle: 'italic',
    color: "#444",
    fontWeight: 'bold',
  },
  foodTypesContainer: {
    marginVertical: 0,
  },
});
