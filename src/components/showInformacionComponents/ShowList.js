/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect, useRef} from 'react';
import {Text, TouchableOpacity, ScrollView, Animated} from 'react-native';
import styles from './styles';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ListItem from './listItem';
import {
  moneyFormat,
  phoneFormat,
  handleGetList,
  filterItems,
  db,
} from '../mainFunctions';
import {TextBox} from '../auxComponents';

const renderItem = (list, search) => {
  if (search.trim() !== '') {
    return list.filter((item) => filterItems(item, search));
  } else {
    return list;
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
  const [search, setSearch] = useState('');

  useEffect(() => {
    try {
      const unsubscribe = db()
        .collection('clientes')
        .onSnapshot((snap) => handleGetList(snap, clientsList, setClients));
      return unsubscribe;
    } catch (err) {
      console.warn('error al intentar obtener los clientes ', err);
    }
  }, [clientsList]);

  return (
    <>
      <TextBox
        placeholder="Buscar..."
        onChangeText={setSearch}
        style={{backgroundColor: '#ffff'}}
      />
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
          renderItem(clientsList, search).map((item) => {
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
          <Text style={styles.emptyList}>
            Agrega clientes para visualizarlos aquí...
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
  const [search, setSearch] = useState('');

  useEffect(() => {
    try {
      const unsubscribe = db()
        .collection('productos')
        .onSnapshot((snap) => handleGetList(snap, productsList, setProducts));
      return unsubscribe;
    } catch (err) {
      console.warn('error al intentar obtener los datos de productos ', err);
    }
  }, [productsList]);

  return (
    <>
      <TextBox
        placeholder="Buscar..."
        onChangeText={setSearch}
        style={{backgroundColor: '#ffff'}}
      />
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
          renderItem(productsList, search).map((item) => {
            let subtitles = [`${moneyFormat(item.precioVenta)}`];
            if (item.marca) {
              subtitles.push(item.marca);
            }
            if (item.descripcion) {
              subtitles.push(item.descripcion);
            }
            return (
              <ListItem
                key={Math.random()}
                data={item}
                type="productos"
                title={`${item.nombre}`}
                subtitle={subtitles}
                navigation={navigation}
                route={route}
              />
            );
          })
        ) : (
          <Text style={styles.emptyList}>
            Agrega productos para visualizarlos aquí...
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
  const [search, setSearch] = useState('');

  useEffect(() => {
    try {
      const unsubscribe = db()
        .collection('servicios')
        .onSnapshot((snap) => handleGetList(snap, servicesList, setServices));
      return unsubscribe;
    } catch (err) {
      console.warn(
        'error al intentar obtener los datos de los servicios ',
        err,
      );
    }
  }, [servicesList]);

  return (
    <>
      <TextBox
        placeholder="Buscar..."
        onChangeText={setSearch}
        style={{backgroundColor: '#ffff'}}
      />
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
          renderItem(servicesList, search).map((item) => {
            const subtitles = [];
            if (item.descripcion) {
              subtitles.push(item.descripcion);
            }
            return (
              <ListItem
                key={Math.random()}
                data={item}
                title={`${item.nombre} ${moneyFormat(item.precioVenta)}`}
                subtitle={subtitles}
                navigation={navigation}
                route={route}
              />
            );
          })
        ) : (
          <Text style={styles.emptyList}>
            Agrega servicios adicionales para visualizarlos aquí...
          </Text>
        )}
      </ScrollView>
      <TouchableOpacity
        style={{...styles.AddBtn, transform: [{translateY: addButtonPosition}]}}
        onPress={() => navigation.navigate('Servicios')}>
        <Icon name="add" color="white" size={28} />
      </TouchableOpacity>
    </>
  );
}

function ShowProveedores({navigation, route}) {
  let [providersList, setProviders] = useState([]);
  const [scrollPosition, setScrollPosition] = useState(0);
  const addButtonPosition = useRef(new Animated.Value(0)).current;
  const [search, setSearch] = useState('');

  useEffect(() => {
    try {
      const unsubscribe = db()
        .collection('proveedores')
        .onSnapshot((snap) => handleGetList(snap, providersList, setProviders));
      return unsubscribe;
    } catch (err) {
      console.warn('error al intentar obtener los datos de proveedores ', err);
    }
  }, [providersList]);

  return (
    <>
      <TextBox
        placeholder="Buscar..."
        onChangeText={setSearch}
        style={{backgroundColor: '#ffff'}}
      />
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
        {providersList.length > 0 ? (
          renderItem(providersList, search).map((item) => {
            let subtitles = [];
            if (item.email) {
              subtitles = subtitles.concat(item.email);
            }
            if (item.telefono) {
              subtitles = subtitles.concat(phoneFormat(item.telefono));
            }
            return (
              <ListItem
                key={Math.random()}
                data={item}
                title={`${item.nombre}`}
                subtitle={subtitles.map((subtitle) => `${subtitle}`)}
                navigation={navigation}
                route={route}
              />
            );
          })
        ) : (
          <Text style={styles.emptyList}>
            Agrega proveedores para visualizarlos aquí...
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

const ShowWholesalers = ({navigation, route}) => {
  let [wholesalersList, setWholesaler] = useState([]);
  const [scrollPosition, setScrollPosition] = useState(0);
  const addButtonPosition = useRef(new Animated.Value(0)).current;
  const [search, setSearch] = useState('');

  useEffect(() => {
    try {
      const unsubscribe = db()
        .collection('mayoristas')
        .onSnapshot((snap) =>
          handleGetList(snap, wholesalersList, setWholesaler),
        );
      return unsubscribe;
    } catch (err) {
      console.log('error al intentar los registros de mayoristas', err);
    }
  }, [wholesalersList]);
  return (
    <>
      <TextBox
        placeholder="Buscar..."
        onChangeText={setSearch}
        style={{backgroundColor: '#ffff'}}
      />
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
        {wholesalersList.length > 0 ? (
          renderItem(wholesalersList, search).map((item) => {
            let subtitles = [];
            if (item.email) {
              subtitles = subtitles.concat(item.email);
            }
            if (item.telefono) {
              subtitles = subtitles.concat(phoneFormat(item.telefono));
            }
            return (
              <ListItem
                key={Math.random()}
                data={item}
                title={`${item.nombre}`}
                subtitle={subtitles.map((subtitle) => `${subtitle}`)}
                navigation={navigation}
                route={route}
              />
            );
          })
        ) : (
          <Text style={styles.emptyList}>
            Agrega vendedores mayoristas para visualizarlos aquí...
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
};

export {
  ShowClientes,
  ShowProductos,
  ShowServicios,
  ShowProveedores,
  ShowWholesalers,
};
