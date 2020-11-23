/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, TouchableOpacity, Text, TextInput} from 'react-native';
import styles from './styles';
import Icon from 'react-native-vector-icons/MaterialIcons';

function ShowClienteItem({data}) {
  const [edit, setEdit] = useState(false);
  const [icon, setIcon] = useState('edit');

  const toggleEdit = () => {
    setEdit(!edit);
    setIcon(!edit ? 'close' : 'edit');
  };
  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
          }}>
          {edit ? (
            <TextInput placeholder="Editar nombre" style={styles.txtInput} />
          ) : (
            <Text style={styles.nombre}>{data.nombre}</Text>
          )}
          <Icon
            name={icon}
            size={28}
            style={styles.editNombre}
            onPress={() => toggleEdit()}
          />
        </View>
        <Text>Número de teléfono</Text>
        <TextInput
          placeholder={data.telefono ? data.telefono : 'No asignado...'}
          style={styles.txtInput}
          keyboardType="phone-pad"
        />
        <Text>Email</Text>
        <TextInput
          placeholder={data.email ? data.email : 'No asignado...'}
          style={styles.txtInput}
        />
        <Text>Descripción</Text>
        <TextInput
          placeholder={
            data.descripcion !== '' ? data.descripcion : 'No asignada...'
          }
          style={styles.txtInput}
        />
      </View>
    </View>
  );
}

function ShowProductoItem({data, navigation}) {
  const [edit, setEdit] = useState(false);
  const [icon, setIcon] = useState('edit');
  const toggleEdit = () => {
    setEdit(!edit);
    setIcon(!edit ? 'close' : 'edit');
  };

  const updateData = (element, text) => {

  }
  
  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <View style={styles.nombreContainer}>
          {edit ? (
            <TextInput
              placeholder="Editar nombre"
              onEndEditing={(text) => updateData('nombre', text)}
              style={{...styles.txtInput, ...styles.nombre}}
            />
          ) : (
            <Text style={styles.nombre}>{data.nombre}</Text>
          )}
          <Icon
            name={icon}
            size={28}
            style={styles.editNombre}
            onPress={() => toggleEdit()}
          />
        </View>
        <Text>Codigo</Text>
        <TextInput
          editable={false}
          placeholder={
            data.codigoDeBarras ? data.codigoDeBarras : 'No Asignado...'
          }
        />
        <Text>Descripción</Text>
        <TextInput
          onEndEditing={(text) => updateData('descripcion', text)}
          style={styles.txtInput}
          placeholder={data.descripcion ? data.descripcion : 'No asignado...'}
        />
        <Text>Precio de venta por unidad</Text>
        <TextInput
          onEndEditing={(text) => updateData('precioVenta', text)}
          placeholder={`${parseFloat(data.precioVenta).toFixed(2)}`}
          style={styles.txtInput}
        />
        <Text>Precio de costo por unidad</Text>
        <TextInput
          onEndEditing={(text) => updateData('precioCosto', text)}
          placeholder={`${parseFloat(data.precioCosto).toFixed(2)}`}
          style={styles.txtInput}
        />
      </View>
    </View>
  );
}

function ShowServicioItem({data}) {
  const [edit, setEdit] = useState(false);
  const [icon, setIcon] = useState('edit');

  const toggleEdit = () => {
    setEdit(!edit);
    setIcon(!edit ? 'close' : 'edit');
  };
  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <View style={styles.nombreContainer}>
          {edit ? (
            <TextInput placeholder="Editar nombre" style={styles.txtInput} />
          ) : (
            <Text style={styles.nombre}>{data.nombre}</Text>
          )}
          <Icon
            name={icon}
            size={28}
            style={styles.editNombre}
            onPress={() => toggleEdit()}
          />
        </View>
        <Text>Descripción</Text>
        <TextInput
          placeholder={data.descripcion ? data.descripcion : 'No asignado...'}
          style={styles.txtInput}
        />
        <Text>Precio de venta por unidad</Text>
        <TextInput
          placeholder={`${parseFloat(data.precioVenta).toFixed(2)}`}
          keyboardType="phone-pad"
          style={styles.txtInput}
        />
        <Text>Precio de costo por unidad</Text>
        <TextInput
          placeholder={`${parseFloat(data.precioCosto).toFixed(2)}`}
          keyboardType="phone-pad"
          style={styles.txtInput}
        />
      </View>
    </View>
  );
}

function ShowProveedorItem({data}) {
  const [edit, setEdit] = useState(false);
  const [icon, setIcon] = useState('edit');

  const toggleEdit = () => {
    setEdit(!edit);
    setIcon(!edit ? 'close' : 'edit');
  };
  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
          }}>
          {edit ? (
            <TextInput placeholder="Editar nombre" style={styles.txtInput} />
          ) : (
            <Text style={styles.nombre}>{data.nombre}</Text>
          )}
          <Icon
            name={icon}
            size={28}
            style={styles.editNombre}
            onPress={() => toggleEdit()}
          />
        </View>
        <Text>Número de teléfono</Text>
        <TextInput
          placeholder={data.telefono ? data.telefono : 'No asignado...'}
          style={styles.txtInput}
          keyboardType="phone-pad"
        />
        <Text>Email</Text>
        <TextInput
          placeholder={data.email ? data.email : 'No asignado...'}
          style={styles.txtInput}
        />
        <Text>Descripción</Text>
        <TextInput
          placeholder={data.descripcion ? data.descripcion : 'No asignado...'}
          style={styles.txtInput}
        />
      </View>
    </View>
  );
}

const ShowItem = ({route, navigation}) => {
  const type = route.params.type;
  const data = route.params.data;
  if (type === 'Servicios Adicionales') {
    return <ShowServicioItem data={data} navigation={navigation} />;
  }
  if (type === 'Productos') {
    return <ShowProductoItem data={data} navigation={navigation} />;
  }
  if (type === 'Clientes') {
    return <ShowClienteItem data={data} navigation={navigation} />;
  }
  if (type === 'Proveedores') {
    return <ShowProveedorItem data={data} navigation={navigation} />;
  }
  return (
    <View>
      <Text>Opción no disponible</Text>
    </View>
  );
};

export default ShowItem;
