import React from 'react';
import BottomNavigator from './routes/bottomNavigation';
import AppContext from './assets/globals/appContext';
import { useState } from 'react';
import { favoriteFoods } from './assets/controller/query';
import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HelloWorldApp from './screens/anasayfa';
import getRequest from './assets/component/getRequest';
import { postRequest } from './assets/component/postRequest';

export default function App() {

  const getData = async () => {
    try {
      const value = (await getRequest('http://eczanev2-dev.eu-central-1.elasticbeanstalk.com/api/getFavoritesProducts?id=123'));
      // console.log(value);
      return value != null ? value : [];
    }
    catch (e) {
      alert(e);
    }
  }

  const saveData = async (foodIds) => {
    try {
      const value = JSON.stringify(foodIds);
      await AsyncStorage.setItem('favorites', value);
    }
    catch (e) {
      alert(e);
    }
  }

  const [favs, setFavs] = useState();
  const [foods, setFoods] = useState();

  useEffect(() => {
    getData()
      .then(data => {
        setFavs(data != null ? data : []);
        setFoods(data != null ? data : []);
      })
      .catch(error => {
        alert(error);
      })
  }, [])

  // const fetchFoods = (favFoods) => {
  //   favoriteFoods(favFoods)
  //     .then(data => {
  //       setFoods(data);
  //     })
  //     .catch(error => {
  //       alert(error)
  //     })
  // }

  const addFavorites = (id) => {
    //todo favoriye ekleyince istek at
    try {
      const value = postRequest('http://eczanev2-dev.eu-central-1.elasticbeanstalk.com/api/addNewFavoriteProduct', 123, id);
    }
    catch (e) {
      alert(e);
    }

    getData()
      .then(data => {
        setFavs(data != null ? data : []);
        setFoods(data != null ? data : []);
      })
      .catch(error => {
        alert(error);
      })
    // const tempFavs = favs;
    // if(!tempFavs.find((food) => food == id)){
    //   tempFavs.push(id);
    // }
    // setFavs(tempFavs);
    // favoriteFoods(tempFavs)
    //     .then(data => {
    //       setFoods(data);
    //     })
    //     .catch(error => {
    //       alert(error)
    //     });
    // saveData(tempFavs);
  }

  const clearFavorites = () => {
    //todo favorileri silince bosalt
    getData()
      .then(data => {
        setFavs(data != null ? data : []);
        setFoods(data != null ? data : []);
      })
      .catch(error => {
        alert(error);
      })
    // const tempFavs = [];
    // setFavs(tempFavs);
    // favoriteFoods(tempFavs)
    //     .then(data => {
    //       setFoods(data);
    //     })
    //     .catch(error => {
    //       alert(error)
    //     });
    // saveData(tempFavs);
  }

  const deleteFavorites = (id) => {
    //todo favorileri silince bosalt

    try {
      const value = postRequest('http://eczanev2-dev.eu-central-1.elasticbeanstalk.com/api/deleteFavoriteProduct', 123, id);
    }
    catch (e) {
      alert(e);
    }

    getData()
      .then(data => {
        setFavs(data != null ? data : []);
        setFoods(data != null ? data : []);
      })
      .catch(error => {
        alert(error);
      })
    // const tempFavs = favs;
    // const index = tempFavs.indexOf(id);
    // if(index > -1){
    //   tempFavs.splice(index, 1);
    // }
    // setFavs(tempFavs);
    // favoriteFoods(tempFavs)
    //   .then(data => {
    //   setFoods(data);
    // })
    // .catch(error => {
    //   alert(error)
    // });
    // saveData(tempFavs);
  }

  const favorites = {
    favs: favs,
    foods: foods,
    addFavorites,
    clearFavorites,
    deleteFavorites,
  }

  return (
    //<HelloWorldApp></HelloWorldApp>
    <AppContext.Provider value={favorites} >
      <BottomNavigator />
    </AppContext.Provider>
  );
}