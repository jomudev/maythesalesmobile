import React, {useState, useEffect, useCallback} from 'react';
import store from '../../../store';
import {View, ScrollView, RefreshControl, Text} from 'react-native';
import styles from './styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {ProductItem, ServiceItem, ClientItem, WholesalerItem} from './items';
import {filterItems, db} from '../mainFunctions';
import {TextBox} from '../auxComponents';
import {HomeBannerAd} from '../ads';

const handleGetList = (snap, list, setList) => {
  try {
    let newList = list;
    snap.docChanges().forEach((change) => {
      const data = change.doc.data();
      switch (change.type) {
        case 'added':
          const filter = list.filter((item) => item.id === data.id);
          const isInList = filter.length > 0;
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
  } catch (err) {
    console.warn('error trying to get the inventory list ', err);
  }
};

const NewSale = ({navigation}) => {
  const [foundProduct, setFindProduct] = useState(null);
  const [foundClient, setFindClient] = useState(null);
  const [foundService, setFindService] = useState(null);
  const [foundWholesaler, setFindWholesaler] = useState(null);
  const [products, setProducts] = useState(store.getState().products || []);
  const [clients, setClients] = useState(store.getState().clients || []);
  const [services, setServices] = useState(store.getState().services || []);
  const [wholesalers, setWholesalers] = useState(
    store.getState().wholesalers || [],
  );
  const [refreshing, setRefreshing] = useState(true);

  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    (async () => {
      const returnedCollection = await db('productos').get().then((snap) => {
        return  snap.docChanges().map((change) => change.doc.data());
      });
      handleSetProduct(returnedCollection);
      wait(2000).then(() => setRefreshing(false));
    })()
  }, []);

  const handleSetProduct = (list) => {
    store.dispatch({
      type: 'SET_PRODUCTS',
      data: list,
    });
  };

  const handleSetClients = (list) => {
    store.dispatch({
      type: 'SET_CLIENTS',
      data: list,
    });
  };

  const handleSetServices = (list) => {
    store.dispatch({
      type: 'SET_SERVICES',
      data: list,
    });
  };

  const handleSetWholesalers = (list) => {
    store.dispatch({
      type: 'SET_WHOLESALERS',
      data: list,
    });
  };

  useEffect(() => {
    (async () => {
      const returnedCollection = await db('productos').get().then((snap) => {
        return  snap.docChanges().map((change) => change.doc.data());
      });
      handleSetProduct(returnedCollection);
      setRefreshing(false);
    })()
    
  }, []);

  useEffect(() => {
    try {
      const unsubscribeProducts = db('productos').onSnapshot((snap) =>
        handleGetList(snap, products, handleSetProduct),
      );

      const unsubscribeClients = db('clientes').onSnapshot((snap) =>
        handleGetList(snap, clients, handleSetClients),
      );

      const unsubscribeServices = db('servicios').onSnapshot((snap) =>
        handleGetList(snap, services, handleSetServices),
      );

      const unsubscribeWholesalers = db('mayoristas').onSnapshot((snap) =>
        handleGetList(snap, wholesalers, handleSetWholesalers),
      );

      const storeUnsubscribe = store.subscribe(() => {
        const storeState = store.getState();
        setProducts(storeState.products);
        setClients(storeState.clients);
        setServices(storeState.services);
        setWholesalers(storeState.wholesalers);
      });

      return () => {
        unsubscribeProducts();
        unsubscribeClients();
        unsubscribeServices();
        unsubscribeWholesalers();
        storeUnsubscribe();
      };
    } catch (err) {
      console.warn('error trying to get the inventory data', err);
    }
  }, [refreshing]);

  const Search = ({list, type}) => {
    let found = [];
    if (type === 'products') {
      if (foundProduct) {
        found = list.filter((item) => filterItems(item, foundProduct));
        return found.map((product, index) => (
          <ProductItem
            data={product}
            index={index}
            key={JSON.stringify(product) + index}
          />
        ));
      } else {
        return list.length === 0 ? (
          <Text style={styles.emptySearch}>
            Agrega productos al inventario para poder verlos aquí.
          </Text>
        ) : (
          list.map((product, index) => (
            <ProductItem
              data={product}
              index={index}
              key={JSON.stringify(product) + index}
            />
          ))
        );
      }
    } else if (type === 'clients') {
      found = list.filter((item) => filterItems(item, foundClient));
      return found.length === 0 ? (
        <Text style={styles.emptySearch}>No se encontró ningún registro.</Text>
      ) : (
        found.map((client, index) => (
          <ClientItem
            data={client}
            index={index}
            key={JSON.stringify(client) + index}
          />
        ))
      );
    } else if (type === 'services') {
      found = list.filter((item) => filterItems(item, foundService));
      return found.length === 0 ? (
        <Text style={styles.emptySearch}>No se encontró ningún registro.</Text>
      ) : (
        found.map((service, index) => (
          <ServiceItem
            data={service}
            index={index}
            key={JSON.stringify(service) + index}
          />
        ))
      );
    } else if (type === 'wholesalers') {
      found = list.filter((item) => filterItems(item, foundWholesaler));
      return found.length === 0 ? (
        <Text style={styles.emptySearch}>No se encontró ningún registro.</Text>
      ) : (
        found.map((wholesaler, index) => (
          <WholesalerItem
            data={wholesaler}
            index={index}
            key={JSON.stringify(wholesaler) + index}
          />
        ))
      );
    }
  };

  const SearchList = ({type, list, foundElement}) => {

    if (type === 'products') {
      return <ScrollView
              horizontal={true}
              style={styles.findProductsList}
              showsHorizontalScrollIndicator={false}>
              <Search list={list} type={type} />
             </ScrollView>
    } else {
      return <ScrollView
              style={styles.findProductsList}
              horizontal={true}
              showsHorizontalScrollIndicator={false}>
              {foundElement ? <Search list={list} type={type} /> : null}
             </ScrollView>
    }
  }

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.form}
        refreshControl={
          <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
        }>
        <View style={{...styles.formGroup, paddingHorizontal: 0}}>
          <View style={{...styles.textContainer, paddingHorizontal: 16}}>
            <Icon
              name="barcode-scan"
              style={styles.Icon}
              onPress={() =>
                navigation.navigate('CamScanner', {
                  type: 'getProduct',
                })
              }
            />
            <TextBox
              style={styles.txtInput}
              onChangeText={(text) => setFindProduct(text)}
              value={foundProduct}
              placeholder="Busca o selecciona un producto"
            />
            {foundProduct ? (
              <Icon
                name="close"
                style={styles.Icon}
                onPress={() => setFindProduct('')}
              />
            ) : (
              <Icon
                name="plus"
                style={styles.Icon}
                onPress={() => navigation.navigate('Productos')}
              />
            )}
          </View>
          <SearchList list={products} type="products" />
        </View>
        <View style={styles.formGroup}>
          <View style={styles.textContainer}>
            <TextBox
              onChangeText={(text) => setFindClient(text)}
              style={styles.txtInput}
              value={foundClient}
              placeholder="Buscar un cliente"
            />
            {foundClient ? (
              <Icon
                name="close"
                style={styles.Icon}
                onPress={() => setFindClient('')}
              />
            ) : (
              <Icon
                name="plus"
                style={styles.Icon}
                onPress={() => navigation.navigate('Clientes')}
              />
            )}
          </View>
          <SearchList type="clients" list={clients} foundElement={foundClient} />
        </View>
        <View style={styles.formGroup}>
          <View style={styles.textContainer}>
            <TextBox
              style={styles.txtInput}
              value={foundService}
              onChangeText={(text) => setFindService(text)}
              placeholder="Buscar un Servicio Adicional"
            />
            {foundService ? (
              <Icon
                name="close"
                style={styles.Icon}
                onPress={() => setFindService('')}
              />
            ) : (
              <Icon
                name="plus"
                style={styles.Icon}
                onPress={() => navigation.navigate('Servicios')}
              />
            )}
          </View>
          <SearchList type="services" list={services} foundElement={foundService} />
        </View>
        <View style={styles.formGroup}>
          <View style={styles.textContainer}>
            <TextBox
              onChangeText={(text) => setFindWholesaler(text)}
              style={styles.txtInput}
              value={foundWholesaler}
              placeholder="Buscar un mayorista"
            />
            {foundWholesaler ? (
              <Icon
                name="close"
                style={styles.Icon}
                onPress={() => setFindWholesaler('')}
              />
            ) : (
              <Icon
                name="plus"
                style={styles.Icon}
                onPress={() => navigation.navigate('Mayoristas')}
              />
            )}
          </View>
          <SearchList type="wholesalers" list={wholesalers} foundElement={foundWholesaler} />
        </View>
        <HomeBannerAd />
      </ScrollView>
    </View>
  );
};

export default NewSale;
