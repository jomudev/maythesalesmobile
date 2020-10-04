import React from 'react';
import {View, Text, TouchableOpacity, FlatList} from 'react-native';
import FormOptions from './data';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {createStackNavigator} from '@react-navigation/stack';
import styles from './styles';
import AddCliente from './modalComponents/addCliente';
import AddProducto from './modalComponents/addProducto';
import AddServicio from './modalComponents/addServicio';
import AddProveedor from './modalComponents/addProveedor';
import ShowItem from './showInformacionComponents/ShowItem';
import CamScanner from '../CamScanner';
import {
  ShowClientes,
  ShowProductos,
  ShowServicios,
  ShowProveedores,
} from './showInformacionComponents/ShowList';

const Stack = createStackNavigator();

const ItemList = ({navigation, item}) => {
  return (
    <View style={styles.menuListItem}>
      <View style={styles.menuListHeader}>
        <Icon name={item.icon} size={18} style={styles.menuListIcon} />
        <Text style={styles.menuListTitle}>{item.type}</Text>
      </View>
      <View style={styles.menuListBody}>
        <Text style={styles.menuListBodyText}>{item.descripcion}</Text>
      </View>
      <View style={styles.menuListFooter}>
        <TouchableOpacity
          style={[styles.btn, styles.leftBtn]}
          onPress={() => navigation.navigate(item.type)}>
          <Text style={styles.btnTxt}>Añadir</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.btn, styles.rightBtn]}
          onPress={() =>
            navigation.navigate(`Show${item.type}`, {type: item.type})
          }>
          <Text style={styles.btnTxt}>Mostrar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const OptionsScreen = ({navigation}) => {
  return (
    <View style={styles.form}>
      <FlatList
        data={FormOptions}
        style={styles.flatList}
        renderItem={({item}) => (
          <ItemList navigation={navigation} item={item} />
        )}
        keyExtractor={item => item.type}
      />
    </View>
  );
};

const Inventario = props => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Main" component={OptionsScreen} {...props} />
      <Stack.Screen name="Clientes" component={AddCliente} />
      <Stack.Screen name="ShowClientes" component={ShowClientes} />
      <Stack.Screen name="Productos" component={AddProducto} />
      <Stack.Screen name="ShowProductos" component={ShowProductos} />
      <Stack.Screen name="Servicios Adicionales" component={AddServicio} />
      <Stack.Screen
        name="ShowServicios Adicionales"
        component={ShowServicios}
      />
      <Stack.Screen name="Proveedores" component={AddProveedor} />
      <Stack.Screen name="ShowProveedores" component={ShowProveedores} />
      <Stack.Screen name="ShowItem" component={ShowItem} />
      <Stack.Screen name="CamScanner" component={CamScanner} />
    </Stack.Navigator>
  );
};

export default Inventario;
