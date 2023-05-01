import React, { useState } from 'react';
import { View, Text } from 'react-native';
import {Picker} from '@react-native-picker/picker';
//Todo
//gelen food id stok bilgisinde aranacak stok olanlar ekrana basilacak
//eger comboboxdan herhangi biri secilmediyse bu sefer sepete eklenemeyecekk

const ComboBoxExample = ({ foodId, setSelected }) => {
  const [selectedLanguage, setSelectedPharmacy] = useState();

  return (
    <Picker
      mode='dialog'
      selectedValue= {selectedLanguage}
      onValueChange={(itemValue, itemIndex) =>{
          setSelectedPharmacy(itemValue);
          setSelected(itemValue);
        }        
      }>      
      <Picker.Item enabled={false} label='Eczane Seçiniz' value="FirstLoad" />
      <Picker.Item label="Eczane 1" value="1" />
      <Picker.Item label="Eczane 2" value="12" />
      <Picker.Item label="Eczane 3" value="123" />
      <Picker.Item label="Eczane 4" value="1234" />

    </Picker>
  );
};

export default ComboBoxExample;