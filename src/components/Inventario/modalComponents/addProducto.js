/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, Text, ScrollView, TextInput} from 'react-native';
import BtnGroup from './buttonGroup';
import {save} from './modalMetodos';
import styles from './modalStyles';
import Icon from 'react-native-vector-icons/MaterialIcons';

const AddProducto = ({navigation, route}) => {
  const [barcode, setBarcode] = useState('');
  const [nombre, setNombre] = useState('');
  const [cantidad, setCantidad] = useState(0);
  const [proveedor, setProveedor] = useState('');
  const [costoP_U, setCostoP_U] = useState(0);
  const [costoP_M, setCostoP_M] = useState(0);
  const [ventaP_U, setVentaP_U] = useState(0);
  const [ventaP_M, setVentaP_M] = useState(0);
  const [descripcion, setDescripcion] = useState('');

  if (route.params) {
    setBarcode(route.params.scannedBarcode);
  }

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

  return (
    <ScrollView>
      <View style={styles.form}>
        <Text style={styles.formTitle}>Agregar producto</Text>

        <View style={{flexDirection: 'row'}}>
          <TextInput
            editable={false}
            placeholder="Codigo de barras"
            style={{...styles.txtInput, flex: 9}}
            value={`${barcode}`}
          />
          <Icon
            name="view-week"
            style={styles.Icon}
            onPress={() =>
              navigation.navigate('CamScanner', {
                type: 'getBarcode',
                screen: 'Productos',
              })
            }
          />
        </View>

        <TextInput
          placeholder="Nombre del producto*"
          style={styles.txtInput}
          onChangeText={text => setNombre(text)}
          value={nombre}
        />

        <Text style={styles.txtMuted}>Cantidad</Text>
        <TextInput
          style={styles.txtInput}
          keyboardType="number-pad"
          onChangeText={text => setCantidad(text)}
          value={`${cantidad}`}
        />

        <TextInput
          placeholder="Proveedor"
          style={styles.txtInput}
          onChangeText={text => setProveedor(text)}
          value={proveedor}
        />
        <Text style={styles.txtMuted}>Precio de costo por unidad</Text>
        <TextInput
          style={styles.txtInput}
          keyboardType="number-pad"
          onChangeText={text => setCostoP_U(text)}
          value={`${costoP_U}`}
        />
        <Text style={styles.txtMuted}>Precio de costo por mayoreo</Text>
        <TextInput
          placeholder="Precio de costo p/m"
          keyboardType="number-pad"
          style={styles.txtInput}
          onChangeText={text => setCostoP_M(text)}
          value={`${costoP_M}`}
        />
        <Text style={styles.txtMuted}>Precio de venta por unidad</Text>
        <TextInput
          keyboardType="number-pad"
          style={styles.txtInput}
          onChangeText={text => setVentaP_U(text)}
          value={`${ventaP_U}`}
        />
        <Text style={styles.txtMuted}>Precio de venta por mayoreo</Text>
        <TextInput
          style={styles.txtInput}
          keyboardType="number-pad"
          cantidad
          onChangeText={text => setVentaP_M(text)}
          value={`${ventaP_M}`}
        />

        <TextInput
          placeholder="Descripción"
          style={styles.txtInput}
          onChangeText={text => setDescripcion(text)}
          value={descripcion}
        />
        <BtnGroup
          action={() =>
            save(
              'product',
              {
                nombre,
                cantidad,
                proveedor,
                costoP_M,
                costoP_U,
                ventaP_M,
                ventaP_U,
                descripcion,
              },
              clean(),
            )
          }
        />
      </View>
    </ScrollView>
  );
};

export default AddProducto;
