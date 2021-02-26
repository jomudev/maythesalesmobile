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
        <Icon name={item.icon} size={16} style={styles.menuListIcon} />
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
  const MenuIcon = ({navigation}) => (
    <Icon
      style={styles.icon}
      name="menu"
      size={28}
      color="#101e5a"
      onPress={() => navigation.toggleDrawer()}
    />
  );

  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: '#103e5a',
        headerStyle: styles.header,
        headerLeft: () => <MenuIcon {...props} />,
      }}>
      <Stack.Screen
        name="Main"
        options={{title: 'Inventario'}}
        component={OptionsScreen}
        {...props}
      />
      <Stack.Screen
        name="Clientes"
        options={{title: 'Añadir nuevo cliente'}}
        component={AddCliente}
      />
      <Stack.Screen
        name="ShowClientes"
        options={{title: 'Clientes'}}
        component={ShowClientes}
      />
      <Stack.Screen
        name="Productos"
        options={{title: 'Añadir nuevo producto'}}
        component={AddProducto}
      />
      <Stack.Screen
        name="ShowProductos"
        options={{title: 'Productos'}}
        component={ShowProductos}
      />
      <Stack.Screen
        name="Servicios"
        options={{title: 'Añadir nuevo servicio adicional'}}
        component={AddServicio}
      />
      <Stack.Screen
        name="ShowServicios"
        options={{title: 'Servicios adicionales'}}
        component={ShowServicios}
      />
      <Stack.Screen
        name="Proveedores"
        options={{title: 'Añadir nuevo proveedor'}}
        component={AddProveedor}
      />
      <Stack.Screen
        name="ShowProveedores"
        options={{title: 'Proveedores'}}
        component={ShowProveedores}
      />
      <Stack.Screen
        name="Mayoristas"
        options={{title: 'Añadir nuevo comprador mayorista'}}
        component={AddWholesaler}
      />
      <Stack.Screen
        name="ShowMayoristas"
        options={{title: 'Compradores mayoristas'}}
        component={ShowWholesalers}
      />
      <Stack.Screen
        name="ShowItem"
        options={({route}) => ({
          title: route.params.data.nombre,
        })}
        component={ShowItem}
      />
      <Stack.Screen name="CamScanner" component={CamScanner} />
    </Stack.Navigator>
  );
};

export default Inventario;
