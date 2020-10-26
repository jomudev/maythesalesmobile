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
  const [costoPU, setCostoPU] = useState(0);
  const [costoPM, setCostoPM] = useState(0);
  const [ventaPU, setVentaPU] = useState(0);
  const [ventaPM, setVentaPM] = useState(0);
  const [descripcion, setDescripcion] = useState('');

  if (route.params) {
    setBarcode(route.params.scannedBarcode);
  }

  const clean = () => {
    setNombre('');
    setCantidad(0);
    setProveedor('');
    setCostoPM(0);
    setCostoPU(0);
    setVentaPM(0);
    setVentaPU(0);
    setDescripcion('');
    setBarcode('');
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
          onChangeText={text => setCostoPU(text)}
          value={`${costoPU}`}
        />
        <Text style={styles.txtMuted}>Precio de costo por mayoreo</Text>
        <TextInput
          placeholder="Precio de costo p/m"
          keyboardType="number-pad"
          style={styles.txtInput}
          onChangeText={text => setCostoPM(text)}
          value={`${costoPM}`}
        />
        <Text style={styles.txtMuted}>Precio de venta por unidad</Text>
        <TextInput
          keyboardType="number-pad"
          style={styles.txtInput}
          onChangeText={text => setVentaPU(text)}
          value={`${ventaPU}`}
        />
        <Text style={styles.txtMuted}>Precio de venta por mayoreo</Text>
        <TextInput
          style={styles.txtInput}
          keyboardType="number-pad"
          cantidad
          onChangeText={text => setVentaPM(text)}
          value={`${ventaPM}`}
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
                costoPM,
                costoPU,
                ventaPM,
                ventaPU,
                descripcion,
                barcode,
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
