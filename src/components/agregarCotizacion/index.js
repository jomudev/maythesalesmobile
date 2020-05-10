import React from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';

export default class AgregarCotizacion extends React.Component {
  render() {
    return (
      <View style={styles.form}>
        <TextInput style={styles.txtInput} placeholder="Nombre" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  form: {
    flex: 1,
    width: '100%',
    padding: 2,
    maxWidth: 600,
    alignContent: 'center',
    alignItems: 'center',
  },
  txtInput: {
    width: '95%',
    borderRadius: 20,
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: '#eee',
    paddingHorizontal: 32,
    paddingVertical: 2,
    margin: 5,
  },
});
