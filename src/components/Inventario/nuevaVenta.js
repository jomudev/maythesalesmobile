import React, {useState, useEffect} from 'react';
import store from '../../../store';
import {View, ScrollView, Text} from 'react-native';
import styles from './styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {ProductItem, ServiceItem, ClientItem} from './items';
import {filterItems} from '../mainFunctions';
import {TextBox} from '../auxComponents';
import {HomeBannerAd} from '../ads';

const NewSale = ({navigation}) => {
  const [foundProduct, setFindProduct] = useState(null);
  const [foundClient, setFindClient] = useState(null);
  const [foundService, setFindService] = useState(null);
  const [collections, setCollections] = useState({
    productos: [],
    clientes: [],
    servicios: [],
    proveedores: [],
  });
  
  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      const {productos, clientes, servicios,  proveedores} = store.getState().collections;
      setCollections({
        productos,
        clientes,
        servicios, 
        proveedores
      });
    });
    return unsubscribe;
  }, []);

  const Search = ({list, type}) => {
    let found = [];
    const types = {
      "productos": () => {
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
      },
      "clientes": () => {
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
      },
      "servicios": () => {
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
      },
    }
    return types[type]();
  };

  const SearchList = ({type, list, foundElement}) => {
    if (type === 'productos') {
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
        style={styles.form}>
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
          <SearchList list={collections.productos} type="productos" />
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
          <SearchList type="clientes" list={collections.clientes} foundElement={foundClient} />
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
          <SearchList type="servicios" list={collections.servicios} foundElement={foundService} />
        </View>
        <HomeBannerAd />
      </ScrollView>
    </View>
  );
};

export default NewSale;
