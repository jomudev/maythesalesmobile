/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect, useRef} from 'react';
import {Text, TouchableOpacity, ScrollView, Animated} from 'react-native';
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

const handleGetList = (snap, list, setList) => {
  if (snap.empty) {
    return;
  }
  let newList = list;
  snap.docChanges().forEach((change) => {
    const data = change.doc.data();
    switch (change.type) {
      case 'added':
        const isInList = list.filter((item) => item.id === data.id)[0];
        if (!isInList) {
          newList = newList.concat(data);
        }
        break;
      case 'modified':
        newList = list.map((item) => (item.id === data.id ? data : item));
        break;
      case 'removed':
        newList = list.filter((item) => item.id !== data.id);
        break;
      default:
        break;
    }
  });
  if (JSON.stringify(list) !== JSON.stringify(newList)) {
    setList(newList);
  }
};

const scrollEvent = (
  scrollPosition,
  value,
  addButtonPosition,
  setScrollPosition,
) => {
  if (scrollPosition - value < -6) {
    Animated.timing(addButtonPosition, {
      toValue: 100,
      duration: 100,
      useNativeDriver: true,
    }).start();
    setScrollPosition(value);
  } else if (scrollPosition - value > 6) {
    Animated.timing(addButtonPosition, {
      toValue: 0,
      duration: 100,
      useNativeDriver: true,
    }).start();
    setScrollPosition(value);
  }
};

function ShowClientes({navigation, route}) {
  let [clientsList, setClients] = useState([]);
  const [scrollPosition, setScrollPosition] = useState(0);
  const addButtonPosition = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('negocios')
      .doc(auth().currentUser.uid)
      .collection('clientes')
      .onSnapshot((snap) => handleGetList(snap, clientsList, setClients));
    return () => {
      unsubscribe;
    };
  }, [clientsList]);

  return (
    <>
      <ScrollView
        style={styles.container}
        onScroll={(event) =>
          scrollEvent(
            scrollPosition,
            event.nativeEvent.contentOffset.y,
            addButtonPosition,
            setScrollPosition,
          )
        }>
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
      </ScrollView>
      <TouchableOpacity
        style={{...styles.AddBtn, transform: [{translateY: addButtonPosition}]}}
        onPress={() => navigation.navigate('Clientes')}>
        <Icon name="add" color="white" size={28} />
      </TouchableOpacity>
    </>
  );
}

function ShowProductos({navigation, route}) {
  const [productsList, setProducts] = useState([]);
  const [scrollPosition, setScrollPosition] = useState(0);
  const addButtonPosition = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('negocios')
      .doc(auth().currentUser.uid)
      .collection('productos')
      .onSnapshot((snap) => handleGetList(snap, productsList, setProducts));
    return () => {
      unsubscribe;
    };
  }, [productsList]);

  return (
    <>
      <ScrollView
        style={styles.container}
        onScroll={(event) =>
          scrollEvent(
            scrollPosition,
            event.nativeEvent.contentOffset.y,
            addButtonPosition,
            setScrollPosition,
          )
        }>
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
      </ScrollView>
      <TouchableOpacity
        style={{...styles.AddBtn, transform: [{translateY: addButtonPosition}]}}
        onPress={() => navigation.navigate('Productos')}>
        <Icon name="add" color="white" size={28} />
      </TouchableOpacity>
    </>
  );
}

function ShowServicios({navigation, route}) {
  let [servicesList, setServices] = useState([]);
  const [scrollPosition, setScrollPosition] = useState(0);
  const addButtonPosition = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('negocios')
      .doc(auth().currentUser.uid)
      .collection('servicios')
      .onSnapshot((snap) => handleGetList(snap, servicesList, setServices));
    return () => {
      unsubscribe;
    };
  }, [servicesList]);

  return (
    <>
      <ScrollView
        style={styles.container}
        onScroll={(event) =>
          scrollEvent(
            scrollPosition,
            event.nativeEvent,
            addButtonPosition,
            setScrollPosition,
          )
        }>
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
      </ScrollView>
      <TouchableOpacity
        style={{...styles.AddBtn, transform: [{translateY: addButtonPosition}]}}
        onPress={() => navigation.navigate('Servicios Adicionales')}>
        <Icon name="add" color="white" size={28} />
      </TouchableOpacity>
    </>
  );
}

function ShowProveedores({navigation, route}) {
  let [providersList, setProviders] = useState([]);
  const [scrollPosition, setScrollPosition] = useState(0);
  const addButtonPosition = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('negocios')
      .doc(auth().currentUser.uid)
      .collection('proveedores')
      .onSnapshot((snap) => handleGetList(snap, providersList, setProviders));
    return () => {
      unsubscribe;
    };
  }, [providersList]);

  return (
    <>
      <ScrollView style={styles.container}>
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
      </ScrollView>
      <TouchableOpacity
        style={{...styles.AddBtn, transform: [{translateY: addButtonPosition}]}}
        onPress={() => navigation.navigate('Proveedores')}>
        <Icon name="add" color="white" size={28} />
      </TouchableOpacity>
    </>
  );
}

export {ShowClientes, ShowProductos, ShowServicios, ShowProveedores};
