import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, FlatList,TouchableOpacity } from 'react-native';
import { Alert } from 'react-native';

const ChangePassword = ({ navigation, routes }) => {
  const [formError, setFormError] = useState(false);


  const [formData, setFormData] = useState([
    { label: 'Eski şifrenizi giriniz*', value: '' },
    { label: 'Eski şifrenizi tekrar giriniz*', value: '' },
    { label: 'Yeni şifrenizi giriniz*', value: '' },
  ]);

  const handleChangeText = (text, index) => {
    const updatedFormData = [...formData];
    updatedFormData[index].value = text;
    setFormData(updatedFormData);
  };

  

  const handleSubmit = () => {
    const validateForm = () => {
      for (const item of formData) {
        if(!item.value || item.value.length < 8) {
          return false;
        }
      }
      return true;
    };

    setFormError(false);

    if (!validateForm()) {
      setFormError(true);
    } 
    else {
      Alert.alert('Başarılı', 'Şifreniz başarıyla değiştirildi.', [{ text: 'Tamam' }]);
      // Submit form data
      console.log(formData);
    }
  };

  const renderItem = ({ item, index }) => {
      return (
        <View style={styles.inputContainer}>
          <Text style={styles.label}>{item.label}</Text>
          <TextInput style={styles.input}
            placeholder="********"
            keyboardType="numeric"
            maxLength={8}
            value={item.value}
            onChangeText={text => handleChangeText(text, index)}
            secureTextEntry={true}
          />
        </View>
      );
    
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={formData}
        renderItem={renderItem}
        keyExtractor={item => item.label}
        style={styles.formContainer}
      />
      {formError && <Text style={styles.error}>Lütfen gerekli alanları uygun şekilde doldurunuz!</Text>}
         <TouchableOpacity
              style={styles.buttonPasswd}
              onPress={handleSubmit}>
              <Text style={styles.buttonPasswd}>Şifreyi Değiştir</Text>
         </TouchableOpacity>
        

    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    marginTop:-20,
    marginBottom:0,
    backgroundColor:'white',
  },
  buttonPasswd:
  {
    backgroundColor: '#fea11e',
    borderRadius: 5,
    padding: 10,
    margin:5,
    textAlign:'center',
    fontSize:20,
    color:"white",
  },
  formContainer: {
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 10,
    padding:10,
  },
  label: {
    marginBottom: 5,
    fontSize:16,
    color:'#b63e3f',
    fontWeight:'bold',
  },
  input: { 
    borderWidth: 0.5,
    borderColor:'#7ac594',
    borderRadius: 4,
    padding: 5,
    color:'#fea11e',
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
});

export default ChangePassword;