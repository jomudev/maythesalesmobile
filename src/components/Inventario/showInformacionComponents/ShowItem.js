/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {View, TouchableOpacity, Text, TextInput} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import styles from './styles';
import Icon from 'react-native-vector-icons/MaterialIcons';

async function getStorage() {
  try {
    const jsonValue = await AsyncStorage.getItem('message');
    return jsonValue !== null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.warn('error en AsyncStorage linea 8 ', e);
  }
}

async function setStorage() {
  try {
    const jsonValue = JSON.stringify(true);
    return await AsyncStorage.setItem('message', jsonValue);
  } catch (e) {
    console.warn('error al almacenar los datos en el storage', e);
  }
}

function ShowClienteItem({data}) {
  const [close, setClose] = useState(false);
  const [edit, setEdit] = useState(false);
  const [icon, setIcon] = useState('edit');

  useEffect(() => {
    getStorage().then(res => {
      setClose(res);
    });
  }, []);

  const toggle = () => {
    setClose(true);
  };

  const dontShowAgain = () => {
    setStorage()
      .then(() => {
        setClose(true);
      })
      .chatch(err => console.log(err));
  };

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
        {!close ? (
          <View style={styles.message}>
            <Icon
              name="clear-all"
              size={24}
              style={styles.closeMessage}
              onPress={() => {
                toggle();
              }}
            />
            <Text style={{alignItems: 'center', justifyContent: 'center'}}>
              Aquí también puedes actualizar los datos
            </Text>
            <TouchableOpacity
              onPress={() => dontShowAgain()}
              style={{paddingTop: 20, paddingBottom: 10}}>
              <Text>No mostrar de nuevo </Text>
            </TouchableOpacity>
          </View>
        ) : null}
      </View>
    </View>
  );
}

function ShowProductoItem({data}) {
  const [close, setClose] = useState(false);
  const [edit, setEdit] = useState(false);
  const [icon, setIcon] = useState('edit');

  useEffect(() => {
    getStorage().then(res => {
      setClose(res);
    });
  }, []);

  const toggle = () => {
    setClose(true);
  };

  const dontShowAgain = () => {
    setStorage()
      .then(() => {
        setClose(true);
      })
      .chatch(err => console.log(err));
  };

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
          placeholder={data.valorP_U.toString()}
          style={styles.txtInput}
        />
        <Text>Precio de venta por mayoreo</Text>
        <TextInput placeholder={data.valorP_M} style={styles.txtInput} />
        {!close ? (
          <View style={styles.message}>
            <Icon
              name="clear-all"
              size={24}
              style={styles.closeMessage}
              onPress={() => {
                toggle();
              }}
            />
            <Text style={{alignItems: 'center', justifyContent: 'center'}}>
              Aquí también puedes actualizar los datos
            </Text>
            <TouchableOpacity
              onPress={() => dontShowAgain()}
              style={{paddingTop: 20, paddingBottom: 10}}>
              <Text>No mostrar de nuevo </Text>
            </TouchableOpacity>
          </View>
        ) : null}
      </View>
    </View>
  );
}

function ShowServicioItem({data}) {
  const [close, setClose] = useState(false);
  const [edit, setEdit] = useState(false);
  const [icon, setIcon] = useState('edit');

  useEffect(() => {
    getStorage().then(res => {
      setClose(res);
    });
  }, []);

  const toggle = () => {
    setClose(true);
  };

  const dontShowAgain = () => {
    setStorage()
      .then(() => {
        setClose(true);
      })
      .chatch(err => console.log(err));
  };

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
        {!close ? (
          <View style={styles.message}>
            <Icon
              name="clear-all"
              size={24}
              style={styles.closeMessage}
              onPress={() => {
                toggle();
              }}
            />
            <Text style={{alignItems: 'center', justifyContent: 'center'}}>
              Aquí también puedes actualizar los datos
            </Text>
            <TouchableOpacity
              onPress={() => dontShowAgain()}
              style={{paddingTop: 20, paddingBottom: 10}}>
              <Text>No mostrar de nuevo </Text>
            </TouchableOpacity>
          </View>
        ) : null}
      </View>
    </View>
  );
}

function ShowProveedorItem({data}) {
  const [close, setClose] = useState(false);
  const [edit, setEdit] = useState(false);
  const [icon, setIcon] = useState('edit');

  useEffect(() => {
    getStorage().then(res => {
      setClose(res);
    });
  }, []);

  const toggle = () => {
    setClose(true);
  };

  const dontShowAgain = () => {
    setStorage()
      .then(() => {
        setClose(true);
      })
      .chatch(err => console.log(err));
  };

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
        {!close ? (
          <View style={styles.message}>
            <Icon
              name="clear-all"
              size={24}
              style={styles.closeMessage}
              onPress={() => {
                toggle();
              }}
            />
            <Text style={{alignItems: 'center', justifyContent: 'center'}}>
              Aquí también puedes actualizar los datos
            </Text>
            <TouchableOpacity
              onPress={() => dontShowAgain()}
              style={{paddingTop: 20, paddingBottom: 10}}>
              <Text>No mostrar de nuevo </Text>
            </TouchableOpacity>
          </View>
        ) : null}
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
