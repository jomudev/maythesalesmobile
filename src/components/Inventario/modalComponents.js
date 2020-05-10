/* eslint-disable react-native/no-inline-styles */
/**
 * @format
 * @flow
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';

const AddClient: () => React$Node = ({setModalValue}) => {
  return (
    <View>
      <View style={styles.form}>
        <Text style={styles.formTitle}>Agregar cliente</Text>
        <TextInput
          placeholder="Nombres ej. Daniela Andrade*"
          style={styles.txtInput}
        />
        <TextInput placeholder="Número de teléfono" style={styles.txtInput} />
        <TextInput placeholder="Correo Electrónico" style={styles.txtInput} />
        <TextInput placeholder="Comentario" style={styles.txtInput} />
      </View>
      <BtnGroup setModalValue={setModalValue}/>
    </View>
  );
};

const AddProduct: () => React$Node = ({setModalValue}) => {
  return (
    <View>
      <View style={styles.form}>
        <Text style={styles.formTitle}>Agregar producto</Text>
        <TextInput placeholder="Nombre del producto*" style={styles.txtInput} />
        <TextInput placeholder="Cantidad a agregar*" style={styles.txtInput} />
        <TextInput placeholder="Precio de costo p/u*" style={styles.txtInput} />
        <Text>p/u = por unidad</Text>
        <TextInput placeholder="Precio de costo p/m*" style={styles.txtInput} />
        <Text>p/u = por mayoria</Text>
        <TextInput placeholder="Precio de venta*" style={styles.txtInput} />
      </View>
      <BtnGroup setModalValue={setModalValue}/>
    </View>
  );
};

const BtnGroup: () => ReactNode = ({setModalValue}) => {
  return (
    <View style={{flexDirection: 'row'}}>
      <View style={{float: 'left', width: 'auto'}}>
        <CancelBtn setModalValue={setModalValue} />
      </View>
      <View style={{float: 'right', width: 'auto'}}>
        <SuccesBtn setModalValue={setModalValue} />
      </View>
    </View>
  )
}

const CancelBtn: () => React$Node = ({setModalValue}) => {
  return (
    <TouchableOpacity
      style={[styles.btn, styles.cancelBtn]}
      onPress={() => setModalValue({visible: false})}>
      <Text style={{color: 'white'}}>Cancelar</Text>
    </TouchableOpacity>
  );
};

const SuccesBtn: () => React$Node = ({setModalValue}) => {
  return (
    <TouchableOpacity
      style={[styles.btn, styles.succesBtn]}
      onPress={() => setModalValue({visible: false})}>
      <Text style={{color: 'white'}}>Agregar</Text>
    </TouchableOpacity>
  );
};

export {AddClient, AddProduct, CancelBtn};

const styles = StyleSheet.create({
  form: {
    width: 300,
    height: 500,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  formTitle: {
    fontSize: 46,
    textAlign: 'center',
    marginBottom: 20,
  },
  txtInput: {
    width: '100%',
    borderRadius: 20,
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: '#eee',
    paddingHorizontal: 32,
    paddingVertical: 16,
    margin: 10,
  },
  btn: {
    paddingVertical: 16,
    paddingHorizontal: 32,
    margin: 2,
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: 150,
    backgroundColor: '#f7f8f9',
    borderRadius: 20,
  },
  cancelBtn: {
    backgroundColor: 'rgb(255,80,80)',
  },
  succesBtn: {
    backgroundColor: '#5d80b6',
  },
});
