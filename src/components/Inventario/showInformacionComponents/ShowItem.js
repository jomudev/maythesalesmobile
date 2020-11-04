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
        <Text>Email</Text>
        <TextInput placeholder={data.email} style={styles.txtInput} />
        <Text>Descripción</Text>
        <TextInput placeholder={data.descripcion} style={styles.txtInput} />
      </View>
    </View>
  );
}

function ShowProductoItem({data}) {
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
        <Text>Precio de venta por unidad</Text>
        <TextInput
          placeholder={data.precioPU.toString()}
          style={styles.txtInput}
        />
        <Text>Precio de venta por mayoreo</Text>
        <TextInput placeholder={data.valorPM} style={styles.txtInput} />
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
        <View style={styles.nombre}>
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
        <Text>Email</Text>
        <TextInput placeholder={data.email} style={styles.txtInput} />
        <Text>Descripción</Text>
        <TextInput placeholder={data.descripcion} style={styles.txtInput} />
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
        <Text>Email</Text>
        <TextInput placeholder={data.email} style={styles.txtInput} />
        <Text>Descripción</Text>
        <TextInput placeholder={data.descripcion} style={styles.txtInput} />
      </View>
    </View>
  );
}

const ShowItem = ({route}) => {
  console.log(route.params);
  const type = route.params.type;
  const data = route.params.data;
  if (type === 'Servicios Adicionales') {
    return <ShowServicioItem data={data} />;
  }
  if (type === 'Productos') {
    return <ShowProductoItem data={data} />;
  }
  if (type === 'Clientes') {
    return <ShowClienteItem data={data} />;
  }
  if (type === 'Proveedores') {
    return <ShowProveedorItem data={data} />;
  }
  return (
    <View>
      <Text>Opción no disponible</Text>
    </View>
  );
};

export default ShowItem;
