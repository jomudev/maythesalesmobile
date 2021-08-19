/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  ScrollView,
  Switch,
  Text,
  TouchableOpacity,
  ToastAndroid,
  View,
} from 'react-native';
import store from '../../../store';
import {getTotal, moneyFormat, postSale} from '../mainFunctions';
import {interstitial} from '../ads';
import {AdEventType} from '@react-native-firebase/admob';
import {clearStoreCart} from '../cartComponents/functions';
import ProductsList from '../cartComponents/productsList';
import ServicesList from '../cartComponents/servicesList';
import styles from './styles';
import EmptyListImage from '../emptyListImage';

interstitial.load();

const Cart = () => {
  const storeState = store.getState();
  const [state, setState] = useState({
    products: storeState.cartProducts || [],
    services: storeState.cartServices || [],
    client: storeState.cartClient || null,
    wholesaler: storeState.cartWholesaler || null,
  });
  const [isAdLoad, setAdLoaded] = useState(false);
  const [saleState, setSaleState] = useState(store.getState().defaultSaleState);

  const stateChange = (prevState, newState) => {
    prevState = {
      products: prevState.products,
      services: prevState.services,
      client: prevState.client,
      wholesaler: prevState.wholesaler,
    };
    newState = {
      products: newState.cartProducts,
      services: newState.cartServices,
      client: newState.cartClient,
      wholesaler: newState.cartWholesaler,
    };

    const prevStatePlain = JSON.stringify(prevState);
    const newStatePlain = JSON.stringify(newState);

    return prevStatePlain !== newStatePlain ? true : false;
  };

  useEffect(() => {
    console.log('loading ad...');
    const adEventListener = interstitial.onAdEvent((type) => {
      if (type === AdEventType.LOADED) {
        setAdLoaded(true);
        ToastAndroid.show('cart ad loaded', ToastAndroid.SHORT);
      }
    });
    const unsubscribe = store.subscribe(() => {
      const prevState = state;
      const newState = store.getState();
      const theStateChange = stateChange(prevState, newState);
      if (theStateChange) {
        setState({
          products: newState.cartProducts,
          services: newState.cartServices,
          client: newState.cartClient,
          wholesaler: newState.cartWholesaler,
        });
      }
    });

    return () => {
      unsubscribe();
      adEventListener();
    };
  }, []);

  const total = getTotal([state.products, state.services], state.wholesaler);

  return state.products.length === 0 && state.services.length === 0 ? (
    <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
      {EmptyListImage.default()}
      <Text
        style={{
          textAlign: 'center',
          position: 'absolute',
          fontSize: 28,
          color: 'grey',
        }}>
        Selecciona productos en la sección{' '}
        <Text style={{fontWeight: 'bold'}}>Nueva Venta</Text> para que aparezcan
        en esta sección.
      </Text>
    </View>
  ) : (
    <View style={styles.container}>
      <ScrollView>
        <ProductsList products={state.products} wholesaler={state.wholesaler} />
        {state.products.length > 0 ? (
          <Subtotal
            text="Subtotal"
            value={getTotal([state.products], state.wholesaler)}
          />
        ) : null}
        <ServicesList services={state.services} wholesaler={state.wholesaler} />
        {state.services.length > 0 ? (
          <Subtotal
            text="Subtotal"
            value={getTotal([state.services], state.wholesaler)}
          />
        ) : null}
      </ScrollView>
      <View style={styles.bottomView}>
        <View style={styles.bottomViewContent}>
          {state.client ? (
            <Text style={styles.client}>
              {'Cliente: ' + state.client.nombre}
            </Text>
          ) : null}
          {state.wholesaler ? (
            <Text style={styles.client}>
              {'Comprador mayorista: ' + state.wholesaler.nombre}
            </Text>
          ) : null}
          <View style={styles.bottomViewContentRow}>
            <Text style={styles.total}>{moneyFormat(total)}</Text>
            <View style={styles.saleStateContainer}>
              <Text style={styles.saleStateText}>
                {state.saleState ? 'Vendida' : 'Pendiente'}
              </Text>
              <Switch
                style={styles.switchSaleState}
                trackColor={{false: '#e6e8f1', true: '#e6e8f1'}}
                thumbColor={saleState ? '#434588' : '#b4b6be'}
                onValueChange={() => {
                  setSaleState(!saleState);
                }}
                value={saleState}
              />
            </View>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => {
            postSale({
              ...state,
              total: getTotal(
                [state.products, state.services],
                state.wholesaler,
              ),
              saleState,
            }).then(() => {
              if (isAdLoad) {
                interstitial.show();
              }
              ToastAndroid.show(
                'La venta se realizó correctamente',
                ToastAndroid.SHORT,
              );
            });
            clearStoreCart();
          }}
          style={styles.soldButton}>
          <Text style={styles.soldButtonText}>Realizar venta</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const Subtotal = ({text, value}) => {
  return (
    <Text style={styles.subtotal}>
      {text} : {moneyFormat(value)}
    </Text>
  );
};

export default Cart;
