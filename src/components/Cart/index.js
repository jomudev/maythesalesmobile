/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect, useRef} from 'react';
import {
  Switch,
  Text,
  TouchableOpacity,
  ToastAndroid,
  View,
  FlatList
} from 'react-native';
import store from '../../../store';
import {getTotal, moneyFormat, postSale} from '../mainFunctions';
import {interstitialAdConfig, InterstitialUnitId} from '../ads';
import {AdEventType, InterstitialAd} from '@react-native-firebase/admob';
import {clearStoreCart} from './cartComponents/functions';
import ProductsList from './cartComponents/productsList';
import ServicesList from './cartComponents/servicesList';
import styles from './styles';
import EmptyListImage from '../emptyListImage';

const Cart = () => {
  const storeState = store.getState();
  const [state, setState] = useState({
    products: storeState.cart.products,
    services: storeState.cart.services,
    client: storeState.cart.client,
  });
  const [saleState, setSaleState] = useState(storeState.data.defaultSaleState);
  
  const stateChange = (prevState, newState) => {
    newState = {
      products: newState.cart.products,
      services: newState.cart.services,
      client: newState.cart.client,
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
          products: newState.cart.products,
          services: newState.cart.services,
          client: newState.cart.client,
        });
      }
    });

    return () => {
      unsubscribe();
      adEventListener();
    };
  }, []);

  const servicesList = state.services ? state.services : []
  const productsList = state.products ? state.products : []
  const total = getTotal([productsList, servicesList], state.wholesaler);
  return state.products.length === 0 && servicesList.length === 0 ? (
    <View style={{alignItems: 'center', justifyContent: 'center', flex: 1, backgroundColor: 'white'}}>
      {EmptyListImage.default}
      <Text style={{textAlign: 'center', color: 'gray'}}>Seleccione productos en la sección "Nueva Venta" para visualizarlos aquí</Text>
    </View>
  ) : (
    <View style={styles.container}>
      <FlatList
        data={[productsList, servicesList]}
        ListHeaderComponent={() => (<ProductsList products={productsList} wholesaler={state.wholesaler} />)}
        ListFooterComponent={() => (<ServicesList services={servicesList} wholesaler={state.wholesaler} />)}
       />
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
                [productsList, servicesList],
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
    <View style={styles.subtotal}>
      <Text>{text} </Text>
      <Text>{moneyFormat(value)}</Text>
    </View>
  );
};

export default Cart;
