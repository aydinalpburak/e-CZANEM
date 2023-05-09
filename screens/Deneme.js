import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';

export default function App2() {
  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        <TextInput style={styles.input} placeholder="Input 1" />
        <TextInput style={styles.input} placeholder="Input 2" />
      </View>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Button</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  leftContainer: {
    flex: 3,
    marginRight: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 10,
    marginBottom: 10,
  },
  button: {
    flex: 1,
    backgroundColor: '#007AFF',
    borderRadius: 4,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});