import React, { useState } from 'react';
import { View, Text } from 'react-native';
import {Picker} from '@react-native-picker/picker';
//Todo
//gelen food id stok bilgisinde aranacak stok olanlar ekrana basilacak
//eger comboboxdan herhangi biri secilmediyse bu sefer sepete eklenemeyecekk

const ComboBoxExample = ({ foodId, deneme }) => {
  const [selectedLanguage, setSelectedLanguage] = useState();

  return (
    <Picker
      mode='dialog'
      selectedValue= {selectedLanguage}
      onValueChange={(itemValue, itemIndex) =>{
          setSelectedLanguage(itemValue);
          deneme(itemValue);
        }        
      }>      
      <Picker.Item enabled={false} label='Eczane Seçiniz' value="FirstLoad" />
      <Picker.Item label="Eczane 2" value="12" />
      <Picker.Item label="Eczane 3" value="123" />
      <Picker.Item label="Eczane 4" value="1234" />

    </Picker>
  );
};

export default ComboBoxExample;