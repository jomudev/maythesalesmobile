import React, {useEffect, useRef} from 'react';
import {
  Animated,
  View,
  Text,
  TextInput,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import styles from './styles';
import Header from './header';

const DataComponent = ({item, setAddData, setShowData, type}) => {
  const xPosition = useRef(new Animated.Value(500)).current;
  useEffect(() => {
    Animated.timing(xPosition, {
      toValue: 0,
      duration: 250,
      useNativeDriver: false,
    }).start();
  });

  const close = () => {
    Animated.timing(xPosition, {
      toValue: 500,
      duration: 250,
      useNativeDriver: false,
    }).start();
    setTimeout(() => setShowData(false), 250);
  };

  return (
    <Animated.View
      style={{
        ...styles.showDataComponent,
        left: xPosition,
      }}>
      <Header setModalValue={close} title={item.nombre} />
      <View style={styles.container}>
        {type === 'Productos' || type === 'Servicios Adicionales' ? (
          <View style={styles.form}>
            <Text style={styles.mutedText}>Id producto:</Text>
            <Text>{item.id3}</Text>
            <ScrollView>
              <Text style={styles.mutedText}>Producto:</Text>
              <TextInput
                placeholder="Nombre"
                style={styles.txtInput}
                defaultValue={item.nombre}
              />
              <Text style={styles.mutedText}>Cantidad:</Text>
              <TextInput
                placeholder="Cantidad a agregar*"
                style={styles.txtInput}
                keyboardType="number-pad"
                defaultValue={item.cantidad.toString()}
              />
              <Text style={styles.mutedText}>Proveedor:</Text>
              <TextInput
                placeholder="Proveedor"
                style={styles.txtInput}
                defaultValue={item.proveedor}
              />
              <Text style={styles.mutedText}>
                precio de compra por unindad:
              </Text>
              <TextInput
                placeholder="Precio de costo p/u*"
                style={styles.txtInput}
                keyboardType="number-pad"
                defaultValue={item.costoP_U.toString()}
              />
              <Text style={styles.mutedText}>
                precio de compra por mayoreo:
              </Text>
              <TextInput
                placeholder="Precio de costo p/m*"
                keyboardType="number-pad"
                style={styles.txtInput}
                defaultValue={item.costoP_M.toString()}
              />
              <Text style={styles.mutedText}>Precio de venta por uninda:</Text>
              <TextInput
                placeholder="Precio de venta p/u*"
                keyboardType="number-pad"
                style={styles.txtInput}
                defaultValue={item.ventaP_U.toString()}
              />
              <Text style={styles.mutedText}>Precio de venta por mayoreo:</Text>
              <TextInput
                placeholder="Precio de venta p/m*"
                style={styles.txtInput}
                keyboardType="number-pad"
                defaultValue={item.ventaP_M.toString()}
              />
            </ScrollView>
          </View>
        ) : type === 'Clientes' || type === 'Proveedores' ? (
          <View style={styles.form}>
            <SafeAreaView>
              <TextInput
                placeholder="Nombres ej. Daniela Andrade*"
                style={styles.txtInput}
                defaultValue={item.nombre}
              />
              <Text style={styles.mutedText}>Número de teléfono:</Text>
              <TextInput
                placeholder="Número de teléfono"
                keyboardType="numeric"
                style={styles.txtInput}
                defaultValue={item.telefono}
              />
              <Text style={styles.mutedText}>Correo Electrónico:</Text>
              <TextInput
                placeholder="Correo Electrónico"
                keyboardType="email-address"
                style={styles.txtInput}
                defaultValue={item.email}
              />
              <Text style={styles.mutedText}>Descripción:</Text>
              <TextInput
                placeholder="Descripción"
                multiline={true}
                numberOfLines={2}
                style={styles.txtInput}
                defaultValue={item.descripcion}
              />
            </SafeAreaView>
          </View>
        ) : null}
      </View>
    </Animated.View>
  );
};

export default DataComponent;
