/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import styles from './styles';
import store from '../../../../store';
import ListItem from './listItem';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

async function getList(type) {
  try {
    return await firestore()
      .collection('users')
      .doc(auth().currentUser.uid)
      .collection(type)
      .get();
  } catch (err) {
    console.warn(err);
  }
}

function ShowClientes({navigation, route}) {
  let [list, setList] = useState([]);
  useEffect(() => {
    const unsubscriber = getList('clientes').then(res => {
      let newList = [];
      res.docs.forEach(doc => newList.push(doc.data()));
      setList(newList);
    });
    return () => {
      unsubscriber;
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Clientes</Text>
      {list.length > 0 ? (
        list.map(item => {
          const subtitles = [];
          if (item.email) {
            subtitles.push(`email: ${item.email}`);
          }
          if (item.telefono) {
            subtitles.push(`cel: ${item.telefono}`);
          }
          return (
            <ListItem
              key={Math.random()}
              data={item}
              title={`${item.nombre}`}
              subtitle={subtitles}
              navigation={navigation}
              route={route}
            />
          );
        })
      ) : (
        <Text style={{color: '#00000055'}}>
          Aquí se mostraran los clientes a los que vendes
        </Text>
      )}
    </View>
  );
}

function ShowProductos({navigation, route}) {
  const [list, setList] = useState([]);

  useEffect(() => {
    const unsubscriber = getList('productos').then(res => {
      let newList = [];
      res.docs.forEach(doc => newList.push(doc.data()));
      setList(newList);
      return () => {
        unsubscriber;
      };
    });
  }, []);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Productos</Text>
      {list.length > 0 ? (
        list.map(item => {
          let subtitles = [`L${item.ventaP_U}`];
          if (item.descripcion) {
            subtitles.push(item.descripcion);
          }
          return (
            <ListItem
              key={Math.random()}
              data={item}
              title={`${item.nombre}`}
              subtitle={subtitles}
              navigation={navigation}
              route={route}
            />
          );
        })
      ) : (
        <Text style={{color: '#00000055'}}>
          Aquí se mostraran los productos que vendes
        </Text>
      )}
    </View>
  );
}

function ShowServicios({navigation, route}) {
  const [list, setList] = useState([]);
  useEffect(() => {
    const unsubscriber = getList('servicios').then(res => {
      let newList = [];
      res.docs.forEach(doc => newList.push(doc.data()));
      setList(newList);
    });
    return () => {
      unsubscriber;
    };
  }, []);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Servicios adicionales</Text>
      {list.length > 0 ? (
        list.map(item => {
          let subtitles = [`L${item.ventaP_U}`];
          if (item.descripcion) {
            subtitles.push(item.descripcion);
          }
          return (
            <ListItem
              key={Math.random()}
              data={item}
              title={`${item.nombre}`}
              subtitle={subtitles}
              navigation={navigation}
              route={route}
            />
          );
        })
      ) : (
        <Text style={{color: '#00000055'}}>
          Aquí se mostraran los servicios adicionales
        </Text>
      )}
    </View>
  );
}

function ShowProveedores({navigation, route}) {
  const list = store.getState().clients || [];
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Proveedores</Text>
      {list.length > 0 ? (
        list.map(item => (
          <ListItem
            key={Math.random()}
            data={item}
            title={`${item.nombre}`}
            subtitle={[
              `${item.email}`,
              `${item.telefono ? ' - ' + item.telefono : ''}`,
            ]}
            navigation={navigation}
            route={route}
          />
        ))
      ) : (
        <Text style={{color: '#00000055'}}>
          Aquí se mostraran los proveedores a los que tu compras
        </Text>
      )}
    </View>
  );
}

export {ShowClientes, ShowProductos, ShowServicios, ShowProveedores};
