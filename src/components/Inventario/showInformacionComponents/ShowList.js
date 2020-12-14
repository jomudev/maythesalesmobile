/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from './styles';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ListItem from './listItem';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

async function getCollection(type) {
  return firestore()
    .collection('negocios')
    .doc(auth().currentUser.uid)
    .collection(type);
}

const getCollectionData = (snap, prevList, setList) => {
  let newList = prevList || [];
  snap.docChanges().forEach((change) => {
    const docData = change.doc.data();
    switch (change.type) {
      case 'added':
        const isInList =
          newList.filter((item) => item.id === docData.id).length > 0;
        if (!isInList) {
          newList = newList.concat(docData);
        }
        break;
      case 'modified':
        newList = newList.map((item) =>
          item.id === docData.id ? docData : item,
        );
        break;
      case 'removed':
        newList = newList.filter((item) => item.id !== docData.id);
        break;
    }
  });
  return newList;
};

const verifyCollectionDataChanges = (prevList, newList, setList) => {
  if (JSON.stringify(prevList) !== JSON.stringify(newList)) {
    setList(newList);
  }
};

const setList = (res, list, setNewList) => {
  res.onSnapshot((snap) => {
    const newList = getCollectionData(snap);
    verifyCollectionDataChanges(list, newList, setNewList);
    return newList;
  });
}

function ShowClientes({navigation, route}) {
  let [clientsList, setClients] = useState([]);
  useEffect(() => {
    const unsubscribe = getCollection('clientes').then((res) => {
      setList(res, clientsList, setClients);
    });
    return () => {
      unsubscribe;
    };
  }, [clientsList]);

  return (
    <View style={styles.container}>
      {clientsList.length > 0 ? (
        clientsList.map((item) => {
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
          No se han registrado clientes...
        </Text>
      )}
      <TouchableOpacity
        style={styles.AddBtn}
        onPress={() => navigation.navigate('Clientes')}>
        <Icon name="add" color="white" size={28} />
      </TouchableOpacity>
    </View>
  );
}

function ShowProductos({navigation, route}) {
  let [productsList, setProducts] = useState([]);
  useEffect(() => {
    const unsubscribe = getCollection('productos').then((res) => {
      setList(res, productsList, setProducts);
    });
    return () => {
      unsubscribe;
    };
  }, [productsList]);

  return (
    <View style={styles.container}>
      {productsList.length > 0 ? (
        productsList.map((item) => {
          let subtitles = [`L${parseFloat(item.precioVenta).toFixed(2)}`];
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
          No se han registrado productos...
        </Text>
      )}
      <TouchableOpacity
        style={styles.AddBtn}
        onPress={() => navigation.navigate('Productos')}>
        <Icon name="add" color="white" size={28} />
      </TouchableOpacity>
    </View>
  );
}

function ShowServicios({navigation, route}) {
  let [servicesList, setServices] = useState([]);
  useEffect(() => {
    const unsubscribe = getCollection('servicios').then((res) => {
      setList(res, servicesList, setServices);
    });
    return () => {
      unsubscribe;
    };
  }, [servicesList]);

  return (
    <View style={styles.container}>
      {servicesList.length > 0 ? (
        servicesList.map((item) => {
          let subtitles = [`L${item.precioVenta}`];
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
          No se han registrado servicios adicionales...
        </Text>
      )}
      <TouchableOpacity
        style={styles.AddBtn}
        onPress={() => navigation.navigate('Servicios Adicionales')}>
        <Icon name="add" color="white" size={28} />
      </TouchableOpacity>
    </View>
  );
}

function ShowProveedores({navigation, route}) {
  let [providersList, setProviders] = useState([]);
  useEffect(() => {
    const unsubscribe = getCollection('proveedores').then((res) => {
      setList(res, providersList, setProviders);
    });
    return () => {
      unsubscribe;
    };
  }, [providersList]);

  return (
    <View style={styles.container}>
      {providersList.length > 0 ? (
        providersList.map((item) => (
          <ListItem
            key={Math.random()}
            data={item}
            title={`${item.nombre}`}
            subtitle={[
              `${item.email}`,
              `${item.telefono ? item.telefono : ''}`,
            ]}
            navigation={navigation}
            route={route}
          />
        ))
      ) : (
        <Text style={{color: '#00000055'}}>
          No se han registrado proveedores...
        </Text>
      )}
      <TouchableOpacity
        style={styles.AddBtn}
        onPress={() => navigation.navigate('Proveedores')}>
        <Icon name="add" color="white" size={28} />
      </TouchableOpacity>
    </View>
  );
}

export {ShowClientes, ShowProductos, ShowServicios, ShowProveedores};
