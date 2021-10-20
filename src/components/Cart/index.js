/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect, useRef} from 'react';
import {
  ScrollView,
  Switch,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  ToastAndroid,
  View,
} from 'react-native';
import store from '../../../store';
import {getTotal, moneyFormat, postSale} from '../mainFunctions';
import {interstitialAdConfig, InterstitialUnitId} from '../ads';
import {AdEventType, InterstitialAd} from '@react-native-firebase/admob';
import {clearStoreCart} from '../cartComponents/functions';
import ProductsList from '../cartComponents/productsList';
import ServicesList from '../cartComponents/servicesList';
import styles from './styles';
import EmptyListImage from '../emptyListImage';

const Cart = () => {
  const storeState = store.getState();
  const [state, setState] = useState({
    products: storeState.cartProducts || [],
    services: storeState.cartServices || [],
    client: storeState.cartClient || null,
    wholesaler: storeState.cartWholesaler || null,
  });
  const [saleState, setSaleState] = useState(store.getState().defaultSaleState);
  
  const stateChange = (prevState, newState) => {
    newState = {
      products: newState.cartProducts,
      services: newState.cartServices,
      client: newState.cartClient,
      wholesaler: newState.cartWholesaler,
    };
    
    const prevPlainState = JSON.stringify(prevState);
    const newPlainState = JSON.stringify(newState);
    
    return prevPlainState !== newPlainState ? true : false;
  };
  
  useEffect(() => {
    const interstitial = InterstitialAd.createForAdRequest(InterstitialUnitId, interstitialAdConfig);
    interstitial.load();
    const adEventListener = interstitial.onAdEvent((eventType) => {
      if (eventType === AdEventType.LOADED) {
        interstitial.show();
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
      {EmptyListImage.default}
      <Text style={{textAlign: 'center', color: 'gray'}}>Seleccione productos en la sección "Nueva Venta" para visualizarlos aquí</Text>
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
            <View style={styles.saleStateContainer}>
              <Text style={styles.saleStateText}>
                {saleState ? 'Vendida' : 'Pendiente'}
              </Text>
              <Switch
                style={styles.switchSaleState}
                trackColor={{false: '#101e5a', true: '#101e5a'}}
                thumbColor={saleState ? '#434588' : '#434588'}
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
              clearStoreCart();
              ToastAndroid.show(
                'La venta se realizó correctamente',
                ToastAndroid.SHORT,
              );
            });
          }}
          style={styles.soldButton}>
            <Text style={styles.soldButtonText}>Realizar venta</Text>
            <Text style={{...styles.soldButtonText, textAlign: 'right'}}>
              {moneyFormat(total)}
            </Text>
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
