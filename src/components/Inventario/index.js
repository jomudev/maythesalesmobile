/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import FormOptions from './data';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {createStackNavigator} from '@react-navigation/stack';
import styles from './styles';
import AddCliente from '../AddComponents/addCliente';
import AddProducto from '../AddComponents/addProducto';
import AddServicio from '../AddComponents/addServicio';
import AddProveedor from '../AddComponents/addProveedor';
import AddWholesaler from '../AddComponents/addWholesaler';
import ShowItem from '../showInformacionComponents/ShowItem';
import CamScanner from '../CamScanner';
import {
  ShowClientes,
  ShowProductos,
  ShowProveedores,
  ShowServicios,
  ShowWholesalers,
} from '../showInformacionComponents/ShowList';
import {MenuListBannerAdvert} from '../ads';

const Stack = createStackNavigator();

const ItemList = ({navigation, item}) => {
  return (
    <View style={styles.menuListItem}>
      <View style={styles.menuListHeader}>
        <Icon name={item.icon} size={24} style={styles.menuListIcon} />
        <Text style={styles.menuListTitle}>{item.type}</Text>
      </View>
      <View style={styles.menuListBody}>
        <Text style={styles.menuListBodyText}>{item.description}</Text>
      </View>
      <View style={styles.menuListFooter}>
        <TouchableOpacity
          style={[styles.btn, styles.leftBtn]}
          onPress={() => navigation.navigate(item.type)}>
          <Text style={styles.btnTxt}>Añadir</Text>
        </TouchableOpacity>
        <TouchableOpacity
          adjustsFontSizeToFit
          style={[styles.btn, styles.rightBtn]}
          onPress={() =>
            navigation.navigate(`Show${item.type}`, {type: item.type})
          }>
          <Text style={styles.btnTxt} adjustsFontSizeToFit>
            Mostrar
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const OptionsScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <ScrollView style={styles.flatList}>
        <MenuListBannerAdvert />
        {FormOptions.map((item) => (
          <ItemList navigation={navigation} item={item} key={item.name} />
        ))}
      </ScrollView>
    </View>
  );
};

const Inventario = (props) => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Main" component={OptionsScreen} {...props} />
      <Stack.Screen name="Clientes" component={AddCliente} />
      <Stack.Screen name="ShowClientes" component={ShowClientes} />
      <Stack.Screen name="Productos" component={AddProducto} />
      <Stack.Screen name="ShowProductos" component={ShowProductos} />
      <Stack.Screen name="Servicios" component={AddServicio} />
      <Stack.Screen name="ShowServicios" component={ShowServicios} />
      <Stack.Screen name="Proveedores" component={AddProveedor} />
      <Stack.Screen name="ShowProveedores" component={ShowProveedores} />
      <Stack.Screen name="Mayoristas" component={AddWholesaler} />
      <Stack.Screen name="ShowMayoristas" component={ShowWholesalers} />
      <Stack.Screen name="ShowItem" component={ShowItem} />
      <Stack.Screen name="CamScanner" component={CamScanner} />
    </Stack.Navigator>
  );
};

export default Inventario;
