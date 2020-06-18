/* eslint-disable no-alert */
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
import firestore from '@react-native-firebase/firestore';

const products = firestore().collection('productos');

// METODOS
const randomId = () => {
  let id = '';
  for (let i = 0; i < 6; i++) {
    const randomNum = () => {
      Math.floor(Math.random() * (10 - 0) + 0);
    };
    let r = Math.random() * (62 - 10) + 0;
    id += String.fromCharCode((r += r > 9 ? (r < 36 ? 55 : 61) : 48));
  }
  console.log(id);
};

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
      <BtnGroup setModalValue={setModalValue} action={() => randomId()} />
    </View>
  );
};

const AddProduct: () => React$Node = ({setModalValue}) => {
  const [nombre, setNombre] = useState('');
  const [cantidad, setCantidad] = useState(0);
  const [proveedor, setProveedor] = useState('');
  const [costoP_U, setCostoP_U] = useState(0);
  const [costoP_M, setCostoP_M] = useState(0);
  const [ventaP_U, setVentaP_U] = useState(0);
  const [ventaP_M, setVentaP_M] = useState(0);
  const [descripcion, setDescripcion] = useState('');

  const clean = () => {
    setNombre('');
    setCantidad(0);
    setProveedor('');
    setCostoP_M(0);
    setCostoP_U(0);
    setVentaP_M(0);
    setVentaP_U(0);
    setDescripcion('');
  };

  const save = () => {
    if (nombre === '' || cantidad < 0) {
      alert('Ingresa todos los datos correctamente');
      return;
    }

    products
      .doc(nombre)
      .set({
        nombre,
        cantidad,
        proveedor,
        costoP_U,
        costoP_M,
        ventaP_U,
        ventaP_M,
        descripcion,
      })
      .then(() => {
        console.log('El producto fue agregado correctamente.');
        clean();
      })
      .catch(err => {
        console.log('error: ' + err.code);
      });
  };

  return (
    <View>
      <View style={styles.form}>
        <ScrollView>
          <Text style={styles.formTitle}>Agregar producto</Text>
          <TextInput
            placeholder="Nombre del producto*"
            style={styles.txtInput}
            onChangeText={text => setNombre(text)}
            value={nombre}
          />

          <TextInput
            placeholder="Cantidad a agregar*"
            style={styles.txtInput}
            keyboardType="number-pad"
            onChangeText={text => setCantidad(text)}
            value={cantidad}
          />

          <TextInput
            placeholder="Proveedor"
            style={styles.txtInput}
            onChangeText={text => setProveedor(text)}
            value={proveedor}
          />

          <TextInput
            placeholder="Precio de costo p/u*"
            style={styles.txtInput}
            keyboardType="number-pad"
            onChangeText={text => setCostoP_U(text)}
            value={costoP_U}
          />

          <TextInput
            placeholder="Precio de costo p/m*"
            keyboardType="number-pad"
            style={styles.txtInput}
            onChangeText={text => setCostoP_M(text)}
            value={costoP_M}
          />

          <TextInput
            placeholder="Precio de venta p/u*"
            keyboardType="number-pad"
            style={styles.txtInput}
            onChangeText={text => setVentaP_U(text)}
            value={ventaP_U}
          />

          <TextInput
            placeholder="Precio de venta p/m*"
            style={styles.txtInput}
            keyboardType="number-pad"
            onChangeText={text => setVentaP_M(text)}
            value={ventaP_M}
          />

          <TextInput
            placeholder="Descripción"
            style={styles.txtInput}
            onChangeText={text => setDescripcion(text)}
            value={descripcion}
          />
        </ScrollView>
      </View>
      <BtnGroup setModalValue={setModalValue} action={() => save()} />
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

const BtnGroup: () => ReactNode = ({setModalValue, action}) => {
  return (
    <View style={{flexDirection: 'row'}}>
      <View style={{float: 'left', width: 'auto'}}>
        <CancelBtn setModalValue={setModalValue} />
      </View>
      <View style={{float: 'right', width: 'auto'}}>
        <SuccesBtn setModalValue={setModalValue} action={action} />
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

const SuccesBtn: () => React$Node = ({setModalValue, action}) => {
  return (
    <TouchableOpacity
      style={[styles.btn, styles.succesBtn]}
      onPress={() => action()}>
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
