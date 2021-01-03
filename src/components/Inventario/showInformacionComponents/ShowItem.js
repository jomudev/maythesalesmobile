import React from 'react';
import {Text, View} from 'react-native';
import ShowClienteItem from './showItemComponents/showClientItem';
import ShowProveedorItem from './showItemComponents/showProveedorItem';
import ShowProductoItem from './showItemComponents/showProductoItem';
import ShowServicioItem from './showItemComponents/showServicioItem';

const editIcon = 'pencil';
const closeIcon = 'close';

const ShowItem = ({route, navigation}) => {
  const type = route.params.type;
  const data = route.params.data;
  if (type === 'Servicios') {
    return (
      <ShowServicioItem
        data={data}
        closeIcon={closeIcon}
        editIcon={editIcon}
        type={type}
        navigation={navigation}
      />
    );
  }
  if (type === 'Productos') {
    return (
      <ShowProductoItem
        data={data}
        closeIcon={closeIcon}
        editIcon={editIcon}
        type={type}
        navigation={navigation}
      />
    );
  }
  if (type === 'Clientes') {
    return (
      <ShowClienteItem
        data={data}
        closeIcon={closeIcon}
        editIcon={editIcon}
        type={type}
        navigation={navigation}
      />
    );
  }
  if (type === 'Proveedores') {
    return (
      <ShowProveedorItem
        data={data}
        closeIcon={closeIcon}
        editIcon={editIcon}
        type={type}
        navigation={navigation}
      />
    );
  }
  return (
    <View>
      <Text>Opción no disponible</Text>
    </View>
  );
};

export default ShowItem;
