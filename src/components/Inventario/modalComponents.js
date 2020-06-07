/* eslint-disable react-native/no-inline-styles */
/**
 * @format
 * @flow
 */

import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {ProductData, ClientsData, Badge} from './data';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {NavigationContainer} from '@react-navigation/native';

const Stack = createStackNavigator();

// COMPONENTES PRIMARIOS
// Componentes para agregar al inventario
const AddClient: () => React$Node = ({setModalValue}) => {
  return (
    <View>
      <View style={styles.form}>
        <Text style={styles.formTitle}>Agregar cliente</Text>
        <TextInput
          placeholder="Nombres ej. Daniela Andrade*"
          style={styles.txtInput}
        />
        <TextInput
          placeholder="Número de teléfono"
          keyboardType="numeric"
          style={styles.txtInput}
        />
        <TextInput
          placeholder="Correo Electrónico"
          keyboardType="email-address"
          style={styles.txtInput}
        />
        <TextInput placeholder="Descripción" style={styles.txtInput} />
      </View>
      <BtnGroup setModalValue={setModalValue} />
    </View>
  );
};

const AddProduct: () => React$Node = ({setModalValue}) => {
  return (
    <View>
      <View style={styles.form}>
        <ScrollView>
          <Text style={styles.formTitle}>Agregar producto</Text>
          <TextInput
            placeholder="Nombre del producto*"
            style={styles.txtInput}
          />

          <TextInput
            placeholder="Cantidad a agregar*"
            style={styles.txtInput}
            keyboardType="number-pad"
          />

          <TextInput placeholder="Proveedor" style={styles.txtInput} />

          <TextInput
            placeholder="Precio de costo p/u*"
            style={styles.txtInput}
            keyboardType="number-pad"
          />

          <TextInput
            placeholder="Precio de costo p/m*"
            keyboardType="number-pad"
            style={styles.txtInput}
          />

          <TextInput
            placeholder="Precio de venta p/u*"
            keyboardType="number-pad"
            style={styles.txtInput}
          />

          <TextInput
            placeholder="Precio de venta p/m*"
            style={styles.txtInput}
            keyboardType="number-pad"
          />

          <TextInput placeholder="Descripción" style={styles.txtInput} />
        </ScrollView>
      </View>
      <BtnGroup setModalValue={setModalValue} />
    </View>
  );
};

const AddService: () => React$Node = ({setModalValue}) => {
  return (
    <View>
      <View style={styles.form}>
        <ScrollView>
          <Text style={styles.formTitle}>Agregar Servicio</Text>
          <TextInput
            placeholder="Nombre de servicio*"
            style={styles.txtInput}
          />
          <TextInput
            placeholder="Cantidad a agregar*"
            style={styles.txtInput}
          />
          <TextInput placeholder="Proveedor" style={styles.txtInput} />
          <TextInput
            placeholder="Precio de costo p/u*"
            style={styles.txtInput}
          />
          <TextInput
            placeholder="Precio de costo p/m*"
            style={styles.txtInput}
          />
          <TextInput
            placeholder="Precio de venta p/u*"
            style={styles.txtInput}
          />
          <TextInput
            placeholder="Precio de venta p/m*"
            style={styles.txtInput}
          />
          <TextInput
            placeholder="Descripcion"
            numberOfLines={2}
            style={styles.txtInput}
          />
        </ScrollView>
      </View>
      <BtnGroup setModalValue={setModalValue} />
    </View>
  );
};

const AddProvider: () => React$Node = ({setModalValue}) => {
  return (
    <>
      <View style={styles.form}>
        <ScrollView>
          <Text style={styles.formTitle}>Agregar Proveedor</Text>
          <TextInput
            placeholder="Nombre de Proveedor*"
            style={styles.txtInput}
          />
          <TextInput
            placeholder="Número de teléfono"
            keyboardType="numeric"
            style={styles.txtInput}
          />
          <TextInput
            placeholder="Email"
            keyboardType="email-address"
            style={styles.txtInput}
          />
          <TextInput placeholder="Descripcion" style={styles.txtInput} />
        </ScrollView>
      </View>
      <BtnGroup setModalValue={setModalValue} />
    </>
  );
};

// COMPONENTES SECUNDARIOS

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
  );
};

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

export {AddClient, AddProduct, AddService, AddProvider, CancelBtn};

const styles = StyleSheet.create({
  form: {
    width: 300,
    height: 500,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  formTitle: {
    fontSize: 32,
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
    paddingVertical: 5,
    marginVertical: 5,
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
