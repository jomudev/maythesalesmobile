import React from 'react';
import {Text, View} from 'react-native';
import ShowServicioItem from '../showItemComponents/showServicioItem';
import ShowClienteItem from '../showItemComponents/showClienteItem';
import ShowProductoItem from '../showItemComponents/showProductoItem';
import ShowProveedorItem from '../showItemComponents/showProveedorItem';
import ShowWholesalerItem from '../showItemComponents/showWholesalerItem';

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
  if (type === 'Mayoristas') {
    return (
      <ShowWholesalerItem
        data={data}
        closeIcon={closeIcon}
        editIcon={editIcon}
        type={type}
        navigation={navigation}
      />
    )
  }
  return (
    <View>
      <Text>Opción no disponible</Text>
    </View>
  );
};

export default ShowItem;
